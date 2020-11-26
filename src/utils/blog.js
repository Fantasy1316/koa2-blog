/**
 * @description 微博数据相关的攻击方法
 * @author Alen
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 获取 blog-list.ejs 的文件内容
const BLOG_LIST_TPL = fs.readFileSync(
  path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()

/**
 * 根据 bloglist 渲染模版数据
 * @param {Array} blogList 博客数据
 * @param {Boolean} canReply 是否可回复
 */
function getBlogListStr(blogList = [], canReply = false) {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  })
}

module.exports = {
  getBlogListStr
}