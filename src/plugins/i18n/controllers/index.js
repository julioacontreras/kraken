
module.exports = ({ app }) => {
  const Dictionary = require('../services/dictionary')(app.params.basePath)
  const dictionary = new Dictionary()

  return {
    async getMessages (req, res) {
      const lang = req.params.lang
      res.json(dictionary.lang(lang))
    }
  }
}
