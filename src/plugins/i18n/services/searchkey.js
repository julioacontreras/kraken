
class SearchKey {
  getValue (keys, data, level, searchValue) {
    const key = keys[level]
    if (data[key]) {
      if (keys.length === (level + 1)) {
        return data[key]
      }
      return this.getValue(keys, data[key], level + 1)
    }
    return searchValue
  }

  search (data, searchValue) {
    if (searchValue.includes('.')) {
      const keys = searchValue.split('.')
      return this.getValue(keys, data, 0, searchValue)
    }
    if (data[searchValue]) {
      return data[searchValue]
    }
    return searchValue
  }
}

module.exports = new SearchKey()
