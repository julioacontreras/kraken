module.exports = function ({ app, options }) {
  const User = require('../models/user')()
  const passport = require('passport')
  const crypto = require('crypto')
  app.use(passport.initialize())
  app.use(passport.session())
  app.security = {
    token: 333
  }

  const LocalStrategy = require('passport-local').Strategy

  crypto.randomBytes(48, (_, buffer) => {
    app.security.token = buffer.toString('hex')
  })

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((_id, done) => {
    User.findOne({ _id: _id }, (err, user) => {
      user = User.prepare(user)
      done(err, user)
    })
  })

  passport.use(new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err) }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' })
        }
        if (!User.validPassword(user, password)) {
          return done(null, false, { message: 'Incorrect password.' })
        }
        user = User.prepare(user, app.security.token)
        return done(null, user)
      })
    }
  ))

  return passport
}
