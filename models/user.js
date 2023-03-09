const Base = require('./base')
const knex = require('../models/knex')

class User extends Base {
  // 定义参数默认值为 user 表
  constructor (props = 'user') {
    super(props)
  }

  getUserByAccount (account) {
    return knex(this.table).where('account', '=', account)
  }
}

module.exports = new User()
