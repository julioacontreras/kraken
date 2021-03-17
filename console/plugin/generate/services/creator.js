const ControllerCreator = require('./creators/controllerCreator')
const ServiceCreator = require('./creators/serviceCreator')
const RoutesCreator = require('./creators/routesCreator')
const RegisterCreator = require('./creators/registerCreator')
const ConfigCreator = require('./creators/configCreator')

const capitalize = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

class Creator {
  exec (options) {
    if (!options.name) {
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
    const controller = new ControllerCreator()
    controller.create(options)
  }

  createRegister (options) {
    const register = new RegisterCreator()
    register.create(options)
  }

  createServices (options) {
    const service = new ServiceCreator()
    service.create(options)
  }

  createRoutes (options) {
    const routes = new RoutesCreator()
    routes.create(options)
  }

  createConfig (options) {
    const routes = new ConfigCreator()
    routes.add(options)
  }
}

module.exports = Creator
