module.exports = function ({ app }) {
  const router = require('express').Router()
  const controller = require('../controllers')({ app })

  router.all('/builder', controller.hellow)

  return router
}
