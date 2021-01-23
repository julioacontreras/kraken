
module.exports = {

  isAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
      next()
      return
    }
    res.status(500).json({ status: 'error authenticate' })
  },

  isAdmin (req, res, next) {
    if (!req.isAuthenticated()) {
      res.status(500).json({ status: 'error authenticate' })
      return
    }
    if (!req.user.type === 'admin') {
      res.status(500).json({ status: 'error no admin user' })
      return
    }
    next()
  }
}
