/**
 * @description json scheam 校验中间件
 * @author Alen
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * 生产 json scheam 校验的中间件
 * @param {Function} validatorFn 校验函数
 */
function genVaildator(validatorFn) {
  // 定义中间件函数
  async function validator(ctx, next) {
    // 校验
    const data = ctx.request.body
    const error = validatorFn(data)
    if (error) {
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }

    //验证成功，继续执行
    await next()
  }
  // 返回中间件函数
  return validator
}

module.exports = {
  genVaildator
}