const fs = require('fs')
const path = require('path')
const baseUrl = path.resolve('./') + '/src'
const MongoDB = require(`${baseUrl}/services/mongodb/promise`)
const Config = require(`${baseUrl}/services/server/config`)
const I18n = require(`${baseUrl}/modules/i18n/services/i18n`)(baseUrl)
const configFile = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
const configSrv = Config({ baseUrl })
const Models = require('../models')

module.exports = (app) => {
  const start = async () => {
    app.params = configSrv.parse(configFile)
    app.params.basePath = baseUrl
    app.service.i18n = new I18n('es')
    const promise = MongoDB(app.params.databases.payments.params)
    app.db.payments = await promise.then()
    app.Model.payments = Models({ app })
    return app
  }

  return start
}
