const winston = require('winston')
const format = winston.format

module.exports = function ({ app, options }) {
  const { combine, timestamp } = format
  const logPath = options.path
  const logger = winston.createLogger({
    level: 'info',
    format: combine(
      timestamp(),
      format.json()
    ),
    transports: [
      new winston.transports.File({ filename: `${logPath}/error.log`, level: 'error' }),
      new winston.transports.File({ filename: `${logPath}/combined.log` })
    ]
  })
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }))
  }
  logger.errorTrace = (msg) => {
    if (process.env.NODE_ENV === 'test') {
      return
    }
    try {
      throw new Error('internalError')
    } catch (e) {
      logger.error(msg + '\n' + e.stack)
    }
  }
  return logger
}
