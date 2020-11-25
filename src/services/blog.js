/**
 * @description blog services
 * @author Alen
 */

const { Blog } = require('../db/model/index')

/**
 * 创建博客
 * @param {Object} param0 创建博客所需数据 { userId, content, image }
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

module.exports = {
  createBlog
}