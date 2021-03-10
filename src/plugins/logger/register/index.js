const Log = require('../services/log')

module.exports = async ({ app, options }) => {
  app.logger = Log({ app }) // Register Log
  return app
}
