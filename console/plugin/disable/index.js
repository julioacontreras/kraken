'use strict'
const inquirer = require('inquirer')
const PluginRemover = require('./pluginRemover')

inquirer.prompt([
  {
    type: 'input',
    message: 'Name plugin:',
    name: 'name'
  }
]).then((options) => {
  options.path = __dirname
  options.rootPath = `${__dirname}/../../..`
  const pr = new PluginRemover()
  pr.removePlugin(options)
})
