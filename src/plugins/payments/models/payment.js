
module.exports = ({ app }) => {
  const sanitizeInstanceModel = require(`${app.params.basePath}/services/utils/sanitizeInstanceModel`)(app.model)
  app.model = sanitizeInstanceModel('payments')
  const ModelBase = require(`${app.params.basePath}/services/mongodb/model`)

  const create = () => {
    let instance = app.model.payments.payment
    if (!instance) {
      const schema = {
        orderId: String,
        paymentId: String,
        payerId: String,
        amount: Number,
        sessionId: String,
        status: String,
        createdAt: String
      }
      instance = app.model.payments.payment = ModelBase({ name: 'Payment', schema, connector: app.db.payments })
    }
    return instance
  }

  return create
}
