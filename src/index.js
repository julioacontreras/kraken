const fs = require('fs')
const App = require('./services/server')

const basePath = __dirname
const config = JSON.parse(fs.readFileSync(`${basePath}/../config.json`, 'utf8'))
const app = App({ config, basePath })
const server = app.server
const logger = app.server.logger
const p = app.params

// Listen the server
server.listen(p.port, p.host)
logger.info({
  message: `Server listening on ${p.protocol}${p.host}:${p.port}`
})
