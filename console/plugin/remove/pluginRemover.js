const helper = require('../../shared/helper')()

class PlugingRemover {
  findPlugin (plugins, path) {
    return plugins.find(el => el.path === path)
  }

  getIdxPlugin (plugins, path) {
    let idx = -1
    plugins.map((el, i) => {
      if (el.path === path) {
        idx = i
      }
    })
    return idx
  }  

  removePlugin (options) {
    let config = {}
    try {
      config = JSON.parse(helper.loadFile(options.rootPath, '/plugins.json'))
    } catch (e) {
      console.error(e)
      return
    }
    const pathModule = `~/plugins/${options.name}`
    const existInJsonThisPlugin = this.findPlugin(config.plugins, pathModule)
    if (existInJsonThisPlugin) {
      const idx = this.getIdxPlugin(config.plugins, pathModule)
      if (idx > -1) {
        config.plugins.splice(idx, 1)
      }
      helper.createFile(`${options.rootPath}/plugins.json`, JSON.stringify(config, null, 2))
    }
  }
}

module.exports = PlugingRemover
