import request from './request'

/**
 * 用户登录
 * @param {Object} data - 登录参数
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise} 登录响应 { code, message, data: { token, userId, username, realName, avatar } }
 */
export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

/**
 * 获取当前登录用户信息
 * @returns {Promise} 用户信息 { code, message, data: { token, userId, username, realName, avatar } }
 */
export function getCurrentUser() {
  return request({
    url: '/auth/current',
    method: 'get'
  })
}

/**
 * 用户退出登录
 * @returns {Promise} 退出结果 { code, message }
 */
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}