/**
 * @description 用户关系 controller
 * @author Alen
 */

const { SuccessModel } = require('../model/ResModel')
const { getUsersByFollower } = require('../services/user-relation')

/**
 * 根据 userId 获取用户粉丝
 * @param {Number} userId 用户Id
 */
async function getFans(userId) {
  const { count, userList } = await getUsersByFollower(userId)
  return new SuccessModel({
    count,
    fansList: userList
  })
}

module.exports = {
  getFans
}