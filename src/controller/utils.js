/**
 * @description utils controller
 * @author Alen
 */

const path = require('path')
const fse = require('fs-extra')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const { MAX_SIZE } = require('../conf/constant')

// 文件存储目录
const TARGET_FILE_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 判断目录是否存在
fse.pathExists(TARGET_FILE_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(TARGET_FILE_PATH)
  }
})

/**
 * 保存文件
 * @param {String} name 文件名
 * @param {Number} size 文件大小
 * @param {String} type 文件类型
 * @param {String} filePath 文件路径
 */
async function saveFile({ name, size, type, filePath }) {
  // 图片过大
  if (size > MAX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  const fileName = `${Date.now()}_${name}`
  const targetFilePath = path.join(TARGET_FILE_PATH, fileName)
  await fse.move(filePath, targetFilePath)

  return new SuccessModel({
    url: `/${fileName}`
  })
}

module.exports = {
  saveFile
}