<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-left">
        <div class="decoration-bg">
          <div class="decoration-circle circle-1"></div>
          <div class="decoration-circle circle-2"></div>
          <div class="decoration-circle circle-3"></div>
        </div>
        <div class="logo-area">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7 3.5v7.64l-7 3.5-7-3.5V7.68l7-3.5z"/>
            </svg>
          </div>
          <h1 class="system-title">后台管理系统</h1>
          <p class="system-desc">安全 · 高效 · 智能</p>
        </div>
        <div class="features-list">
          <div class="feature-item">
            <div class="feature-icon-box">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
              </svg>
            </div>
            <div class="feature-text">
              <span class="feature-title">安全可靠</span>
              <span class="feature-desc">多层安全防护机制</span>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon-box">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 1.62-.49 3.13-1.32 4.39l1.46 1.46C21.32 16.13 22 14.15 22 12c0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V3.03c-4.06.5-7.17 3.95-7.17 8.12 0 4.69 3.81 8.5 8.5 8.5 2.76 0 5.21-1.33 6.75-3.38l-1.48-1.48C16.44 16.31 14.36 19 12 19z"/>
                <path d="M12 8v4l3.5 2.09-.85 1.42L11 13.5V8h1z"/>
              </svg>
            </div>
            <div class="feature-text">
              <span class="feature-title">多租户架构</span>
              <span class="feature-desc">数据隔离，独立管理</span>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon-box">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
            <div class="feature-text">
              <span class="feature-title">数据可视化</span>
              <span class="feature-desc">实时数据分析与展示</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="login-right">
        <div class="login-form-wrapper">
          <div class="form-header">
            <h2 class="form-title">欢迎登录</h2>
            <p class="form-subtitle">请输入您的账号密码</p>
          </div>
          
          <form class="login-form" @submit.prevent="handleLogin">
            <div class="form-group">
              <label class="form-label">用户名</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </span>
                <input 
                  v-model="loginForm.username"
                  type="text" 
                  class="form-input" 
                  placeholder="请输入用户名"
                  autocomplete="username"
                  :class="{ 'error': errors.username }"
                />
              </div>
              <span v-if="errors.username" class="error-msg">{{ errors.username }}</span>
            </div>
            
            <div class="form-group">
              <label class="form-label">密码</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"/>
                  </svg>
                </span>
                <input 
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'" 
                  class="form-input" 
                  placeholder="请输入密码"
                  autocomplete="current-password"
                  :class="{ 'error': errors.password }"
                />
                <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                  <svg v-if="showPassword" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                  </svg>
                </button>
              </div>
              <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
            </div>
            
            <div class="form-actions">
              <label class="remember-me">
                <input type="checkbox" v-model="loginForm.remember" />
                <span class="checkbox-custom"></span>
                <span>记住密码</span>
              </label>
              <a href="#" class="forgot-link">忘记密码?</a>
            </div>
            
            <button type="submit" class="btn-login" :disabled="loading">
              <span v-if="loading" class="loading-spinner"></span>
              <span class="btn-text">{{ loading ? '登录中...' : '登 录' }}</span>
            </button>
          </form>
        </div>
        
        <div class="login-footer">
          <span>© 2024-2026 后台管理系统 · All Rights Reserved</span>
        </div>
      </div>
    </div>
    
    <!-- 消息提示弹窗 -->
    <transition name="message-fade">
      <div v-if="showMessage" class="message-popup" :class="messageType">
        <div class="message-content">
          <span class="message-icon">{{ messageType === 'success' ? '✓' : '✕' }}</span>
          <span class="message-text">{{ messageText }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login, getCurrentUser } from '@/api/auth'

const router = useRouter()

// 表单数据
const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

const showPassword = ref(false)
const loading = ref(false)
const errors = reactive({})
const showMessage = ref(false)
const messageText = ref('')
const messageType = ref('success')

// 验证规则
const validateForm = () => {
  errors.username = ''
  errors.password = ''
  let valid = true
  
  if (!loginForm.username.trim()) {
    errors.username = '请输入用户名'
    valid = false
  }
  
  if (!loginForm.password) {
    errors.password = '请输入密码'
    valid = false
  } else if (loginForm.password.length < 6) {
    errors.password = '密码长度不能少于6位'
    valid = false
  }
  
  return valid
}

// 显示消息提示
const showMessagePopup = (text, type = 'success') => {
  messageText.value = text
  messageType.value = type
  showMessage.value = true
  
  setTimeout(() => {
    showMessage.value = false
  }, 3000)
}

// 处理登录响应并跳转
const handleLoginSuccess = async (loginData) => {
  const { token, userId, username, realName, avatar } = loginData
  
  localStorage.setItem('token', token)
  
  try {
    const userResponse = await getCurrentUser()
    if (userResponse.code === 200 && userResponse.data) {
      const userData = userResponse.data
      localStorage.setItem('userInfo', JSON.stringify({
        userId: userData.userId,
        username: userData.username,
        nickname: userData.realName,
        role: 'admin',
        avatar: userData.avatar
      }))
    } else {
      localStorage.setItem('userInfo', JSON.stringify({
        userId,
        username,
        nickname: realName,
        role: 'admin',
        avatar
      }))
    }
  } catch (err) {
    console.warn('获取用户信息失败，使用登录响应数据:', err)
    localStorage.setItem('userInfo', JSON.stringify({
      userId,
      username,
      nickname: realName,
      role: 'admin',
      avatar
    }))
  }
  
  showMessagePopup('登录成功，正在跳转...', 'success')
  
  setTimeout(() => {
    router.push('/system')
  }, 500)
}

// 登录处理
const handleLogin = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  try {
    const response = await login({
      username: loginForm.username.trim(),
      password: loginForm.password
    })
    
    if (response.code === 200 && response.data) {
      await handleLoginSuccess(response.data)
    } else {
      showMessagePopup(response.message || '登录失败，请重试', 'error')
    }
  } catch (error) {
    let errorMsg = '登录失败，请重试'
    
    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 400:
          errorMsg = data?.message || '参数校验失败'
          break
        case 401:
          errorMsg = '用户名或密码错误'
          break
        case 403:
          errorMsg = '用户已被禁用'
          break
        default:
          errorMsg = data?.message || errorMsg
      }
    } else if (error.request) {
      errorMsg = '网络连接失败，请检查网络'
    }
    
    showMessagePopup(errorMsg, 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f5fa;
  padding: 20px;
}

.login-content {
  width: 100%;
  max-width: 1080px;
  height: 600px;
  display: flex;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

// 左侧区域
.login-left {
  flex: 1;
  background: #1890ff;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.decoration-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  
  .decoration-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    
    &.circle-1 {
      width: 400px;
      height: 400px;
      top: -150px;
      right: -100px;
    }
    
    &.circle-2 {
      width: 250px;
      height: 250px;
      bottom: -80px;
      left: -60px;
    }
    
    &.circle-3 {
      width: 120px;
      height: 120px;
      bottom: 100px;
      right: 40px;
      background: rgba(255, 255, 255, 0.04);
    }
  }
}

.logo-area {
  position: relative;
  z-index: 1;
  
  .logo-icon {
    width: 64px;
    height: 64px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 28px;
    color: #fff;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  
  .system-title {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 12px 0;
    letter-spacing: 2px;
  }
  
  .system-desc {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    font-weight: 300;
    letter-spacing: 4px;
  }
}

.features-list {
  position: relative;
  z-index: 1;
  
  .feature-item {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(8px);
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateX(6px);
      background: rgba(255, 255, 255, 0.12);
    }
    
    .feature-icon-box {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      flex-shrink: 0;
    }
    
    .feature-text {
      display: flex;
      flex-direction: column;
      
      .feature-title {
        font-size: 15px;
        color: #fff;
        font-weight: 500;
      }
      
      .feature-desc {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.7);
        margin-top: 4px;
      }
    }
  }
}

// 右侧区域
.login-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: #fff;
  position: relative;
}

.login-form-wrapper {
  width: 100%;
  max-width: 360px;
}

.form-header {
  margin-bottom: 40px;
  text-align: center;
  
  .form-title {
    font-size: 28px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 10px 0;
  }
  
  .form-subtitle {
    font-size: 14px;
    color: #8c8c9a;
    margin: 0;
  }
}

.login-form {
  .form-group {
    margin-bottom: 24px;
  }
  
  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
  }
  
  .input-wrapper {
    display: flex;
    align-items: center;
    border: 2px solid #e8e8ef;
    border-radius: 12px;
    padding: 0 16px;
    height: 52px;
    transition: all 0.3s ease;
    background: #fafbfc;
    
    &:focus-within {
      border-color: #1890ff;
      background: #fff;
      box-shadow: 0 0 0 4px rgba(24, 144, 255, 0.1);
    }
    
    &.error {
      border-color: #ff4d4f;
      background: #fff5f5;
      
      &:focus-within {
        box-shadow: 0 0 0 4px rgba(255, 77, 79, 0.1);
      }
    }
    
    .input-icon {
      color: #b0b0bf;
      margin-right: 12px;
      display: flex;
      transition: color 0.3s;
    }
    
    &:focus-within .input-icon {
      color: #1890ff;
    }
    
    .form-input {
      flex: 1;
      height: 100%;
      border: none;
      outline: none;
      font-size: 15px;
      background: transparent;
      color: #333;
      
      &::placeholder {
        color: #b0b0bf;
      }
    }
    
    .toggle-password {
      background: none;
      border: none;
      cursor: pointer;
      color: #b0b0bf;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
      
      &:hover {
        color: #1890ff;
      }
    }
  }
  
  .error-msg {
    display: block;
    font-size: 12px;
    color: #ff4d4f;
    margin-top: 6px;
    animation: shake 0.3s ease;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 28px 0 32px;
    
    .remember-me {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #666;
      cursor: pointer;
      user-select: none;
      
      input[type="checkbox"] {
        display: none;
      }
      
      .checkbox-custom {
        width: 18px;
        height: 18px;
        border: 2px solid #d0d0dc;
        border-radius: 4px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        flex-shrink: 0;
        
        &::after {
          content: '✓';
          font-size: 12px;
          color: #fff;
          opacity: 0;
          transform: scale(0);
          transition: all 0.2s;
        }
      }
      
      input:checked + .checkbox-custom {
        background: #1890ff;
        border-color: #1890ff;
        
        &::after {
          opacity: 1;
          transform: scale(1);
        }
      }
    }
    
    .forgot-link {
      font-size: 14px;
      color: #1890ff;
      text-decoration: none;
      transition: color 0.2s;
      
      &:hover {
        color: #096dd9;
      }
    }
  }
}

.btn-login {
  width: 100%;
  height: 52px;
  background: #1890ff;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
  letter-spacing: 4px;
  box-shadow: 0 4px 16px rgba(24, 144, 255, 0.3);
  
  &:hover:not(:disabled) {
    background: #40a9ff;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(24, 144, 255, 0.4);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  .loading-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  .btn-text {
    letter-spacing: 4px;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.login-footer {
  position: absolute;
  bottom: 24px;
  font-size: 12px;
  color: #b0b0bf;
  text-align: center;
}

// 消息提示
.message-popup {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 14px;
  z-index: 1000;
  backdrop-filter: blur(10px);
  
  &.success {
    background: rgba(82, 196, 26, 0.95);
    color: #fff;
    box-shadow: 0 4px 16px rgba(82, 196, 26, 0.3);
  }
  
  &.error {
    background: rgba(255, 77, 79, 0.95);
    color: #fff;
    box-shadow: 0 4px 16px rgba(255, 77, 79, 0.3);
  }
  
  .message-content {
    display: flex;
    align-items: center;
    gap: 10px;
    
    .message-icon {
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
  }
}

.message-fade-enter-active {
  transition: all 0.3s ease;
}

.message-fade-leave-active {
  transition: all 0.2s ease;
}

.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-16px);
}

// 响应式
@media (max-width: 900px) {
  .login-content {
    max-width: 480px;
    height: auto;
  }
  
  .login-left {
    display: none;
  }
  
  .login-right {
    padding: 40px 24px;
  }
}
</style>