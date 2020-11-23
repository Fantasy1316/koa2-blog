/**
 * @description Sequelize 同步数据库
 * @author Alen
*/

const seq = require('./seq')

require('./model/index')

// 链接测试
seq.authenticate().then(() => {
  console.log('Test Ok')
}).catch(err => {
  console.log('Test Error')
})

// 执行同步
seq.sync({ force: true }).then(() => {
  console.log('Sync Success')
  process.exit()
})