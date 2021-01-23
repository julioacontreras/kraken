const loadModule = ({ app, el }) => {
  return require(`${el.path}/register`)({ app, options: el.options })
}

module.exports = ({ app, modules }) => {
  const moduleList = []
  modules.map(el => moduleList.push(loadModule({ app, el })))
  return moduleList
}
