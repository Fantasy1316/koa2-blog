/**
 * @description 数据模型入口文件
 * @author Alen
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

// 设置 Blog 的外键
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

// 设置 UserRelation 的外键
UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog,
  UserRelation
}