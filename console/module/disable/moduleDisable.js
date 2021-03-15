const helper = require('../../shared/helper')()

class PlugingDisable {
  findEl (array, path) {
    return array.find(el => el.path === path)
  }

  getIdx (array, path) {
    let idx = -1
    array.map((el, i) => {
      if (el.path === path) {
        idx = i
      }
    })
    return idx
  }  

  disable (options) {
    let config = {}
    try {
      config = JSON.parse(helper.loadFile(options.rootPath, '/modules.json'))
    } catch (e) {
      console.error(e)
      return
    }
    const path = `~/modules/${options.name}`
    const existInJsonThisPlugin = this.findEl(config.modules, path)
    if (existInJsonThisPlugin) {
      const idx = this.getIdx(config.modules, path)
      if (idx > -1) {
        config.modules.splice(idx, 1)
      }
      helper.createFile(`${options.rootPath}/modules.json`, JSON.stringify(config, null, 2))
    }
  }
}

module.exports = PlugingDisable
