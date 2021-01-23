const mongoose = require('mongoose')

module.exports = (params) => {
  mongoose.set('useUnifiedTopology', true)
  const options = params.options || {}
  const db = mongoose.createConnection(params.url, options)

  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.info('Connected with database.')
  })

  return db
}
