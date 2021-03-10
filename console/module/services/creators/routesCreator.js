const helper = require('../helper')()
const Mustache = require('mustache')

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
    const existDirectory = await helper.dirExist(options.path, '../../src/modules/' + options.module)
    if (!existDirectory) {
      const dir = helper.createPath(options.path, '../../src/modules/' + options.module + '/routes')
      helper.createDir(dir)
      helper.createFile(`${dir}/index.js`, template)
    } else {
      console.error('Error: Module exists')
    }
  }
}

module.exports = RoutesCreator
