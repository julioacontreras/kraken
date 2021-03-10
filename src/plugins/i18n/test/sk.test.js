const sk = require('../services/searchKey')

/* eslint-disable */
test('sk', () => {
    const data = {
        city: {
            valencia: 'Valencia'
        }
    }
    expect(sk.search(data, 'city.valencia')).toBe('Valencia')
})

/* eslint-disable */
test('sk', () => {
    const data = {
        my: {
            best: {
                friend: 'my best friend'
            }
        }
    }
    expect(sk.search(data, 'my.best.friend')).toBe('my best friend')
})

/* eslint-disable */
test('sk', () => {
    const data = {
        city: 'Cudiad'
    }
    expect(sk.search(data, 'city')).toBe('Cudiad')
})
