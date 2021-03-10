const Service = require('../services/index.js')

module.exports = async ({ app, options }) => {
  const main = new Service({ app, options })
  const canSendEmails = await main.verify()
  if (!canSendEmails) {
    console.error('Error email module.')
  }
  app.Service.email = { main }
  return app
}
