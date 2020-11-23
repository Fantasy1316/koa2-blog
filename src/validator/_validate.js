/**
 * @description json scheam 校验
 * @author Alen
 */

const Ajv = require('ajv')
const ajv = new Ajv({
  // allErrors: true // 输出所有错误
})

/**
 * 
 * @param {Object} scheam json scheam 规则
 * @param {*} data 待校验数据
 */
function validate(scheam, data = {}) {
  const valid = ajv.validate(scheam, data)
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate