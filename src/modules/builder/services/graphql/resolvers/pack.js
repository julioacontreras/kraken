const PackDomain = require('../../../domains/pack')
const FlightsegmentDomain = require('../../../domains/flightsegment')
const { format, addDays } = require('date-fns')
const Airport = require('./airport')
const FlightCompany = require('./flightCompany')
const PlanDomain = require('../../../domains/plan')

module.exports = ({ app }) => {
  const packDomain = new PackDomain()
  const planDomain = new PlanDomain()
  const flightsegmentDomain = new FlightsegmentDomain()
  const model = app.Model.flight.Pack()
  const airport = Airport({ app })
  const flightCompany = FlightCompany({ app })

  class Pack {
    findNextFligths () {
      const days = 365
      const rangeBegin = format(new Date(), 'yyyy-MM-dd')
      const rangeFinish = format(addDays(new Date(), days), 'yyyy-MM-dd')
      const filter = {
        active: true,
        takeoffAt: { $gte: rangeBegin, $lte: rangeFinish },
        $where: 'this.totalSeats > this.totalSold'
      }
      return model.find(filter)
    }

    filterMaxSeatsOrigin (packs) {
      return packDomain.getMaxValueInArray(packs)
    }

    filterDateStart (packs) {
      return packs.map(item => item.takeoffAt)
        .filter((value, index, self) => self.indexOf(value) === index)
    }

    filterDateFinish (packs) {
      return packs.map(item => item.arriveAt)
        .filter((value, index, self) => self.indexOf(value) === index)
    }

    filterOrigins (packs) {
      return packs.map(item => item.outboundCode)
        .filter((value, index, self) => self.indexOf(value) === index)
    }

    filterDestinies (packs) {
      return packs.map(item => item.inboundCode)
        .filter((value, index, self) => self.indexOf(value) === index)
    }

    async countFreeSeats (takeoffAt, outboundCode, inboundCode, totalPassengers) {
      const result = await model.find({
        outboundCode,
        inboundCode,
        totalSeats: {
          $gte: totalPassengers
        },
        takeoffAt: {
          $gte: format((new Date(takeoffAt)), 'yyyy-MM-dd') + 'T00:00',
          $lte: format((new Date(takeoffAt)), 'yyyy-MM-dd') + 'T23:59'
        }
      })
      return result.map(el => result.totalSeats > result.totalSold ? el : undefined)
    }

    findFligth (outboundCode, inboundCode, takeoffAt, totalPassengers) {
      return model.findOne({
        active: true,
        takeoffAt: {
          $gte: format((new Date(takeoffAt)), 'yyyy-MM-dd') + 'T00:00',
          $lte: format((new Date(takeoffAt)), 'yyyy-MM-dd') + 'T23:59'
        },
        outboundCode: outboundCode,
        inboundCode: inboundCode,
        totalSeats: { $gte: totalPassengers }
      })
    }

    findFligthGo (outboundCode, inboundCode, takeoffAt, totalPassengers) {
      return model.findOne({
        active: true,
        takeoffAt: {
          $gte: format((new Date(takeoffAt)), 'yyyy-MM-dd') + 'T00:00',
          $lte: format((new Date(takeoffAt)), 'yyyy-MM-dd') + 'T23:59'
        },
        outboundCode: outboundCode,
        inboundCode: inboundCode
      }).or([
        { 'plans.totalSeats': { $gte: totalPassengers } }
      ])
    }

    createFragmentFlightEmpty () {
      return flightsegmentDomain.prepareEmpty()
    }

    async createFragmentFlight (outboundCode, inboundCode, takeoffAt, totalPassengers) {
      const pack = await this.findFligth(outboundCode, inboundCode, takeoffAt, totalPassengers)
      if (!pack) {
        throw 'Not found pack' // eslint-disable-line
      }

      const outboundAirporData = await airport.findActiveOne({ code: outboundCode })
      if (!outboundAirporData) {
        throw 'Invalid outbound airport' // eslint-disable-line
      }

      const inboundAirporData = await airport.findActiveOne({ code: inboundCode })
      if (!inboundAirporData) {
        throw 'Invalid inbound airport' // eslint-disable-line
      }

      const companyData = await flightCompany.findActiveOne({ code: pack.flightCompanyCode })
      if (!companyData) {
        throw 'Invalid flight company' // eslint-disable-line
      }
      return flightsegmentDomain.prepare(
        pack,
        outboundAirporData,
        planDomain.filterOnlyPublic(pack.plans),
        companyData.name,
        inboundAirporData
      )
    }
  }

  return new Pack()
}
