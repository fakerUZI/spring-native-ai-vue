import request from './request'

// 获取上传凭证
export function getUploadToken(fileKey) {
  return request({
    url: '/system/file/token',
    method: 'get',
    params: { fileKey }
  })
}

// 上传文件到七牛云
export function uploadFile(file, token) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('token', token)
  
  return request({
    url: '/system/file/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 删除文件
export function deleteFile(fileKey) {
  return request({
    url: '/system/file',
    method: 'delete',
    params: { fileKey }
  })
}