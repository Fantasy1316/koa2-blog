/**
 * @description user service
 * @author Alen
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 
 * @param {String} userName 用户名
 * @param {String} password 密码 
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }

  if (password) {
    Object.assign(whereOpt, { password })
  }

  // 查询数据库
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'gender', 'city'],
    where: whereOpt
  })

  // 未找到
  if (result == null) {
    return result
  }

  const formatRes = formatUser(result.dataValues)
  return formatRes
}

/**
 * 
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {String} gender 性别
 * @param {String} nickName 昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender
  })
  return result
}

/**
 * 删除用户
 * @param {String} userName 用户名
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })

  // result 删除的行数
  return result > 0
}

/**
 * 更新用户信息
 * @param {Object} param0 { newNickName, newCity, newPicture }
 * @param {Object} param1 { userName, password }
 */
async function updateUser(
  { newNickName, newCity, newPicture, newPassword },
  { userName, password }
) {
  // 更新内容
  let updateDate = {}
  if (newNickName) {
    updateDate.nickName = newNickName
  }
  if (newCity) {
    updateDate.city = newCity
  }
  if (newPicture) {
    updateDate.picture = newPicture
  }
  if (newPassword) {
    updateDate.password = newPassword
  }

  // 查询条件
  let whereOpt = {
    userName
  }
  if (password) {
    whereOpt.password = password
  }

  // 执行
  const result = await User.update(updateDate, {
    where: whereOpt
  })
  return result[0] > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
}