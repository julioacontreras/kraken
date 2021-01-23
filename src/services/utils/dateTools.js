const { format, addDays, addMinutes, subDays } = require('date-fns')

class DateTools {
  toTimestampWithouTime (date) {
    return format(date, 'yyyy-MM-dd')
  }

  toTimestamp (date) {
    return format(date, 'yyyy-MM-dd HH:mm:ss.SSS')
  }

  addDays (date, days) {
    return addDays(date, days)
  }

  subDays (date, days) {
    return subDays(date, days)
  }

  addMinutes (date, minutes) {
    return addMinutes(date, minutes)
  }
}

module.exports = new DateTools()
