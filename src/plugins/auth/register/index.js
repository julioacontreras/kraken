module.exports = ({ app, options }) => {
  const routes = require('../routes')({ app })
  app.use('/api', routes)
  return app
}
