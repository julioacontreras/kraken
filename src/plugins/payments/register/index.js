const Models = require('../models')
const Routes = require('../routes')
const Redsys = require('../services/redsys.js')

module.exports = ({ app, options }) => {
  app.Model.payments = Models({ app }) // Add models
  app.use('/api', Routes({ app, options })) // Add routes
  app.Service.payments = { Redsys }
  app.params.redsys = options.redsys
  return app
}
