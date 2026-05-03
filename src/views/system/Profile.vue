<template>
  <div class="page-container">
    <div class="card">
      <div class="profile-header">
        <div class="avatar-wrapper">
          <div class="avatar" @click="triggerFileInput">
            <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="头像" />
            <span v-else>{{ userInfo.nickname?.charAt(0) || 'U' }}</span>
            <div class="avatar-overlay">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M3 4V1h2v3h3v2H5v3H3V6H1V4h2zm15 0V1h2v3h3v2h-3v3h-2V6h-3V4h3zM11 7V1H9v6h6V7h-4zm-4 9V9H3v3H0v2h3v3h2v-3h3v-2H7zm8-3v6h6v-6h-6zm4 4h-2v-2h2v2zm0-4h-2V9h2v2zm-4 4h-2v-2h2v2zm0-4h-2V9h2v2z"/>
              </svg>
              <span>更换头像</span>
            </div>
          </div>
          <input ref="fileInput" type="file" accept="image/*" style="display: none" @change="handleFileChange" />
        </div>
        <div class="user-info">
          <h2>{{ userInfo.nickname || '用户' }}</h2>
          <p class="username">@{{ userInfo.username }}</p>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="section-title">基本信息</div>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px" class="profile-form">
        <el-form-item label="用户名">
          <span>{{ userInfo.username }}</span>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="formData.realName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpdateProfile" :loading="submitting">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="section-title">修改密码</div>
      <el-form ref="pwdFormRef" :model="pwdData" :rules="pwdRules" label-width="100px" class="profile-form">
        <el-form-item label="当前密码" prop="oldPassword">
          <el-input v-model="pwdData.oldPassword" type="password" placeholder="请输入当前密码" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="pwdData.newPassword" type="password" placeholder="请输入新密码" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="pwdData.confirmPassword" type="password" placeholder="请再次输入新密码" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleChangePassword" :loading="changing">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import { getCurrentUser } from '@/api/auth'
import { updateUser } from '@/api/user'
import { uploadFile } from '@/api/file'

const userInfo = reactive({ userId: null, username: '', nickname: '', role: '', avatar: '' })
const fileInput = ref(null)
const uploading = ref(false)
const formData = reactive({ realName: '', phone: '', email: '' })
const pwdData = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' })
const formRef = ref(null)
const pwdFormRef = ref(null)
const submitting = ref(false)
const changing = ref(false)

const rules = {
  realName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }],
  email: [{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }]
}

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== pwdData.newPassword) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const pwdRules = {
  oldPassword: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }, { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }],
  confirmPassword: [{ required: true, message: '请再次输入新密码', trigger: 'blur' }, { validator: validateConfirmPassword, trigger: 'blur' }]
}

const loadUserInfo = async () => {
  try {
    const res = await getCurrentUser()
    if (res.code === 200 && res.data) {
      Object.assign(userInfo, {
        userId: res.data.userId,
        username: res.data.username,
        nickname: res.data.realName,
        role: res.data.role,
        avatar: res.data.avatar
      })
      formData.realName = res.data.realName || ''
      formData.phone = res.data.phone || ''
      formData.email = res.data.email || ''
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  } catch (e) {
    ElMessage.error('获取用户信息失败')
  }
}

const handleUpdateProfile = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    submitting.value = true
    try {
      await updateUser({ id: userInfo.userId, realName: formData.realName, phone: formData.phone, email: formData.email })
      ElMessage.success('保存成功')
      loadUserInfo()
    } catch (e) {
      ElMessage.error('保存失败')
    } finally {
      submitting.value = false
    }
  })
}

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value.click()
}

// 处理文件选择
const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    ElMessage.error('请选择图片文件')
    return
  }
  
  // 验证文件大小（5MB）
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.error('图片大小不能超过5MB')
    return
  }
  
  uploading.value = true
  const loading = ElLoading.service({ text: '上传中...' })
  
  try {
    const res = await uploadFile(file)
    if (res.code === 200 && res.data) {
      const avatarUrl = res.data.url
      // 更新用户头像
      await updateUser({ id: userInfo.userId, avatar: avatarUrl })
      userInfo.avatar = avatarUrl
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      ElMessage.success('头像上传成功')
    }
  } catch (e) {
    ElMessage.error(e.message || '头像上传失败')
  } finally {
    loading.close()
    uploading.value = false
    // 清空文件输入
    event.target.value = ''
  }
}

const handleChangePassword = async () => {
  if (!pwdFormRef.value) return
  await pwdFormRef.value.validate(async (valid) => {
    if (!valid) return
    changing.value = true
    try {
      // TODO: 调用修改密码接口
      ElMessage.success('密码修改成功')
      pwdData.oldPassword = ''
      pwdData.newPassword = ''
      pwdData.confirmPassword = ''
    } catch (e) {
      ElMessage.error('密码修改失败')
    } finally {
      changing.value = false
    }
  })
}

onMounted(() => { loadUserInfo() })
</script>

<style scoped lang="scss">
.page-container { padding: 0; }
.card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-light);
  margin-bottom: 16px;
  padding: 24px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  
  .avatar-wrapper {
    flex-shrink: 0;
  }
  
  .avatar {
    width: 80px;
    height: 80px;
    background: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 32px;
    font-weight: 500;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .avatar-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      opacity: 0;
      transition: opacity 0.3s;
      
      span {
        font-size: 12px;
        margin-top: 4px;
      }
    }
    
    &:hover .avatar-overlay {
      opacity: 1;
    }
  }
  
  h2 {
    font-size: 20px;
    font-weight: 500;
    color: var(--text-color);
    margin: 0 0 4px 0;
  }
  
  .username {
    font-size: 14px;
    color: var(--text-muted);
    margin: 0;
  }
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.profile-form {
  max-width: 500px;
}
</style>