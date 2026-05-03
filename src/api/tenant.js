import request from './request'

// 分页查询租户
export function getTenantPage(params) {
  return request({
    url: '/system/tenant/page',
    method: 'get',
    params
  })
}

// 根据ID获取租户
export function getTenantById(id) {
  return request({
    url: `/system/tenant/${id}`,
    method: 'get'
  })
}

// 创建租户
export function createTenant(data) {
  return request({
    url: '/system/tenant',
    method: 'post',
    data
  })
}

// 更新租户
export function updateTenant(data) {
  return request({
    url: '/system/tenant',
    method: 'put',
    data
  })
}

// 删除租户
export function deleteTenant(id) {
  return request({
    url: `/system/tenant/${id}`,
    method: 'delete'
  })
}