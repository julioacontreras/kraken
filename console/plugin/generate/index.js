'use strict'
const inquirer = require('inquirer')
const Creator = require('./services/creator')

inquirer.prompt([
  {
    type: 'input',
    message: 'Name plugin:',
    name: 'name'
  },
  {
    type: 'checkbox',
    message: 'Select your plugin structure',
    name: 'folders',
    choices: [
      {
        name: 'Add plugin in config',
        value: 'config',
        checked: true
      },
      {
        name: 'Register',
        value: 'register',
        checked: true
      },
      {
        name: 'Controllers',
        value: 'controllers',
        checked: true
      },
      {
        name: 'Services',
        value: 'services',
        checked: true
      },
      {
        name: 'Domains',
        value: 'domains',
        checked: true
      },
      {
        name: 'Models',
        value: 'models',
        checked: true
      },
      {
        name: 'Routes',
        value: 'routes',
        checked: true
      },
      {
        name: 'Seeds',
        value: 'seeds',
        checked: true
      }
    ]
  }
]).then((options) => {
  options.path = __dirname
  options.rootPath = `${__dirname}/../../..`
  const c = new Creator()
  c.exec(options)
})
