import request from './request'

// 用户登录
export function login(data) {
  return request({
    url: '/system/auth/login',
    method: 'post',
    data
  })
}

// 用户登出
export function logout() {
  return request({
    url: '/system/auth/logout',
    method: 'post'
  })
}

// 获取当前用户信息
export function getCurrentUser() {
  return request({
    url: '/system/auth/current',
    method: 'get'
  })
}