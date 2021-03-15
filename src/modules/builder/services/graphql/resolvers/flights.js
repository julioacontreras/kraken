const FlightsDomain = require('../../../domains/flights')
const CountryAirport = require('../../../domains/countryairport')
const Airport = require('./airport')
const Pack = require('./pack')

module.exports = ({ app }) => {
  const flightsDomain = new FlightsDomain()
  const countryAirport = new CountryAirport({ app })
  const airport = Airport({ app })
  const pack = Pack({ app })

  class Flights {
    async get () {
      const packs = await pack.findNextFligths()
      const airports = await airport.find({})
      const aiportsActives = await airport.findActives({})
      const aiportsOutbound = airport.findByCodes(aiportsActives, pack.filterOrigins(packs))
      const aiportsInbound = airport.findByCodes(aiportsActives, pack.filterDestinies(packs))
      const countryAiportsOutbound = countryAirport.create(airports)
      const countryAiportsInbound = countryAirport.create(airports)
      const data = flightsDomain.create()
      return flightsDomain.set(data, {
        countryAiportsOutbound,
        countryAiportsInbound,
        aiportsOutbound,
        aiportsInbound
      })
    }
  }

  return new Flights()
}
