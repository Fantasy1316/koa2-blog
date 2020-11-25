/**
 * @description blog 数据模型
 * @author Alen
 */

const seq = require('../seq')
const { INTEGAR, STRING, TEXT } = require('../types')

const Blog = seq.define('blog', {
  userId: {
    type: INTEGAR,
    allowNull: false,
    comment: '用户 ID'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '图片地址'
  }
})

module.exports = Blog