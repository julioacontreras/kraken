const helper = require('../../../../shared/helper')()

class ConfigCreator {
  findEl (array, path) {
    return array.find(el => el.path === path)
  }

  async add (options) {
    let config = ''
    try {
      config = JSON.parse(helper.loadFile(options.rootPath, '/plugins.json'))
    } catch (e) {
      console.error(e)
      return
    }
    const path = `~/plugins/${options.name}`
    const result = this.findEl(config.plugins, path)
    if (!result) {
      let opt = {}
      if (options.database) {
        opt = { database: options.database }
      }
      config.plugins.push({ path, options: opt })
      helper.createFile(`${options.rootPath}/plugins.json`, JSON.stringify(config, null, 2))
    }
  }
}

module.exports = ConfigCreator
