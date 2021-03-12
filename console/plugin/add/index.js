'use strict'
const inquirer = require('inquirer')
const PluginCreator = require('./pluginCreator')

inquirer.prompt([
  {
    type: 'input',
    message: 'Name plugin:',
    name: 'name'
  }
]).then((options) => {
  options.path = __dirname
  options.rootPath = `${__dirname}/../../..`
  const pc = new PluginCreator()
  pc.add(options)
})
