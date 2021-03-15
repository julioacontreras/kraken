module.exports = ({ app }) => {
  const model = app.Model.flight.Flightcompany()

  return {
    findActiveOne: (options) => model.findOne({ active: true, ...options })
  }
}
