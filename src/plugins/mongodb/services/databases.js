module.exports = ({ databases }) => {
  const db = {}
  Object.keys(databases).map(key => {
    db[key] = require(`${databases[key].connector}`, false, /\.js$/)(databases[key].params)
  })
  return db
}
