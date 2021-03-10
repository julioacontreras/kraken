module.exports = ({ app }) => {
  class Service {
    getMessage () {
      return 'hellow world!'
    }
  }
  return Service
}
