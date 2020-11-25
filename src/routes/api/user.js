/**
 * @description user API 路由
 * @author Alen
 */

const router = require('koa-router')()
const { isExist, register, login, deleteCurUser, changeUserInfo } = require('../../controller/user')
const userVaildator = require('../../validator/user')
const { genVaildator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')

router.prefix('/api/user')

// 检测用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 注册路由
router.post('/register', genVaildator(userVaildator), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({
    userName,
    password,
    gender
  })
})

// 登录路由
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// 删除路由
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    // 在测试环境下，登录后可删除自己
    const { userName } = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName)
  }
})

// 修改信息路由
router.patch('/changeInfo', loginCheck, genVaildator(userVaildator), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body
  ctx.body = await changeUserInfo(ctx, { nickName, city, picture })
})

module.exports = router