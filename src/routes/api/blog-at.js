/**
 * @description @ 我的微博
 * @author Alen
 */

const router = require('koa-router')()
const { getAtMeBlog } = require('../../controller/blog-at')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/atMe')

// @我的微博 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  // 获取请求及查询参数
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex) // 转换为Number
  const { id: userId } = ctx.session.userInfo

  // 获取查询结果并处理为模版字符串
  const result = await getAtMeBlog({ userId, pageIndex })
  console.log('@Me', result)

  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router