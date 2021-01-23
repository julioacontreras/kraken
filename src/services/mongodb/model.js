module.exports = ({ name, schema, connector }) => {
  /**
   *  NOTE:
   *  The nodel name need by like this 'User' or 'Teacher'
   *  And in database like this 'users' and 'teachers'
   */
  const mongoose = require('mongoose')
  const Schema = new mongoose.Schema(schema)
  const MongoModel = connector.model(name, Schema)
  MongoModel.merge = (fields, model) => {
    Object().keys(fields).map(key => { model[key] = fields[key] })
    return model
  }

  return MongoModel
}
