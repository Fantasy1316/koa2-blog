/**
 * @description 博客 view 路由
 * @author Alen
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  // 第一页数据
  const userInfo = ctx.session.userInfo
  const { userName: curUserName } = ctx.session.userInfo
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageIndex, pageSize, count } = result.data

  await ctx.render('profile', {
    userData: {
      userInfo
    },
    blogData: {
      isEmpty,
      blogList,
      pageIndex,
      pageSize,
      count
    }
  })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
  // 获取微博数据，第一页
  const result = await getSquareBlogList(0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
})

module.exports = router