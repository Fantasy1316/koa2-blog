/**
 * @description 博客首页 controller
 * @author Alen
 */

const xss = require('xss')
const { createBlog, getFollowerBlogList } = require('../services/blog')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/at-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant')

/**
 * 创建微博
 * @param {Object} param0 创建微博所需数据 { userId, content, image }
 */
async function create({ userId, content, image }) {
  // 收集 content 中的 @ 用户的信息
  let atUserNameList = []
  content = content.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      atUserNameList.push(userName)
      return matchStr
    }
  )

  // 通过 userName 查找用户信息
  const atUserList = await Promise.all(
    atUserNameList.map(userName => getUserInfo(userName))
  )

  // 过滤出用户 id
  const atUserIdList = atUserList.map(user => user.id)

  try {
    // 创建微博
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })

    // 创建 atRelation 的 @ 关系
    await Promise.all(atUserIdList.map(userId => {
      createAtRelation(blog.id, userId)
    }))

    return new SuccessModel(blog)
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 获取首页博客数据
 * @param {Number} userId 用户 Id
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowerBlogList({ userId, pageIndex })
  const { count, blogList } = result

  // 返回
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}

module.exports = {
  create,
  getHomeBlogList
}

