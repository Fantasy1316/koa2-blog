/**
 * @description 首页 test
 * @author Alen
 */

const server = require('../server')
const { T_COOKIE } = require('../testUserInfo')

// 定义测试内容
const content = '测试博客内容'
const image = '/test.png'

// 创建博客
test('创建博客，期望成功', async () => {
  const res = await server
    .post('/api/blog/create')
    .send({
      content,
      image
    }).set('cookie', T_COOKIE)
  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)
})