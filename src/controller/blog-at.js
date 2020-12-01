/**
 * @description 微博 @ 关系 controller
 * @author Alen
 */

const { getAtRelationCount, getAtRelationBlog, updateAtRelation } = require('../services/at-relation')
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constant')

/**
 * 获取 @ 我的微博数量
 * @param {Number} userId 用户 Id
 */
async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId)

  return new SuccessModel({
    atCount: count
  })
}

/**
 * 获取 @ 我的博客数据
 * @param {Number} userId 用户 Id
 * @param {Number} pageIndex 页数
 * @param {Number} pageSize 每页条数
 */
async function getAtMeBlog({ userId, pageIndex = 0 }) {
  const result = await getAtRelationBlog({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  })

  const { count, blogList } = result
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}

/**
 * 标记为已读
 * @param {Number} userId 用户Id
 */
async function markAsRead(userId) {
  try {
    await updateAtRelation({ newIsRead: true }, { userId, isRead: false })
  } catch (error) {
    console.error(error.message, error.stack)
  }
}

module.exports = {
  getAtMeCount,
  getAtMeBlog,
  markAsRead
}