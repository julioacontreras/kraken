const helper = require('../../shared/helper')()

class PlugingCreator {
  findPlugin (plugins, path) {
    return plugins.find(el => el.path === path)
  }

  async add (options) {
    let config = {}
    try {
      config = JSON.parse(helper.loadFile(options.rootPath, '/plugins.json'))
    } catch (e) {
      console.error(e)
      return
    }
    const pathModule = `~/plugins/${options.name}`
    const existInJsonThisPlugin = this.findPlugin(config.plugins, pathModule)
    if (!existInJsonThisPlugin) {
      const existDir = await helper.dirExist(options.rootPath, `/src/plugins/${options.name}`)
      if (!existDir) {
        console.error('Plugin not exist')
        return
      }

      let opt = {}
      const filenamepath = helper.createPath(options.rootPath, `/src/plugins/${options.name}/config/default.json`)
      const optionsFleExist = helper.fileExist(filenamepath)
      if (optionsFleExist) {
        opt = JSON.parse(helper.loadFile(filenamepath))
      }

      config.plugins.push(opt)
      helper.createFile(`${options.rootPath}/plugins.json`, JSON.stringify(config, null, 2))
    }
  }
}

module.exports = PlugingCreator
