module.exports = function ({ app }) {
  const router = require('express').Router()
  const controller = require('../controllers')({ app })

  router.all('/gigi', controller.hellow)

  return router
}
