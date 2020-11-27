/**
 * @description 博客首页路由
 * @author Alen
 */

const router = require('koa-router')()
const { create, getHomeBlogList } = require('../../controller/blog-home')
const { genVaildator } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/blog')

// 创建博客路由
router.post('/create', loginCheck, genVaildator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({ userId, content, image })
})

// 加载更多
router.get(`/loadMore/:pageIndex`, loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const { id: userId } = ctx.session.userInfo

  const result = await getHomeBlogList(userId, pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router