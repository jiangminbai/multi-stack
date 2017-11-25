const { User, Category } = require('../models');

/**
 * 根据用户名查找用户
 * @param  {string} nickname 用户名
 * @return {promise}         用户详情
 */
exports.findUserByName = function (nickname) {
  return User.findOne({
    where: {nickname}
  })
}

/**
 * 根据邮箱查找用户
 * @param  {string} email 用户邮箱
 * @return {promise}      用户详情
 */
exports.findUserByEmail = function (email) {
  return User.findOne({
    where: {email}
  })
}

/**
 * 根据用户名和邮箱查找用户
 * @param  {string} nickname 用户名
 * @param  {string} email    用户邮箱
 * @return {promise}         用户详情
 */
exports.findUserByNameOrEmail = function (nickname, email) {
  return User.findOne({
    where: {
      $or: [{nickname},{email}]
    }
  })
}

/**
 * 根据用户名和key查找用户
 * @param  {string} nickname 用户名
 * @param  {string} key      uuidv4
 * @return {promise}         用户详情
 */
exports.findUserByNameAndKey = function (nickname, key) {
  return User.findOne({
    where: {
      nickname,
      retrieve_key: key
    }
  })
}

/**
 * 创建用户
 * @param  {string} nickname 用户名
 * @param  {string} email    用户邮箱
 * @param  {string} password 被hash加密的password
 * @return {promise}         用户详情
 */
exports.createUser = function (nickname, email, password) {
  return User.create({
    nickname,
    email,
    password,
    categories: [{ name: 'default' }]
  },{
    include: [Category]
  })
}

/**
 * 通过email保存用户的key和time
 * @param {string} email 用户邮箱
 * @param {string} key   uuidv4
 * @param {number} time  毫秒数
 */
exports.setUserKeyAndTime = function (email, key, time) {
  return User.update(
    {retrieve_key: key, retrieve_time: time},
    {where: {email}}
  )
}

/**
 * 通过email设置user
 * @param {string} email 用户邮箱
 * @param {obj} opts  用户选项
 */
exports.setUserByEmail = function (email, opts) {
  return User.update(
    opts,
    {where: {email}}
  )
}

/**
 * 激活用户帐号
 * @param  {string} nickname 用户名
 * @return {promise}         用户详情
 */
exports.setUserActive = function (nickname) {
  return User.update(
    {active: true},
    {where: {nickname}}
  )
}

/**
 * 通过nickname设置user
 * @param {string} nickname 用户名
 * @param {obj} opts     用户选项
 */
exports.setUserByName = function (nickname, opts) {
  return User.update(
    opts,
    {where: {nickname}}
  )
}