/**
 * @description 回复关系数据模型
 * @author Alen
 */

const seq = require('../seq')
const { INTEGAR, BOOLEAN } = require('../types')

const AtRelation = seq.define('atRelation', {
  userId: {
    type: INTEGAR,
    allowNull: false,
    comment: '用户 ID'
  },
  blogId: {
    type: INTEGAR,
    allowNull: false,
    comment: '博客 ID'
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否已读(默认未读)'
  }
})

module.exports = AtRelation