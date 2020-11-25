/**
 * @description blog model test
 * @author Alen
 */

const { Blog } = require('../../src/db/model/index')

test('Blog 模型各属性，符合预期', () => {
  // build 会构建一个内存的 blog 实例，但不会提交到数据库
  const blog = Blog.build({
    userId: 1,
    content: '博客测试内容',
    image: "/test.png",
  })

  // 验证属性
  expect(blog.userId).toBe(1)
  expect(blog.content).toBe('博客测试内容')
  expect(blog.image).toBe('/test.png')
})