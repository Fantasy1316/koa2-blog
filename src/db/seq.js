/**
 * @description Mysql 配置
 * @author Alen
*/


const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const conf = {
  host,
  dialect: 'mysql'
}

if (isTest) {
  conf.logging = () => { }
}

if (isProd) {
  conf.pool = {
    max: 5, // 连接池最大连接数
    min: 0, // 连接池最小连接数
    idle: 10000 // 如果一个连接池 10s 之内没有被使用，则释放
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq