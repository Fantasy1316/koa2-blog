/**
 * @description 数据模型入口文件
 * @author Alen
 */

const User = require('./User')
const Blog = require('./Blog')

// 设置 Blog 的外键
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}