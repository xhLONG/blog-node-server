const express = require('express')
const router = express.Router()
const JWT = require('../../utils/JWT')

router.get('/', function (req, res, next) {
  const token = req.headers.refreshtoken?.split(' ')[1]
  const payload = JWT.verify(token)
  if (!payload) {
    return res.status(401).json({ code: 401, message: '登录过期' })
  }
  try {
    // 重新生成token和refreshToken返回给客户端
    const newToken = JWT.generate(payload.data, '60s')
    const refreshToken = JWT.generate(payload.data, '120s')
    res.set('authorization', newToken)
    res.set('refreshtoken', refreshToken)
    res.json({ code: 200, message: '操作成功', data: payload.data })
  } catch (err) {
    return res.status(401).json({ code: 401, message: err.message })
  }
})

module.exports = router
