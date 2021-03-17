const fs = require('fs')
const path = require('path')
const baseUrl = path.resolve('./') + '/src'
const MongoDB = require(`${baseUrl}/services/mongodb/promise`)
const Config = require(`${baseUrl}/services/server/config`)
const configFile = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
const configSrv = Config({ baseUrl })
const Models = require('../models')
const ModuleDomain = require('../domains/module')

module.exports = (app) => {
  const start = async () => {
    app.params = configSrv.parse(configFile)
    app.params.basePath = baseUrl
    const promise = MongoDB(app.params.databases.flight.params)
    app.db.flight = await promise.then()
    const moduleDomain = new ModuleDomain()
    const nameModule = moduleDomain.getNameDomain()
    app.Model[nameModule] = Models({ app })
    return app
  }

  return start
}
