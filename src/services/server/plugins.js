const loadPlugin = ({ app, el }) => {
  return require(`${el.path}/register`)({ app, options: el.options })
}

module.exports = ({ app, plugins }) => {
  const pluginList = []
  plugins.map(el => pluginList.push(loadPlugin({ app, el })))
  return pluginList
}
