import request from './request'

/**
 * 分页查询角色
 * @param {Object} params - 查询参数
 * @param {number} params.pageNum - 页码
 * @param {number} params.pageSize - 每页数量
 * @param {string} params.roleName - 角色名称（可选）
 * @returns {Promise} 角色分页数据
 */
export function getRolePage(params) {
  return request({
    url: '/role/page',
    method: 'get',
    params
  })
}

/**
 * 根据ID获取角色
 * @param {number} id - 角色ID
 * @returns {Promise} 角色详情
 */
export function getRoleById(id) {
  return request({
    url: `/role/${id}`,
    method: 'get'
  })
}

/**
 * 创建角色
 * @param {Object} data - 角色数据
 * @param {string} data.roleCode - 角色编码
 * @param {string} data.roleName - 角色名称
 * @param {string} [data.description] - 角色描述
 * @param {number} [data.status=1] - 状态: 0-禁用, 1-启用
 * @returns {Promise} 新角色ID
 */
export function createRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

/**
 * 更新角色
 * @param {Object} data - 角色数据
 * @param {number} data.id - 角色ID
 * @param {string} data.roleName - 角色名称
 * @param {string} [data.description] - 角色描述
 * @param {number} [data.status] - 状态: 0-禁用, 1-启用
 * @returns {Promise} 更新结果
 */
export function updateRole(data) {
  return request({
    url: '/role',
    method: 'put',
    data
  })
}

/**
 * 删除角色
 * @param {number} id - 角色ID
 * @returns {Promise} 删除结果
 */
export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}