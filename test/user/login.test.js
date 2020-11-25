const server = require('../server')

// 定义用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

// 保存cookie
let COOKIE = ''

// 注册
test('注册用户，期望成功', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).toBe(0)
})

// 重复注册
test('重复注册同一用户，期望失败', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).not.toBe(0)
})

// 查询用户是否存在
test('查询用户是否存在，期望存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).toBe(0)
})

// json scheam 检验
test('json scheam 检测，非法格式，期望注册失败', async () => {
  const res = await server
    .post('/api/user/register')
    .send({
      userName: '123',
      password: 'a',
      gender: 'mail'
    })
  expect(res.body.errno).not.toBe(0)
})

// 登录
test('用户登录，期望成功', async () => {
  const res = await server
    .post('/api/user/login')
    .send({
      userName,
      password
    })
  expect(res.body.errno).toBe(0)

  COOKIE = res.header['set-cookie'].join(';')
})

// 修改信息
test('修改信息，期望成功', async () => {
  const res = await server
    .patch('/api/user/changeInfo')
    .send({
      nickName: '测试用户',
      city: '测试地址',
      picture: '/test.png'
    }).set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 修改密码
test('修改密码， 期望成功', async () => {
  const res = await server
    .patch('/api/user/changePassword')
    .send({ password, newPassword: `p_${Date.now()}` })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 删除用户
test('删除用户，期望成功', async () => {
  const res = await server
    .post('/api/user/delete')
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 退出登录
test('退出登录，期望成功', async () => {
  const res = await server
    .post('/api/user/logout')
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 再次检测用户，应该不存在
test('再次查询用户是否存在，期望不存在', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName })
  expect(res.body.errno).not.toBe(0)
})