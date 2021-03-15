const Pack = require('../pack')
const Passenger = require('../passenger')

module.exports = ({ app }) => {
  const dateTools = require(`${app.params.basePath}/services/utils/dateTools`)
  const model = app.Model.flight.Flightsession()
  const pack = Pack({ app })
  const passenger = Passenger({ app })

  class Session {
    async get (locator) {
      const result = await model.findOne({ locator })
      if (!result) {
        return {
          error: true,
          message: 'Not found session'
        }
      }
      if (new Date() > new Date(result.expireAt)) {
        return {
          error: true,
          message: 'Expired session'
        }
      }
      return result
    }

    async getByOrderId (orderId) {
      const result = await model.findOne({ orderId })
      if (!result) {
        return {
          error: true,
          message: 'Not found session'
        }
      }
      if (new Date() > new Date(result.expireAt)) {
        return {
          error: true,
          message: 'Expired session'
        }
      }
      return result
    }

    canGoFlight (ts) {
      const d1 = new Date(ts)
      const d2 = new Date()
      d1.setHours(0, 0, 0, 0)
      d2.setHours(0, 0, 0, 0)
      return (d1 < d2)
    }

    removeExpiradedSessionsTwoDayaAgo () {
      const removeBeginninAt = dateTools.toTimestampWithouTime(dateTools.subDays(new Date(), 2))
      return model.deleteMany({ 'session.expireAt': { $lte: removeBeginninAt } })
    }

    async haveSeatsFreeInAnothersSessions (outboundCode, inboundCode, takeoffAt, seatsFree, seatsNeed) {
      const result = await model.findOne({
        session: {
          outboundCode,
          inboundCode,
          takeoffAt: {
            $gte: dateTools.toTimestampWithouTime(new Date(takeoffAt)) + 'T00:00',
            $lte: dateTools.toTimestampWithouTime(new Date(takeoffAt)) + 'T23:59'
          }
        }
      })
      if (!result) {
        return false
      }
      let occupiedSeats = 0
      result.map(el => { occupiedSeats += el.session.passagers.length })
      if (seatsNeed <= seatsFree - occupiedSeats) {
        return true
      }
      return false
    }

    async checkSeats (takeoffAt, outboundCode, inboundCode, passengersAges) {
      const totalSeatsFree = await pack.countFreeSeats(takeoffAt, outboundCode, inboundCode, passengersAges.length)
      if (!totalSeatsFree) {
        throw 'No seats' // eslint-disable-line
      }
      if (!this.haveSeatsFreeInAnothersSessions(outboundCode, inboundCode, takeoffAt, totalSeatsFree, passengersAges.length)) {
        throw 'Seats used another session' // eslint-disable-line
      }
    }

    async createIdLocator (attempts) {
      if (attempts >= 10) {
        throw 'Sesson:createIdLocator: Cant create locator Id.' // eslint-disable-line
      }
      const d = new Date()
      let locator = (d.getFullYear() + d.getMonth() + d.getDay() + d.getHours() + d.getMinutes() + d.getMilliseconds() + d.getUTCDate()) + ''
      locator = locator.toString().padStart(5, '0')
      const register = await model.findOne({ locator })
      if (!register) {
        return locator
      }
      return this.createIdLocator(attempts + 1)
    }

    async create (goAndBack, outboundCode, inboundCode, goAt, backAt, passengersAges) {
      if (this.canGoFlight(goAt)) {
        throw 'Input tsGoto: Invalid date, is to old.' // eslint-disable-line
      }
      await this.removeExpiradedSessionsTwoDayaAgo()
      this.checkSeats(goAt, outboundCode, inboundCode, passengersAges)
      if (goAndBack) {
        this.checkSeats(goAt, inboundCode, outboundCode, passengersAges)
      }
      let originatingFlight = {}
      let returnFlight = {}
      if (goAndBack) {
        originatingFlight = await pack.createFragmentFlight(outboundCode, inboundCode, goAt, passengersAges.length)
        returnFlight = await pack.createFragmentFlight(inboundCode, outboundCode, backAt, passengersAges.length)
      } else {
        originatingFlight = await pack.createFragmentFlight(outboundCode, inboundCode, goAt, passengersAges.length)
        returnFlight = pack.createFragmentFlightEmpty()
      }
      const passengers = passenger.createMany(passengersAges, originatingFlight, returnFlight)
      const expireAt = dateTools.addMinutes(new Date(), 10)
      const locator = await this.createIdLocator(0)
      const sessionData = {
        locator,
        session: {
          goAndBack,
          expireAt,
          goAt,
          backAt,
          originatingFlight,
          returnFlight,
          passengers,
          responsable: {
            name: '',
            email: ''
          }
        }
      }
      app.bot.info(`${app.i18n.t('flight.sessionCreated')}:${locator}`)
      await model.create(sessionData)
      return sessionData
    }

    calculeAmount (passengers) {
      let amount = 0
      if (passengers) {
        passengers.map((el) => {
          amount += Number(el.goPlanSelected.price)
          if (el.backPlanSelected) {
            amount += Number(el.backPlanSelected.price)
          }
        })
      }
      return amount
    }

    async registerPassengers (locator, passangers, responsable) {
      passangers = passenger.sanitizePassengers(passangers)
      passenger.validatePassengers(passangers)
      const removeThisFields = ['inventory', 'goPlanSelected', 'backPlanSelected']
      const data = {
        $set: passenger.prepareUpdate(passangers, removeThisFields)
      }
      data.$set['session.responsable'] = responsable
      await model.findOneAndUpdate({ locator }, data)
      return this.get(locator)
    }

    infoPlan (data) {
      let info = ''
      data.session.passengers.map((p, idx) => {
        info = `Pasagero ${idx + 1} con plan de ida `
        info += p.goPlanSelected.name
        if (data.session.goAndBack) {
          info += ' y plan de vuelta '
          info += p.backPlanSelected.name
        }
        info += ', '
      })
      info = info.slice(0, -1)
      return info
    }

    async registerPlans (locator, passengersPlans) {
      const session = await this.get(locator)
      const passengers = passenger.updatePlans(passengersPlans, session.session.passengers, session.session)
      const data = {
        $set: passenger.prepareUpdate(passengers, [])
      }
      data.$set['session.amount'] = this.calculeAmount(passengers)
      await model.findOneAndUpdate({ locator }, data)
      const sessionResult = await this.get(locator)
      const infoPlan = this.infoPlan(sessionResult)
      app.bot.info(`${app.i18n.t('flight.updated')}:${locator} - ${infoPlan}`)
      return sessionResult
    }
  }

  return new Session()
}
