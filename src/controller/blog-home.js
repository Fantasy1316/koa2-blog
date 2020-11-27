/**
 * @description 博客首页 controller
 * @author Alen
 */

const xss = require('xss')
const { createBlog, getFollowerBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../conf/constant')

/**
 * 创建微博
 * @param {Object} param0 创建微博所需数据 { userId, content, image }
 */
async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })
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
  const result = await getFollowerBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
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

