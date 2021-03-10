
module.exports = function ({ app }) {
  const DateTools = require(`${app.params.basePath}/services/utils/dateTools`)
  const Payment = require('../services/redsys')
  const PaymentModel = app.Model.payments.Payment({ app })
  const OrderModel = app.Model.payments.Order({ app })
  const paymentRedSys = new Payment()
  const tpvInfo = app.params.redsys

  const getNextOrderId = async (OrderModel) => {
    let orderId = 1
    const orderModel = await OrderModel.findOne({})
    if (!orderModel) {
      const om = OrderModel.create({ orderId })
      om.save()
    } else {
      orderModel.orderId = Number(orderModel.orderId) + 1
      await orderModel.save()
      orderId = orderModel.orderId
    }
    return orderId
  }

  const createPayment = async (PaymentModel, { orderCount, amount, sessionId }) => {
    const model = new PaymentModel()
    const d = new Date()
    const uid = (d.getFullYear() + d.getMonth() + d.getDay() + d.getHours() + d.getMinutes() + d.getMilliseconds()) + '' + orderCount
    model.orderId = uid.toString().padStart(10, '0')
    model.paymentId = new Date().getMilliseconds().toString().padStart(10, '0')
    model.amount = amount
    model.sessionId = sessionId
    model.status = 'inprocess'
    model.createdAt = DateTools.toTimestamp(new Date())
    await model.save()
    return model
  }

  return {
    async payment (req, res) {
      if (!req.body.amount) {
        res.status(500)
        res.json({
          error: 'Dont found amount in body'
        })
        return
      }
      if (!req.body.sessionId) {
        res.status(500)
        res.json({
          error: 'Dont found sessionId in body'
        })
        return
      }

      const orderCount = await getNextOrderId(OrderModel)
      const payment = await createPayment(PaymentModel, { orderCount, amount: req.body.amount, sessionId: req.body.sessionId })
      const params = paymentRedSys.createParamsToCreatePayment(req.body.amount, payment.orderId, tpvInfo)
      res.json(params)
    }
  }
}
