/**
 * @description 博客 view 路由
 * @author Alen
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans } = require('../../controller/user-relation')
const { isExist } = require('../../controller/user')

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
  // 已登录用户的信息
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  let curUserInfo
  const { userName: curUserName } = ctx.params
  const isMe = myUserName === curUserName
  if (isMe) {
    // 是当前登录用户
    curUserInfo = myUserInfo
  } else {
    // 不是当前登录用户
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) {
      // 用户名不存在
      return
    }
    // 用户名存在
    curUserInfo = existResult.data
  }

  // 第一页数据
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageIndex, pageSize, count } = result.data

  // 获取粉丝数据
  const fansResult = await getFans(curUserInfo.id)
  const { count: fansCount, fansList } = fansResult.data

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageIndex,
      pageSize,
      count
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: {
        count: fansCount,
        list: fansList
      }
    },
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