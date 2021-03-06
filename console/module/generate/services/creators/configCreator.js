const helper = require('../../../../shared/helper')()

class ConfigCreator {
  findModule (modules, path) {
    return modules.find(el => el.path === path)
  }

  async addModule (options) {
    let config = ''
    try {
      config = JSON.parse(helper.loadFile(options.rootPath, '/modules.json'))
    } catch (e) {
      console.error(e)
      return
    }
    const pathModule = `~/modules/${options.module}`
    const result = this.findModule(config.modules, pathModule)
    if (!result) {
      let opt = {}
      if (options.database) {
        opt = { database: options.database }
      }
      config.modules.push({ path: pathModule, options: opt })
      helper.createFile(`${options.rootPath}/modules.json`, JSON.stringify(config, null, 2))
    }
  }
}

module.exports = ConfigCreator
