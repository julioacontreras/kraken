'use strict'
const inquirer = require('inquirer')
const ModuleDisable = require('./moduleDisable')

inquirer.prompt([
  {
    type: 'input',
    message: 'Name module:',
    name: 'name'
  }
]).then((options) => {
  options.path = __dirname
  options.rootPath = `${__dirname}/../../..`
  const md = new ModuleDisable()
  md.disable(options)
})
