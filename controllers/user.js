// 引用用户模版数据
const User = require('../models/user.js')

const userController = {
  // showUsers 获取用户数据并返回到页面
  showUsers: async function (req, res, next) {
    try {
      const userData = await User.all()
      res.json({
        code: 200,
        message: '操作成功',
        data: userData
      })
    } catch (err) {
      res.json({ code: 0, message: err.message })
    }
  },

  // createUser 创建用户
  createUser: async function (req, res, next) {
    const { name, phone } = req.body
    console.log('query', req.query)
    console.log('body', req.body)
    console.log('params', req.params)
    try {
      await User.insert({ name, phone })
      res.json({
        code: 200,
        message: '操作成功'
      })
    } catch (err) {
      res.json({ code: 0, message: err.message })
    }
  },

  // 删除用户
  deleteUser: async function (req, res, next) {
    const { id } = req.query
    console.log('query', req.query)
    try {
      await User.delete(id)
      res.json({
        code: 200,
        message: '操作成功'
      })
    } catch (err) {
      res.json({ code: 0, message: err.message })
    }
  },

  // 修改用户
  updateUser: async function (req, res, next) {
    const { id, name, phone } = req.body
    try {
      await User.update(id, { name, phone })
      res.json({
        code: 200,
        message: '操作成功'
      })
    } catch (err) {
      res.json({ code: 0, message: err.message })
    }
  }
}

module.exports = userController
