/**
 * @description 博客 view 路由
 * @author Alen
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getFans, getFollowers } = require('../../controller/user-relation')
const { getAtMeCount, getAtMeBlog, markAsRead } = require('../../controller/blog-at')
const { isExist } = require('../../controller/user')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { id: userId } = userInfo

  // 获取第一页数据
  const result = await getHomeBlogList(userId)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  // 获取粉丝
  const fansResult = await getFans(userId)
  const { count: fansCount, fansList } = fansResult.data

  // 获取关注人列表
  const followersResult = await getFollowers(userId)
  const { count: followersCount, followersList } = followersResult.data

  // 获取 @ 数量
  const atCountResult = await getAtMeCount(userId)
  const { atCount } = atCountResult.data

  await ctx.render('index', {
    userData: {
      userInfo,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      },
      atCount
    },
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
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

  // 获取粉丝列表
  const followersRsult = await getFollowers(curUserInfo.id)
  const { count: followersCount, followersList } = followersRsult.data

  // 我是否关注了此人
  const amIFollowed = fansList.some(item => {
    return item.userName = myUserName
  })

  // 获取 @ 数量
  const atCountResult = await getAtMeCount(myUserInfo.id)
  const { atCount } = atCountResult.data

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
      amIFollowed,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      },
      atCount
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

// @ 我的微博
router.get('/at-me', loginRedirect, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo

  // 获取 @ 微博数量
  // 获取 @ 微博信息
  const atMeResult = await getAtMeBlog({ userId })
  const { isEmpty, blogList, pageSize, pageIndex, count } = atMeResult.data

  const atCountRes = await getAtMeCount(userId)
  const { atCount } = atCountRes.data

  await ctx.render('atMe', {
    isEmpty,
    blogData: {
      count,
      blogList,
      pageSize,
      pageIndex
    },
    atCount
  })

  // 标记为已读
  if (atCount > 0) {
    await markAsRead(userId)
  }
})

module.exports = router