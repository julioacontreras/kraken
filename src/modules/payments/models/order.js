
module.exports = ({ app }) => {
  const sanitizeInstanceModel = require(`${app.params.basePath}/services/utils/sanitizeInstanceModel`)(app.model)
  app.model = sanitizeInstanceModel('payments')
  const ModelBase = require(`${app.params.basePath}/services/mongodb/model`)

  const create = () => {
    let instance = app.model.payments.order
    if (!instance) {
      const schema = {
        orderId: Number
      }
      instance = app.model.payments.order = ModelBase({ name: 'Order', schema, connector: app.db.payments })
    }
    return instance
  }

  return create
}
