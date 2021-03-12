const Databases = require('./services/databases')

module.exports = async ({ app, options }) => {
  app.db = Databases({ databases: options.databases || {} }) // Prepare databases
  return app
}
