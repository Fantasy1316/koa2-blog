/**
 * @description 数据模型入口文件
 * @author Alen
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')
const AtRelation = require('./AtRelation')

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

// 设置 Blog 与 userRealtion 的关联关系
Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId'
})

// 设置 Blog 与 AtRelation 的关系
Blog.hasMany(AtRelation, {
  foreignKey: 'blogId'
})

module.exports = {
  User,
  Blog,
  UserRelation,
  AtRelation
}