const express = require('express')
const Bootstrap = require('./bootstrap')
const Log = require('./log')
const Routes = require('./routes')
const Databases = require('./databases')
const Modules = require('./modules')

module.exports = ({ config, basePath }) => {
  let app = express()
  app = Bootstrap({ app, config, basePath }) // Initialize app
  app.logger = Log({ app }) // Register Log
  app.model = {} // Model instances
  app.Service = {} // Service classes
  app.Model = {} // Model classes
  app.use(app.params.rootApi, Routes({ app })) // Add basic routes
  app.db = Databases({ databases: app.config.databases || {} }) // Prepare databases
  app.modules = Modules({ app, modules: app.config.modules || [] }) // Register modules
  return { server: app, params: app.params }
}
