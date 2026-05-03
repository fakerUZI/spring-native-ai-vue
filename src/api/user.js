import request from './request'

// 分页查询用户
export function getUserPage(params) {
  return request({
    url: '/system/user/page',
    method: 'get',
    params
  })
}

// 获取用户详情
export function getUserById(id) {
  return request({
    url: `/system/user/${id}`,
    method: 'get'
  })
}

// 创建用户
export function createUser(data) {
  return request({
    url: '/system/user',
    method: 'post',
    data
  })
}

// 更新用户
export function updateUser(data) {
  return request({
    url: '/system/user',
    method: 'put',
    data
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: `/system/user/${id}`,
    method: 'delete'
  })
}

// 重置密码
export function resetPassword(id) {
  return request({
    url: `/system/user/${id}/reset-password`,
    method: 'put'
  })
}

// 更新用户状态
export function updateUserStatus(id, status) {
  return request({
    url: `/system/user/${id}/status`,
    method: 'put',
    params: { status }
  })
}

// 获取用户已分配的角色详情
export function getUserRoles(userId) {
  return request({
    url: `/system/user/${userId}/roles`,
    method: 'get'
  })
}

// 获取用户已分配的角色ID列表
export function getUserRoleIds(userId) {
  return request({
    url: `/system/user/${userId}/roleIds`,
    method: 'get'
  })
}

// 获取用户的权限标识
export function getUserPerms(userId) {
  return request({
    url: `/system/user/${userId}/perms`,
    method: 'get'
  })
}

// 获取用户的菜单权限
export function getUserMenuPerms(userId) {
  return request({
    url: `/system/user/${userId}/menus`,
    method: 'get'
  })
}

// 为用户分配角色
export function assignUserRoles(userId, roleIds) {
  return request({
    url: `/system/user/${userId}/roles`,
    method: 'put',
    data: roleIds
  })
}