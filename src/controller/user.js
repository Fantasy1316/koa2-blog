/**
 * @description user controller
 * @author Alen
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameIsNotExist } = require('../model/ErrorInfo')

/**
 * 检测用户是否存在
 * @param {String} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameIsNotExist)
  }
}

module.exports = {
  isExist
}