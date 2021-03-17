module.exports = function ({ app }) {
  const Service = require('../services')({ app })
  return {
    login: Service.auth,
    logout (req, res) {
      req.session.user = null
      res.json({ status: 'success' })
    }
  }
}
