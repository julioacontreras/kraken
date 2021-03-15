const ControllerCreator = require('./creators/controllerCreator')
const ServiceCreator = require('./creators/serviceCreator')
const RoutesCreator = require('./creators/routesCreator')
const RegisterCreator = require('./creators/registerCreator')
const ConfigCreator = require('./creators/configCreator')

const capitalize = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

class CreateModule {
  exec (options) {
    if (!options.module) {
      console.error('Error: Invalid name')
      return
    }

    options.folders.map(key => {
      const name = capitalize(key)
      const fn = this[`create${name}`]
      if (fn) {
        fn(options)
      }
    })
  }

  createControllers (options) {
    options.folders.map(folder => {
      if (folder === 'controllers') {
        const controller = new ControllerCreator()
        controller.create(options)
      } else
      if (folder === 'register') {
        const register = new RegisterCreator()
        register.create(options)
      } else
      if (folder === 'services') {
        const service = new ServiceCreator()
        service.create(options)
      } else
      if (folder === 'domains') {

      } else
      if (folder === 'models') {

      } else
      if (folder === 'routes') {
        const routes = new RoutesCreator()
        routes.create(options)
      } else
      if (folder === 'seeds') {

      } else
      if (folder === 'config') {
        const routes = new ConfigCreator()
        routes.addModule(options)
      }
    })
  }
}

module.exports = CreateModule
