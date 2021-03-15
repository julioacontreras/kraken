const Pack = require('./pack')

module.exports = ({ app }) => {
  const pack = Pack({ app })
  class Availability {
    async getGo (outboundCode) {
      const packsGo = await pack.findNextFligths().and({ outboundCode })
      const datesOutbound = pack.filterDateStart(packsGo)
      const countPassengerGo = pack.filterMaxSeatsOrigin(packsGo)
      return {
        datesOutbound,
        countPassengerGo,
        haveAvailability: true
      }
    }

    async getGoAndBack (outboundCode, inboundCode) {
      const packsGo = await pack.findNextFligths().and({ outboundCode, inboundCode })
      const datesOutbound = pack.filterDateStart(packsGo)
      const packBack = await pack.findNextFligths().and({ outboundCode: inboundCode, inboundCode: outboundCode })
      const datesInbound = pack.filterDateFinish(packBack)
      const countSeatsGo = pack.filterMaxSeatsOrigin(packsGo)
      const countSeatsBack = pack.filterMaxSeatsOrigin(packBack)
      if (new Date(datesOutbound) > new Date(datesInbound)) {
        return {
          haveAvailability: false,
          reason: 'not-found-go-and-back'
        }
      }
      return {
        datesOutbound,
        datesInbound,
        countSeatsGo,
        countSeatsBack,
        haveAvailability: true
      }
    }

    get (goAndBack, outboundCode, inboundCode) {
      if (goAndBack) {
        return this.getGoAndBack(outboundCode, inboundCode)
      }
      return this.getGo(outboundCode)
    }
  }
  return new Availability()
}
