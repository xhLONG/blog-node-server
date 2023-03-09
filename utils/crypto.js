/**
 * 一种对称加密算法
 */

const crypto = require('crypto')

// 加密解密时，使用的 key 和 iv 必须同一个
const config = {
  key: 'xhlongABCD123456', // 16位
  iv: 'abcdefghij123456' // 16位
}

/**
 * @description: 密码加密 （可以解密）
 * @param {string} data 加密前的密码
 * @return {string} 加密后的密码
 */
function encrypt (data, key, iv) {
  key = key || config.key
  iv = iv || config.iv
  const dep = crypto.createCipheriv('aes-128-cbc', key, iv)
  return dep.update(data, 'binary', 'hex') + dep.final('hex')
}

/**
 * @description: 密码解密
 * @param {string} crypted 经过encrypt方法加密的密码
 * @return {*} 明文密码
 */
function decrypt (crypted, key, iv) {
  key = key || config.key
  iv = iv || config.iv
  crypted = Buffer.from(crypted, 'hex').toString('binary')
  const dep = crypto.createDecipheriv('aes-128-cbc', key, iv)
  return dep.update(crypted, 'binary', 'utf8') + dep.final('utf8')
}

// const data = 'lilyjucijack'
// const crypted = encrypt(data)
// console.log('加密-', crypted) // 加密- 59a4698f2c58e6665953c917e179f0df
// const decrypted = decrypt(crypted)
// console.log('解密-', decrypted) // 解密- lilyjucijack

module.exports = {
  encrypt,
  decrypt
}
