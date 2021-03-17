module.exports = function ({ app }) {
  const Service = require('../services')({ app })
  const service = new Service()
  return {
    hellow (req, res) {
      res.json({ message: service.getMessage() })
    }
  }
}
