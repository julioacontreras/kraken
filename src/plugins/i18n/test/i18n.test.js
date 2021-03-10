const path = require('path')
const basePath = path.resolve('./src')
const i18n = require('../services/i18n')(basePath)

/* eslint-disable */
test('i18n', () => {
    expect(i18n.t('city.valencia')).toBe('Valencia')
})
