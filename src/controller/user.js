/**
 * @description user controller
 * @author Alen
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameIsNotExist,
  registerUserNameExistInfo,
  registerFailInfo
} = require('../model/ErrorInfo')
const { doCrypto } = require('../utils/cryp')

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

/**
 * 
 * @param {String} userName 用户名 
 * @param {String} password 密码 
 * @param {String} gender 性别（0 男，1 女， 3 保密） 
 */
async function register({ userName, password, gender = 3 }) {
  const userInfo = await getUserInfo(userName)
  // 检测用户是否已存在
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo)
  }

  // 注册逻辑
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(registerFailInfo)
  }
}

module.exports = {
  isExist,
  register
}