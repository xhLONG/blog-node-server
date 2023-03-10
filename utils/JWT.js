const jwt = require('jsonwebtoken')

const secret = 'xhlongABCD123'

const JWT = {
  generate: function (data, expires) {
    return jwt.sign({ data }, secret, { expiresIn: expires })
  },
  verify: function (token) {
    try {
      return jwt.verify(token, secret)
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

module.exports = JWT
