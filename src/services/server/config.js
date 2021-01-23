require('dotenv').config()

module.exports = ({ basePath }) => {
  class Config {
    parse (data) {
      return this.parseShomething(data)
    }

    parseShomething (el) {
      const self = this
      if (typeof el === 'string') {
        return self.parseString(el)
      } else
      if (Array.isArray(el)) {
        el.map((el, idx, array) => { array[idx] = self.parseShomething(el) })
      } else
      if (typeof el === 'object') {
        Object.keys(el).forEach(key => {
          el[key] = self.parseShomething(el[key])
        })
      }
      return el
    }

    parseString (value) {
      const rgxEnv = /(\$env{)\w+(})/
      if (rgxEnv.test(value)) {
        const matched = value.match(rgxEnv)
        const key = matched[0].replace('$env{', '').replace('}', '')
        value = value.replace(rgxEnv, process.env[key])
      }
      if (value.includes('~/')) {
        value = value.replace('~/', `${basePath}/`)
      }
      return value
    }
  }

  return new Config()
}
