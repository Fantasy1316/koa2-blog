/**
 * @description user view 路由
 * @author Alen
*/

const router = require('koa-router')()

/**
 * 获取用户登录信息
 * @param {Object} ctx ctx
 */
function getLoginInfo(ctx) {
  let data = {
    isLogin: false //默认未登录
  }

  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }

  return data
}

// login 登陆
router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

// register 注册
router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

module.exports = router