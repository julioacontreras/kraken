const sanitizeInstanceModel = (model) => {
  const sanitize = (module) => {
    if (!model) {
      model = {}
    }
    if (!model[module]) {
      model[module] = {}
    }
    return model
  }
  return sanitize
}

module.exports = sanitizeInstanceModel
