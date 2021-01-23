var jp = require('jsonpath')

class JPath {
  findOne (sintax, collection) {
    const result = jp.query(collection, sintax)
    if (result.length) {
      return result[0]
    }
    return result
  }
}

module.exports = JPath
