const mongoose = require('mongoose')

module.exports = (params) => {
  mongoose.set('useUnifiedTopology', true)
  const options = params.options || {}
  const db = mongoose.createConnection(params.url, options)

  const promise = new Promise((resolve, reject) => {
    db.on('error', () => {
      console.error('connection error:')
      reject(new Error('connection error'))
    })
    db.once('open', () => {
      console.info('Connected with database.')
      resolve(db)
    })
  })

  return promise
}
