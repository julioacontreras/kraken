'use strict'
const inquirer = require('inquirer')
const CreateModule = require('./services/createModule')

inquirer.prompt([
  {
    type: 'input',
    message: 'Name module:',
    name: 'module'
  },
  {
    type: 'checkbox',
    message: 'Select your module structure',
    name: 'folders',
    choices: [
      {
        name: 'Add module in config',
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
  const cm = new CreateModule()
  cm.exec(options)
})
