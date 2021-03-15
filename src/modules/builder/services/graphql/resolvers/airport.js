module.exports = ({ app }) => {
  const model = app.Model.flight.Airport()

  return {
    find: async (options) => model.find({ ...options }),
    findActives: (options) => model.find({ active: true, ...options }),
    findActiveOne: (options) => model.findOne({ active: true, ...options }),
    findByCodes (airports, codes) {
      airports.map((el, idx, array) => {
        if (!codes.includes(el.code)) {
          array[idx].active = false
        }
      })
      return airports
    }
  }
}
