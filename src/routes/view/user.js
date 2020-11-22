/**
 * @description user view 路由
 * @author Alen
*/

const router = require('koa-router')()

// login 登陆
router.get('/login', async (ctx, next) => {
  await ctx.render('login', {})
})

// register 注册
router.get('/register', async (ctx, next) => {
  await ctx.render('register', {})
})

module.exports = router