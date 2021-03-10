module.exports = function ({ app }) {
  const router = require('express').Router()
  const redsys = require('../controllers/redsys')({ app })

  router.post('/payments/redsys/payment', redsys.payment)

  return router
}
