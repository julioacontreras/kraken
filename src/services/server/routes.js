module.exports = function (settings) {
  const router = require('express').Router()

  // Error route
  router.all('/error', function (req, res) {
    res.json({ status: 'error' })
  })

  // Enpoint to show is active server
  router.all('/', function (req, res) {
    res.json({ status: 'success', message: 'works!' })
  })

  return router
}
