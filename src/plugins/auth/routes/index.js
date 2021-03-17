module.exports = function ({ app }) {
  const router = require('express').Router()
  const controller = require('../controllers')({ app })

  router.post('/auth/login', controller.login)
  router.all('/auth/logout', controller.logout)

  router.get('/auth/user', (req, res) => {
    res.json({ status: 'OK', user: req.session.user })
  })

  router.get('/auth/success', (req, res) => {
    res.json({ status: 'OK' })
  })

  router.get('/auth/error', (req, res) => {
    res.status(401).json({ status: 'error' })
  })

  return router
}
