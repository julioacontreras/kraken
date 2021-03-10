module.exports = function ({ app }) {
  const router = require('express').Router()
  const i18n = require('../controllers')({ app })

  router.get('/i18n/:lang', i18n.getMessages)

  return router
}
