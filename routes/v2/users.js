const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user')

/**
 * 获取用户信息
 */
router.get('/', userController.showUsers)

/**
 * 增加用户
 */
router.post('/create', userController.createUser)

/**
 * 删除用户
 */
router.delete('/delete', userController.deleteUser)

/**
 * 修改用户信息
 */
router.post('/edit', userController.updateUser)

module.exports = router
