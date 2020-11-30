/**
 * @description atRelation 关系模型
 * @author Alen
 */

const { AtRelation } = require('../db/model/index')

/**
 * 
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

module.exports = {
  createAtRelation
}