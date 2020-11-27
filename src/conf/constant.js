/**
 * @description 常量集合
 * @author Alen
 */

module.exports = {
  DEFAULT_PICTURE: 'http://img.fechen.cn/uploadfile/avatar.png',
  MAX_SIZE: 1024 * 1024 * 1024,
  PAGE_SIZE: 5,

  // 正则表达式，匹配 '@昵称 - userName'
  REG_FOR_AT_WHO: /@(.+?)\s-\s(\w+?)\b/g
}