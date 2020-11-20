/**
 * @description 存储配置
 * @author Alen
*/

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'mysql@123456',
  database: 'koa2_blog_db'
}

// 线上环境配置
if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }

  MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'mysql@123456',
    database: 'koa2_blog_db'
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}

