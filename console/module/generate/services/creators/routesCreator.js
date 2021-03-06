const Mustache = require('mustache')
const helper = require('../../../../shared/helper')()

class RoutesCreator {
  async create (options) {
    let template = ''
    try {
      template = helper.loadFile(options.path, './templates/routes.template.js')
      template = Mustache.render(template, { name: `/${options.module}` })
    } catch (e) {
      console.error(e)
      return
    }
    const existDirectory = await helper.dirExist(options.rootPath, '/src/modules/' + options.module)
    if (!existDirectory) {
      const dir = helper.createPath(options.rootPath, '/src/modules/' + options.module + '/routes')
      helper.createDir(dir)
      helper.createFile(`${dir}/index.js`, template)
    } else {
      console.error('Error: Module exists')
    }
  }
}

module.exports = RoutesCreator
