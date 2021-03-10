const helper = require('../helper')()

class RegisterCreator {
  async create (options) {
    let template = ''
    try {
      template = helper.loadFile(options.path, './templates/register.template.js')
    } catch (e) {
      console.error(e)
      return
    }
    const existDirectory = await helper.dirExist(options.path, '../../src/modules/' + options.module)
    if (!existDirectory) {
      const dir = helper.createPath(options.path, '../../src/modules/' + options.module + '/register')
      helper.createDir(dir)
      helper.createFile(`${dir}/index.js`, template)
    } else {
      console.error('Error: Module exists')
    }
  }
}

module.exports = RegisterCreator