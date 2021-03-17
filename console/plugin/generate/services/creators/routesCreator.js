const Mustache = require('mustache')
const helper = require('../../../../shared/helper')()

class RoutesCreator {
  async create (options) {
    let template = ''
    try {
      template = helper.loadFile(options.path, './templates/routes.template.js')
      template = Mustache.render(template, { name: `/${options.name}` })
    } catch (e) {
      console.error(e)
      return
    }
    const existDirectory = await helper.dirExist(options.rootPath, '/src/plugins/' + options.name)
    if (!existDirectory) {
      const dir = helper.createPath(options.rootPath, '/src/plugins/' + options.name + '/routes')
      helper.createDir(dir)
      helper.createFile(`${dir}/index.js`, template)
    } else {
      console.error('Error: Plugins exists')
    }
  }
}

module.exports = RoutesCreator
