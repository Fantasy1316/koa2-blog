/**
 * @description atRelation 关系模型
 * @author Alen
 */

const { Blog, User, AtRelation } = require('../db/model/index')
const { formatBlog, formatUser } = require('./_format')

/**
 * 创建 @ 关系
 * @param {Number} blogId 微博 Id
 * @param {Number} userId 用户 Id
 */
async function createAtRelation(blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId
  })

  return result.dataValues
}

/**
 * 获取 @ 用户的微博数量
 * @param {Number} userId 用户 Id
 */
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })

  return result.count
}

/**
 * 获取 @ 到我的博客
 * @param {Number} userId 用户 Id
 */
async function getAtRelationBlog({ userId, pageIndex, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: {
          userId
        }
      },
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })

  // 格式化
  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

/**
 * 更新 AtRelation
 * @param {Object} param0 更新内容
 * @param {Object} param1 查询条件 
 */
async function updateAtRelation(
  { newIsRead },
  { userId, isRead }
) {
  // 拼接更新内容
  let updateData = {}
  if (newIsRead) {
    updateData.isRead = newIsRead
  }
  // 拼接查询条件
  let whereData = {}
  if (userId) {
    whereData.userId = userId
  }
  if (isRead) {
    whereData.isRead = isRead
  }
  // 执行
  const result = await AtRelation.update(updateData, {
    where: whereData
  })
  return result[0] > 0
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtRelationBlog,
  updateAtRelation
}