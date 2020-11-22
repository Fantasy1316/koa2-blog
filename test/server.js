/**
 * @description jest request
 * @author Alen
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)