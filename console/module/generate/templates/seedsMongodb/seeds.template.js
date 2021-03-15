// const fs = require('fs')

const app = {
  model: {},
  Model: {},
  service: {},
  db: {
    myDatabase: false
  }
}

const bootstrap = require('./bootstrap')(app)
const promise = bootstrap()
promise.then(async (app) => {
  /*
  const MyModel = app.Model.myDatabase.MyModel()
  await MyModel.deleteMany({})
  const data = JSON.parse(fs.readFileSync(`${app.params.basePath}/modules/flight/seeds/data/packs.json`))
  await MyModel.insertMany(data)
  const result = await MyModel.find()
  console.info(result)
  */
  process.exit(1)
})
