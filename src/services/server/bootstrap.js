const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const Config = require('./config')

require('dotenv').config()

module.exports = ({ app, config, basePath }) => {
  const configSrv = Config({ basePath })
  // service instances
  app.service = {
    core: { parser: configSrv }
  }
  app.config = configSrv.parse(config)
  app.params = app.config.params
  app.params.basePath = basePath

  app.use(cors()) // Enable to crosssites
  app.use(session({
    secret: app.params.sessionSecret,
    resave: false,
    saveUninitialized: true
  }))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(flash())

  return app
}
