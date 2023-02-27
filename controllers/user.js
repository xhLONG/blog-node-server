// 引用用户模版数据
const User = require('../models/user.js');

const userController = {
  // showUsers 获取用户数据并返回到页面
  showUsers: async function(req,res,next){
    try{
      let userData = await User.all()
      res.json({
        code: 200,
        message: "操作成功",
        data: userData
      })
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },

  // createUser 创建用户
  createUser: async function (req, res, next) {
    const { name, password, phone } = req.body;
    console.log('query', req.query)
    console.log('body', req.body)
    console.log('params', req.params)
    try{
      await User.insert({name, phone})
      res.json({
        code: 200,
        message: "操作成功",
      })
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },

  // 删除用户
  deleteUser: async function (req, res, next) {
    const { id } = req.query;
    console.log('query', req.query)
    try{
      await User.delete(id)
      res.json({
        code: 200,
        message: "操作成功",
      })
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },

  // 修改用户
  updateUser: async function (req, res, next) {
    const { id, name, password, phone } = req.body;
    try{
      await User.update(id, {name, phone})
      res.json({
        code: 200,
        message: "操作成功",
      })
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },
}

module.exports = userController;