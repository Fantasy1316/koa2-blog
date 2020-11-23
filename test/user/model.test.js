/**
 * @description user model test
 * @author Alen
 */

const { User } = require('../../src/db/model/index')

test('User 模型各属性，符合预期', () => {
  // build 会构建一个内存的 user 实例，但不会提交到数据库
  const user = User.build({
    userName: 'zhangsan',
    password: "123456",
    nickName: '张三',
    // gender: 1,
    picture: 'xx/xx.png',
    city: '深圳'
  })

  // 验证属性
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('123456')
  expect(user.nickName).toBe('张三')
  expect(user.gender).toBe(3) // 测试性别默认值
  expect(user.picture).toBe('xx/xx.png')
  expect(user.city).toBe('深圳')
})