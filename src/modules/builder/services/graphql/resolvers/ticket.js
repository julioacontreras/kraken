
module.exports = ({ app }) => {
  const model = app.Model.flight.Ticket()

  class Ticket {
    async get (locator) {
      const result = await model.findOne({ locator })
      if (!result) {
        return {
          error: true,
          message: 'Not found ticket'
        }
      }
      return result
    }

    async getByOrderId (orderId) {
      const result = await model.findOne({ 'session.orderId': orderId })
      if (!result) {
        return {
          error: true,
          message: 'Not found ticket'
        }
      }
      return result
    }
  }

  return new Ticket()
}
