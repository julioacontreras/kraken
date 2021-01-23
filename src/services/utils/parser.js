const mongoose = require('mongoose')
const { Schema } = mongoose
const parserData = require('../parsers/parsers.json')
const JPath = require('./jPath')
const jpath = new JPath()

class Parser {
  connect (config) {
    mongoose.set('useUnifiedTopology', true)
    const url = 'mongodb://localhost:27017'
    mongoose.connect(url + '/' + config.database.name, { useNewUrlParser: true })
    return mongoose.connection
  }

  async loadCollections (parserSettings) {
    const collection = []
    for (const i in parserSettings.collections) {
      const psc = parserSettings.collections[i]
      const Model = mongoose.model(psc.collection, new Schema({}))
      collection[psc.alias] = JSON.parse(JSON.stringify(await Model.find({})))
    }
    return collection
  }

  parserAttributes (attributes, ps, collections) {
    for (const prop in attributes) {
      const value = attributes[prop]
      if (prop === ps.field) {
        if (value.includes('@xpath ')) {
          const sintax = value.split('@xpath ')[1]
          attributes[prop] = jpath.findOne(sintax, collections[ps.collection.alias])[ps.collection.field]
        }
      }
    }
    return attributes
  }

  parserCollections (collections, parserSettings) {
    for (const cname in parserSettings.parsers) {
      const ps = parserSettings.parsers[cname]
      if (!ps) {
        continue
      }
      /*
      for (const idx in collections[cname]) {
        // const item = collections[cname][idx]
        // console.log(item)
        // collections[cname][idx] = this.parserAttributes(item, ps, collections)
      }
      */
    }
    return collections
  }

  exec (config, callback) {
    const parserSettings = parserData
    const db = this.connect(config)
    db.on('error', console.error.bind(console, 'connection error:'))
    const self = this
    db.once('open', async () => {
      let collections = await self.loadCollections(parserSettings)
      collections = self.parserCollections(collections, parserSettings)
      db.close()
      callback(collections)
    })
  }
}

module.exports = Parser
