const helper = require('../../../../shared/helper')()

class RegisterCreator {
  async create (options) {
    let template = ''
    try {
      template = helper.loadFile(options.path, './templates/register.template.js')
    } catch (e) {
      console.error(e)
      return
    }
    const existDirectory = await helper.dirExist(options.rootPath, '/src/plugins/' + options.name)
    if (!existDirectory) {
      const dir = helper.createPath(options.rootPath, '/src/plugins/' + options.name + '/register')
      helper.createDir(dir)
      helper.createFile(`${dir}/index.js`, template)
    } else {
      console.error('Error: Plugin exists')
    }
  }
}

module.exports = RegisterCreator
