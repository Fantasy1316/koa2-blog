/**
 * @description user API 路由
 * @author Alen
 */

const router = require('koa-router')()
const { isExist, register, login } = require('../../controller/user')
const userVaildator = require('../../validator/user')
const { genVaildator } = require('../../middlewares/validator')

router.prefix('/api/user')

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

// 检测用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router