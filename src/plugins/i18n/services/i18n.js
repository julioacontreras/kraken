
module.exports = (basePath) => {
  const Dictionary = require('./dictionary')(basePath)
  const dictionary = new Dictionary()
  const sk = require('./searchkey')

  class I18n {
    constructor (locale) {
      this.locale = locale
      this.es = dictionary.lang('en')
      this.es = dictionary.lang('es')
    }

    t (value) {
      const json = this[this.locale]
      return sk.search(json, value)
    }
  }

  return I18n
}
