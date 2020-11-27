/**
 * @description 个人主页 单元测试
 * @author Alen
 */

const server = require('../server')
const { T_COOKIE, T_USERNAME } = require('../testUserInfo')

// 加载更多
test('个人主页，加载第一页数据，期望成功', async () => {
  const res = await server
    .get(`/api/profile/loadMore/${T_USERNAME}/0`)
    .set('cookie', T_COOKIE)
  expect(res.body.errno).toBe(0)

  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})