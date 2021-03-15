const app = {
  model: {},
  Model: {},
  service: {},
  db: {
    payments: false
  }
}

const bootstrap = require('./bootstrap')(app)
const promise = bootstrap()

promise.then(async (app) => {
  const Payment = app.Model.payments.Payment()
  await Payment.deleteMany({})
  process.exit(1)
})
