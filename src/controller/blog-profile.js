/**
 * @description 个人主页 controller
 * @author Alen
 */

const { getBlogListByUser } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constant')

/**
 * 
 * @param {String} userName 用户名
 * @param {Number} pageIndex 查询页数
 */
async function getProfileBlogList(userName, pageIndex = 0) {
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE
  })

  const blogList = result.blogList

  return new SuccessModel({
    count: result.count,
    isEmpty: blogList.lenght === 0,
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE

  })
}

module.exports = {
  getProfileBlogList
}