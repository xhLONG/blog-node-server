const JWT = require('../utils/JWT')

module.exports = {
  // 已登录才会继续往下执行
  checkLogin: function checkLogin (req, res, next) {
    // 前端传过来的authorization格式应该是 ‘Bearer 内容’
    const token = req.headers.authorization?.split(' ')[1]
    const payload = JWT.verify(token)
    if (!payload) {
      return res.status(403).json({ code: 403, message: '登录过期' })
    }
    next()
  },

  // 未登录才会继续往下执行
  checkNotLogin: function checkNotLogin (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]
    const payload = JWT.verify(token)
    if (payload) {
      return res.redirect('back')// 返回之前的页面
    }
    next()
  }
}
