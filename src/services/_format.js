/**
 * @description 数据格式化
 * @author Alen
 */

const { DEFAULT_PICTURE } = require('../conf/constant')

/**
 * 设置用户默认头像
 * @param {Object} obj 用户对象 
 */
function _formatUserPicture(obj) {
  if (obj.picture === null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 格式化用户信息
 * @param {Array | Object} list 
 */
function formatUser(list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    return list.map(_formatUserPicture)
  }

  return _formatUserPicture(list)
}

module.exports = {
  formatUser
}