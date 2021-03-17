module.exports = ({ app, options }) => {
  const mongoose = require('mongoose')
  const Schema = mongoose.Schema
  const User = mongoose.model('User', new Schema({
    name: String,
    type: String,
    email: String,
    username: String,
    password: String,
    cookies: Array,
    wrongPasswordCount: Number,
    salt: String
  }))

  const crypto = require('crypto')

  const sha512 = (password, salt) => {
    const hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    const value = hash.digest('hex')
    return value
  }

  User.validPassword = (user, passwordPlain) => {
    if (!user) {
      console.error('No exist user!')
      return false
    }
    if (!user.salt) {
      console.error('Error user dont have salt!')
      return false
    }
    const password = sha512(passwordPlain, user.salt)
    if (user.password === password) {
      return true
    }
    return false
  }

  User.prepare = (user, token) => {
    delete user.salt
    delete user.password
    if (user._id) {
      delete user._id
    }
    return user
  }

  User.sha512 = (password, salt) => {
    return sha512(password, salt)
  }

  return User
}
