import request from './request'

// 获取图形验证码
export function getCaptcha() {
  return request({
    url: '/system/captcha/image',
    method: 'get'
  })
}