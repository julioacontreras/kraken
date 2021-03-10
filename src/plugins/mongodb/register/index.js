const Databases = require('./services/databases')

module.exports = async ({ app, options }) => {
  app.db = Databases({ databases: app.config.databases || {} }) // Prepare databases
  return app
}
