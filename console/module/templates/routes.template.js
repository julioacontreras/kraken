module.exports = function ({ app }) {
  const router = require('express').Router()
  const controller = require('../controllers')({ app })

  router.all('{{&name}}', controller.hellow)

  return router
}
