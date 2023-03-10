const express = require('express')
const router = express.Router()
const UserModel = require('../../models/user')
const checkNotLogin = require('../../middlewares/check').checkNotLogin
const JWT = require('../../utils/JWT')
const { decrypt } = require('../../utils/crypto')

// GET /signin 登录页
router.get('/', checkNotLogin, function (req, res, next) {
  res.header('Content-Type', 'text/html;charset=utf-8')
  res.render('signin', { title: 'signin' })
})

// POST /signin 用户登录
router.post('/', checkNotLogin, async function (req, res, next) {
  const account = req.body.account
  const password = req.body.password

  // 校验参数
  try {
    if (!account) {
      throw new Error('请填写账号')
    }
    if (!password.length) {
      throw new Error('请填写密码')
    }
    const user = await UserModel.getUserByAccount(account)
    if (!user.length) {
      return res.status(401).json({ code: 401, message: '账号或密码错误' })
    }
    const userData = user[0]
    if (password !== decrypt(userData.password)) {
      return res.status(401).json({ code: 401, message: '账号或密码错误' })
    }
    // 生成加密token，并在响应头中返回给客户端
    const token = JWT.generate({ name: userData.name, account: userData.account }, '60s')
    const refreshToken = JWT.generate({ name: userData.name, account: userData.account }, '120s')
    res.set('authorization', token)
    res.set('refreshtoken', refreshToken)
    // 返回用户信息
    delete userData.password
    return res.json({ code: 200, message: '登录成功', data: userData })
  } catch (err) {
    return res.status(400).json({ code: 400, message: err.message })
  }
})

module.exports = router
