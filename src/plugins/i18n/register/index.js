const Routes = require('../routes')

module.exports = ({ app, options }) => {
  const I18n = require('../services/i18n')(app.params.basePath)
  app.use('/api', Routes({ app, options })) // Add routes
  app.Service.i18n = new I18n('es')
  app.i18n = new I18n('es')
  return app
}
