module.exports = ({ app }) => {
  const Models = {
    Payment: require('./payment')({ app }),
    Order: require('./order')({ app })
  }
  return Models
}
