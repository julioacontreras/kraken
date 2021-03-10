const express = require('express')
const Bootstrap = require('./bootstrap')
const Routes = require('./routes')
const Modules = require('./modules')
const Plugins = require('./plugins')

module.exports = ({ config, basePath }) => {
  let app = express()
  app = Bootstrap({ app, config, basePath }) // Initialize app
  app.model = {} // Model instances
  app.Service = {} // Service classes
  app.Model = {} // Model classes
  app.use(app.params.rootApi, Routes({ app })) // Add basic routes
  app.modules = Modules({ app, modules: app.config.modules || [] }) // Register modules
  app.plugins = Plugins({ app, plugins: app.config.plugins || [] }) // Register plugins
  return { server: app, params: app.params }
}
