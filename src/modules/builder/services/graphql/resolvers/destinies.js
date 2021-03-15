const Pack = require('./pack')
const Airport = require('./airport')

module.exports = ({ app }) => {
  const pack = Pack({ app })
  const airport = Airport({ app })

  class Flights {
    _getnextFlightsGoAndBack (outboundCode) {
      return pack.findNextFligths().or([{ outboundCode }, { inboundCode: outboundCode }])
    }

    _getnextFlightsGo (outboundCode) {
      return pack.findNextFligths().and({ outboundCode })
    }

    _getCityCodes (dataPack, outboundCode) {
      const codes = []
      dataPack.map((el) => {
        if (outboundCode === el.outboundCode) {
          if (!codes.includes(el.outboundCode)) {
            codes.push(el.outboundCode)
          }
        }
        if (outboundCode === el.inboundCode) {
          if (!codes.includes(el.outboundCode)) {
            codes.push(el.outboundCode)
          }
        }
      })
      return codes
    }

    _getAirportsByCities (dataPack, outboundCode) {
      const codes = this._getCityCodes(dataPack, outboundCode)
      return airport.findActives({ code: codes })
    }

    async getAirportsByOutbound (goAndBack, outboundCode) {
      let dataPack = []
      if (goAndBack) {
        dataPack = await this._getnextFlightsGoAndBack(outboundCode)
      } else {
        dataPack = await this._getnextFlightsGo(outboundCode)
      }
      return this._getAirportsByCities(dataPack, outboundCode)
    }
  }

  return new Flights()
}
