const fs = require('fs')

module.exports = (basePath) => {
  const distionary = JSON.parse(fs.readFileSync(`${basePath}/../static/modules/i18n/dictionary.json`, 'utf8'))
  class I18n {
    lang (lang) {
      return distionary[lang]
    }
  }
  return I18n
}
