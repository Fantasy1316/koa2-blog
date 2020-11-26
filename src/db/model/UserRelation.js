/**
 * @description 用户关系数据模型
 * @author Alen
 */

const seq = require('../seq')
const { INTEGAR } = require('../types')

const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGAR,
    allowNull: false,
    comment: '用户 ID'
  },
  followerId: {
    type: INTEGAR,
    allowNull: false,
    comment: '被关注用户 ID'
  }
})

module.exports = UserRelation