/**
 * @description 用户关系 单元测试
 * @author Alen
 */

const server = require('../server')
const { getFans, getFollowers } = require('../../src/controller/user-relation')
const {
  T_ID,
  T_USERNAME,
  T_COOKIE,
  J_ID,
  J_USERNAME
} = require('../testUserInfo')

// 先让张三取消关注李四（为了避免现在张三关注了李四）
test('无论如何，先取消关注', async () => {
  const res = await server
    .post('/api/profile/unFollow')
    .send({ userId: J_ID })
    .set('cookie', T_COOKIE)
  expect(1).toBe(1)
})

// 添加关注
test('张三关注李四，应该成功', async () => {
  const res = await server
    .post('/api/profile/follow')
    .send({ userId: J_ID })
    .set('cookie', T_COOKIE)
  expect(res.body.errno).toBe(0)
})

// 获取粉丝
test('获取李四的粉丝，应该有张三', async () => {
  const result = await getFans(J_ID)
  const { count, fansList } = result.data
  const hasUserName = fansList.some(fanInfo => {
    return fanInfo.userName === T_USERNAME
  })
  expect(count > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

// 获取关注人
test('获取张三的关注人，应该有李四', async () => {
  const result = await getFollowers(T_ID)
  const { count, followersList } = result.data
  const hasUserName = followersList.some(followerInfo => {
    return followerInfo.userName === J_USERNAME
  })
  expect(count > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

// 取消关注
test('张三取消关注李四，应该成功', async () => {
  const res = await server
    .post('/api/profile/unFollow')
    .send({ userId: J_ID })
    .set('cookie', T_COOKIE)
  expect(res.body.errno).toBe(0)
})
