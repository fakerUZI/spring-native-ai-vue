import request from './request'

// 分页查询角色
export function getRolePage(params) {
  return request({
    url: '/system/role/page',
    method: 'get',
    params
  })
}

// 根据ID获取角色
export function getRoleById(id) {
  return request({
    url: `/system/role/${id}`,
    method: 'get'
  })
}

// 创建角色
export function createRole(data) {
  return request({
    url: '/system/role',
    method: 'post',
    data
  })
}

// 更新角色
export function updateRole(data) {
  return request({
    url: '/system/role',
    method: 'put',
    data
  })
}

// 删除角色
export function deleteRole(id) {
  return request({
    url: `/system/role/${id}`,
    method: 'delete'
  })
}

// 获取角色已分配的菜单
export function getRoleMenus(roleId) {
  return request({
    url: `/system/role/${roleId}/menus`,
    method: 'get'
  })
}

// 为角色分配菜单
export function assignRoleMenus(roleId, menuIds) {
  return request({
    url: `/system/role/${roleId}/menus`,
    method: 'put',
    data: menuIds
  })
}