const Flights = require('./flights')
const Destinies = require('./destinies')
const Availability = require('./availability')
const Session = require('./session')
const Ticket = require('./ticket')

module.exports = ({ app }) => {
  const flights = Flights({ app })
  const destinies = Destinies({ app })
  const availability = Availability({ app })
  const session = Session({ app })
  const ticket = Ticket({ app })
  const resolvers = {
    Query: {
      flights: () => flights.get(),
      destinies: (_, { goAndBack, outboundCode }) => destinies.getAirportsByOutbound(goAndBack, outboundCode),
      availabilityToFight: (_, { goAndBack, outboundCode, inboundCode }) => availability.get(goAndBack, outboundCode, inboundCode),
      session: (_, { locator }) => session.get(locator),
      ticket: (_, { locator }) => ticket.get(locator),
      ticketByOrderId: (_, { orderId }) => ticket.getByOrderId(orderId)
    },
    Mutation: {
      createSession: (_, { goAndBack, outboundCode, inboundCode, goAt, backAt, passengersAges }) => {
        return session.create(goAndBack, outboundCode, inboundCode, goAt, backAt, passengersAges)
      },
      registerPassengers: (_, { locator, passangers, responsable }) => session.registerPassengers(locator, passangers, responsable),
      registerPlans: (_, { locator, passangers }) => session.registerPlans(locator, passangers)
    }
  }
  return resolvers
}
