const fs = require('fs')
const App = require('./services/server')

const basePath = __dirname
const config = JSON.parse(fs.readFileSync(`${basePath}/../config.json`, 'utf8'))

const databases = JSON.parse(fs.readFileSync(`${basePath}/../databases.json`, 'utf8'))
config.databases = databases.databases

const modules = JSON.parse(fs.readFileSync(`${basePath}/../modules.json`, 'utf8'))
config.modules = modules.modules

const plugins = JSON.parse(fs.readFileSync(`${basePath}/../plugins.json`, 'utf8'))
config.plugins = plugins.plugins

const app = App({ config, basePath })
const server = app.server
const logger = app.server.logger
const p = app.params

// Listen the server
server.listen(p.port, p.host)
logger.info({
  message: `Server listening on ${p.protocol}${p.host}:${p.port}`
})
