/**
 * @description 用户关系 controller
 * @author Alen
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUsersByFollower, addFollow, deleteFollower } = require('../services/user-relation')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')

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

/**
 * 关注
 * @param {Number} myUserId 当前登录用户id
 * @param {Number} curUserId 要被关注的用户id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollow(myUserId, curUserId)
    return new SuccessModel()
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * 取消关注
 * @param {Number} myUserId 当前登录用户id
 * @param {Number} curUserId 要被取消关注的用户id
 */
async function unFollow(myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}


module.exports = {
  getFans,
  follow,
  unFollow
}