const helper = require('../../../shared/helper')()

class ServiceCreator {
  async create (options) {
    let template = ''
    try {
      template = helper.loadFile(options.path, './templates/service.template.js')
    } catch (e) {
      console.error(e)
      return
    }
    const existDirectory = await helper.dirExist(options.path, '../../src/modules/' + options.module)
    if (!existDirectory) {
      const dir = helper.createPath(options.path, '../../src/modules/' + options.module + '/services')
      helper.createDir(dir)
      helper.createFile(`${dir}/index.js`, template)
    } else {
      console.error('Error: Module exists')
    }
  }
}

module.exports = ServiceCreator
