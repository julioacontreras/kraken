const Log = require('../services/log')

module.exports = async ({ app, options }) => {
  app.logger = Log({ app, options }) // Register Log
  return app
}
