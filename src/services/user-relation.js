/**
 * @description 用户关系 service
 * @author Alen
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取关注该用户的用户列表
 * @param {Number} followerId 被关注人的userId
 */
async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
        }
      }
    ]
  })

  // 数据格式话
  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)

  return {
    count: result.count,
    userList
  }
}

/**
 * 获取该用户的关注列表
 * @param {Number} userId 用户 id
 */
async function getFollowersByUser(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture']
      }
    ],
    where: {
      userId
    }
  })

  let userList = result.rows.map(row => row.dataValues)
  userList = userList.map(item => {
    let user = item.user.dataValues
    user = formatUser(user)
    return user
  })

  return {
    count: result.count,
    userList
  }
}

/**
 * 添加关注
 * @param {Number} userId 用户 id
 * @param {Number} followerId 被关注用户 id
 */
async function addFollow(userId, followerId) {
  const result = UserRelation.create({
    userId,
    followerId
  })

  return result.dataValues
}

/**
 * 删除关注
 * @param {Number} userId 用户 id
 * @param {Number} followerId 被关注用户 id
 */
async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })

  return result > 0
}

module.exports = {
  getUsersByFollower,
  getFollowersByUser,
  addFollow,
  deleteFollower
}