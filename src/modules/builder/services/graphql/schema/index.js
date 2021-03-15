const path = require('path')
const fs = require('fs')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const Resolvers = require('../resolvers')

module.exports = ({ app }) => {
  const pathGraphql = app.params.graphql.flight
  const typeDefs = `
    ${fs.readFileSync(path.join(pathGraphql, '/root.gql'))}
    ${fs.readFileSync(path.join(pathGraphql, '/availability.gql'))}
    ${fs.readFileSync(path.join(pathGraphql, '/flights.gql'))}
    ${fs.readFileSync(path.join(pathGraphql, '/airport.gql'))}
    ${fs.readFileSync(path.join(pathGraphql, '/countryAirport.gql'))}
    ${fs.readFileSync(path.join(pathGraphql, '/sessionFlight.gql'))}
    ${fs.readFileSync(path.join(pathGraphql, '/sessionDetailFlight.gql'))}
    ${fs.readFileSync(path.join(pathGraphql, '/flightSegment.gql'))}
    ${fs.readFileSync(path.join(pathGraphql, '/passenger.gql'))}
    ${fs.readFileSync(path.join(pathGraphql, '/plan.gql'))}
    ${fs.readFileSync(path.join(pathGraphql, '/inventory.gql'))}
    ${fs.readFileSync(path.join(pathGraphql, '/responsable.gql'))}
    `
  const resolvers = Resolvers({ app })
  return makeExecutableSchema({
    typeDefs,
    resolvers
  })
}
