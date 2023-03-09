const fse = require('fs-extra')
const express = require('express')
const router = express.Router()
const upload = require('../../middlewares/upload')
const UserModel = require('../../models/user')
const checkNotLogin = require('../../middlewares/check').checkNotLogin
const { encrypt } = require('../../utils/crypto')

// GET /signup 注册页
router.get('/', checkNotLogin, function (req, res, next) {
  res.header('Content-Type', 'text/html;charset=utf-8')
  res.render('signup', { title: 'signup' })
})

// POST /signup 用户注册
router.post('/', [checkNotLogin, upload.single('avatar')], async function (req, res, next) {
  const { name, gender = 'x', introduction, account, password, repassword } = req.body
  console.log(req.file)
  const avatar = req.file?.path

  console.log({
    name,
    gender,
    introduction,
    avatar,
    account,
    password,
    repassword
  })

  // 校验参数
  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      throw new Error('名字请限制在 1-10 个字符')
    }
    if (account.length < 6) {
      throw new Error('账号至少 6 个字符')
    }
    if (password.length < 6) {
      throw new Error('密码至少 6 个字符')
    }
    if (password !== repassword) {
      throw new Error('两次输入密码不一致')
    }
    if (['boy', 'girl', 'x'].indexOf(gender) === -1) {
      throw new Error('性别只能是 boy、girl 或 x')
    }
    if (introduction.length > 30) {
      throw new Error('个人简介请限制在 1-30 个字符')
    }
  } catch (e) {
    // 注册失败，异步删除上传的头像
    fse.remove(avatar)
    return res.status(401).json({ code: 401, message: '操作失败', data: e })
  }

  // 待写入数据库的用户信息
  const userInfo = {
    name,
    gender,
    introduction,
    avatar,
    account,
    password: encrypt(password)
  }
  try {
    const user = await UserModel.getUserByAccount(account)
    if (user.length) {
      return res.status(401).json({ code: 401, message: '该账号已经注册' })
    }
    await UserModel.insert(userInfo)
    res.json({
      code: 200,
      message: '操作成功',
      data: userInfo
    })
  } catch (e) {
    // 注册失败，异步删除上传的头像
    fse.remove(avatar)
    // 用户名被占用
    if (e.message.match('duplicate key')) {
      return res.status(401).json({ code: 401, message: '该账号已经注册', data: e })
    }
    res.status(401).json({ code: 0, message: '操作失败', data: e })
  }
})

module.exports = router
