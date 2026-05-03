import request from './request'

// 获取菜单树
export function getMenuTree() {
  return request({
    url: '/system/menu/tree',
    method: 'get'
  })
}

// 获取所有菜单列表
export function getMenuList() {
  return request({
    url: '/system/menu/list',
    method: 'get'
  })
}

// 根据ID获取菜单
export function getMenuById(id) {
  return request({
    url: `/system/menu/${id}`,
    method: 'get'
  })
}

// 创建菜单
export function createMenu(data) {
  return request({
    url: '/system/menu',
    method: 'post',
    data
  })
}

// 更新菜单
export function updateMenu(data) {
  return request({
    url: '/system/menu',
    method: 'put',
    data
  })
}

// 删除菜单
export function deleteMenu(id) {
  return request({
    url: `/system/menu/${id}`,
    method: 'delete'
  })
}

// 获取当前用户权限
export function getCurrentUserPerms() {
  return request({
    url: '/system/menu/perms',
    method: 'get'
  })
}

// 根据角色ID获取菜单
export function getMenuByRoleId(roleId) {
  return request({
    url: `/system/menu/role/${roleId}`,
    method: 'get'
  })
}

// 根据用户ID获取菜单
export function getUserMenus(userId) {
  return request({
    url: `/system/menu/user/${userId}`,
    method: 'get'
  })
}
