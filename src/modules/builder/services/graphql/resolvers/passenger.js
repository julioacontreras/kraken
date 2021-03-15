const PassengerDomain = require('../../../domains/passenger')

module.exports = ({ app }) => {
  const passengerDomain = new PassengerDomain()
  class Passenger {
    updatePlans (passengersPlans, passengers, session) {
      passengersPlans.map(pp => {
        passengers.map((el, idx, arr) => {
          arr[idx] = passengerDomain.updatePlan(
            pp,
            el,
            session.originatingFlight.plans,
            session.returnFlight.plans,
            session.goAndBack)
        })
      })
      return passengers
    }

    create (age, originatingFlight, returnFlight) {
      return passengerDomain.create(age, originatingFlight, returnFlight)
    }

    createMany (passengersAges, goPlans, backPlans) {
      return passengerDomain.createMany(passengersAges, goPlans, backPlans)
    }

    sanitizePassengers (passengers) {
      return passengerDomain.sanitizePassengers(passengers)
    }

    prepareMongoDB (field, idx, value, data) {
      data[`session.passengers.${idx}.${field}`] = value
      return data
    }

    prepareUpdate (passengers, removeThisFields) {
      const self = this
      let data = {}
      passengers.map((el, idx) => {
        const passenger = passengerDomain.preparePassenger(el, removeThisFields)
        Object.keys(passenger).map(field => {
          data = self.prepareMongoDB(field, idx, el[field], data)
        })
      })
      return data
    }

    validatePassengers (passengers) {
      passengers.map(el => {
        if (passengerDomain.validate(el)) {
          throw 'Sesson:createIdLocator: invalid fields in passengers.' // eslint-disable-line       
        }
      })
    }
  }

  return new Passenger()
}
