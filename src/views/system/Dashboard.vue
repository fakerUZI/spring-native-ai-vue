<template>
  <div class="dashboard-container">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
            </svg>
          </div>
          <transition name="slide-fade">
            <span v-show="!sidebarCollapsed" class="logo-text">后台管理</span>
          </transition>
        </div>
        <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed" :title="sidebarCollapsed ? '展开' : '折叠'">
          <span class="collapse-icon" :class="{ 'rotated': sidebarCollapsed }">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </span>
        </button>
      </div>
      
      <nav class="sidebar-menu">
        <transition name="slide-fade">
          <div v-show="!sidebarCollapsed" class="menu-group">
            <span class="menu-group-title">系统管理</span>
          </div>
        </transition>
        
        <div class="menu-item" :class="{ active: activeMenu === 'dashboard' }" @click="activeMenu = 'dashboard'">
          <span class="menu-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
          </span>
          <transition name="slide-fade">
            <span v-show="!sidebarCollapsed" class="menu-text">工作台</span>
          </transition>
        </div>
        
        <div class="menu-item" :class="{ active: activeMenu === 'users' }" @click="activeMenu = 'users'">
          <span class="menu-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          </span>
          <transition name="slide-fade">
            <span v-show="!sidebarCollapsed" class="menu-text">用户管理</span>
          </transition>
        </div>
        
        <div class="menu-item" :class="{ active: activeMenu === 'roles' }" @click="goTo('/system/roles', 'roles')">
          <span class="menu-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
          </span>
          <transition name="slide-fade">
            <span v-show="!sidebarCollapsed" class="menu-text">角色管理</span>
          </transition>
        </div>
        
        <div class="menu-item" :class="{ active: activeMenu === 'menus' }" @click="activeMenu = 'menus'">
          <span class="menu-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
          </span>
          <transition name="slide-fade">
            <span v-show="!sidebarCollapsed" class="menu-text">菜单管理</span>
          </transition>
        </div>
        
        <div class="menu-item" :class="{ active: activeMenu === 'tenants' }" @click="activeMenu = 'tenants'">
          <span class="menu-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
            </svg>
          </span>
          <transition name="slide-fade">
            <span v-show="!sidebarCollapsed" class="menu-text">租户管理</span>
          </transition>
        </div>
        
        <div class="menu-item" :class="{ active: activeMenu === 'logs' }" @click="activeMenu = 'logs'">
          <span class="menu-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
          </span>
          <transition name="slide-fade">
            <span v-show="!sidebarCollapsed" class="menu-text">操作日志</span>
          </transition>
        </div>
        
        <transition name="slide-fade">
          <div v-show="!sidebarCollapsed" class="menu-group" style="margin-top: 24px;">
            <span class="menu-group-title">系统设置</span>
          </div>
        </transition>
        
        <div class="menu-item" :class="{ active: activeMenu === 'settings' }" @click="activeMenu = 'settings'">
          <span class="menu-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            </svg>
          </span>
          <transition name="slide-fade">
            <span v-show="!sidebarCollapsed" class="menu-text">系统配置</span>
          </transition>
        </div>
      </nav>
      
      <div class="sidebar-footer">
        <div class="user-info" v-show="!sidebarCollapsed">
          <div class="user-avatar-small">
            <span>{{ userInfo.nickname?.charAt(0) || 'U' }}</span>
          </div>
          <div class="user-detail">
            <span class="user-detail-name">{{ userInfo.nickname || '用户' }}</span>
            <span class="user-detail-role">{{ getRoleName() }}</span>
          </div>
        </div>
        <button class="logout-btn" @click="handleLogout" :title="sidebarCollapsed ? '退出登录' : ''">
          <span class="logout-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
          </span>
          <transition name="slide-fade">
            <span v-show="!sidebarCollapsed">退出登录</span>
          </transition>
        </button>
      </div>
    </aside>
    
    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 顶部导航 -->
      <header class="header">
        <div class="header-left">
          <button class="breadcrumb-btn" @click="sidebarCollapsed = !sidebarCollapsed" :title="sidebarCollapsed ? '展开侧边栏' : '折叠侧边栏'">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
          <div class="breadcrumb">
            <span class="breadcrumb-item">首页</span>
            <span class="breadcrumb-separator">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </span>
            <span class="breadcrumb-item active">{{ getCurrentMenuName() }}</span>
          </div>
        </div>
        
        <div class="header-right">
          <div class="header-action" @click="showNotifications = !showNotifications">
            <span class="action-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
            </span>
            <span class="action-badge">3</span>
          </div>
          
          <div class="user-dropdown" @click.stop="showUserMenu = !showUserMenu">
            <div class="user-avatar">
              <span>{{ userInfo.nickname?.charAt(0) || 'U' }}</span>
            </div>
            <span class="user-name">{{ userInfo.nickname || '用户' }}</span>
            <span class="dropdown-arrow">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </span>
            
            <transition name="dropdown-fade">
              <div class="user-menu" v-show="showUserMenu">
                <div class="user-menu-item" @click.stop>
                  <span class="menu-item-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </span>
                  <span>个人中心</span>
                </div>
                <div class="user-menu-divider"></div>
                <div class="user-menu-item logout-item" @click="handleLogout">
                  <span class="menu-item-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                    </svg>
                  </span>
                  <span>退出登录</span>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </header>
      
      <!-- 内容区域 -->
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { logout, getCurrentUser } from '@/api/auth'

const router = useRouter()
const route = useRoute()

// 状态
const sidebarCollapsed = ref(false)
const activeMenu = ref('dashboard')

// 根据路由设置当前菜单
watch(() => route.path, (newPath) => {
  if (newPath === '/system/roles') {
    activeMenu.value = 'roles'
  } else if (newPath === '/system') {
    activeMenu.value = 'dashboard'
  }
}, { immediate: true })

const goTo = (path, menu) => {
  activeMenu.value = menu
  router.push(path)
}
const showUserMenu = ref(false)
const showNotifications = ref(false)
const userInfo = reactive({
  userId: null,
  username: '',
  nickname: '',
  role: '',
  avatar: ''
})

// 当前日期
const currentDate = computed(() => {
  const now = new Date()
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
  return now.toLocaleDateString('zh-CN', options)
})

// 菜单名称映射
const menuNames = {
  dashboard: '工作台',
  users: '用户管理',
  roles: '角色管理',
  menus: '菜单管理',
  tenants: '租户管理',
  logs: '操作日志',
  settings: '系统配置'
}

const getCurrentMenuName = () => {
  return menuNames[activeMenu.value] || '工作台'
}

// 角色名称映射
const getRoleName = () => {
  const roleMap = {
    admin: '系统管理员',
    operator: '操作员'
  }
  return roleMap[userInfo.role] || '用户'
}

// 最近活动数据
const recentActivities = ref([
  { text: '管理员登录了系统', time: '2分钟前' },
  { text: '新增用户成功', time: '15分钟前' },
  { text: '租户已到期', time: '1小时前' },
  { text: '角色权限已更新', time: '2小时前' },
  { text: '系统配置已修改', time: '昨天 18:30' }
])

// 点击外部关闭菜单
const handleClickOutside = (e) => {
  showUserMenu.value = false
}

// 加载用户信息
const loadUserInfo = async () => {
  // 先从缓存读取
  const storedUserInfo = localStorage.getItem('userInfo')
  if (storedUserInfo) {
    const parsedInfo = JSON.parse(storedUserInfo)
    Object.assign(userInfo, parsedInfo)
  }
  
  // 尝试从API获取最新信息
  try {
    const response = await getCurrentUser()
    if (response.code === 200 && response.data) {
      const data = response.data
      const userInfoData = {
        userId: data.userId,
        username: data.username,
        nickname: data.realName,
        role: 'admin',
        avatar: data.avatar
      }
      Object.assign(userInfo, userInfoData)
      localStorage.setItem('userInfo', JSON.stringify(userInfoData))
    }
  } catch (err) {
    console.warn('获取用户信息失败，使用缓存数据:', err)
  }
}

// 初始化用户信息
onMounted(() => {
  loadUserInfo()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 退出登录
const handleLogout = async () => {
  try {
    await logout()
  } catch (err) {
    console.warn('退出登录API调用失败:', err)
  } finally {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    router.push('/login')
  }
}
</script>

<style scoped lang="scss">
.dashboard-container {
  display: flex;
  height: 100vh;
  background: #f0f2f5;
}

// 侧边栏样式
.sidebar {
  width: 260px;
  background: #001529;
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1);
  overflow: hidden;
  
  &.collapsed {
    width: 72px;
  }
}

.sidebar-header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  overflow: hidden;
  
  .logo-icon {
    width: 32px;
    height: 32px;
    background: #1890ff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .logo-text {
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
  }
}

.collapse-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
  
  .collapse-icon {
    display: flex;
    transition: transform 0.3s;
    
    &.rotated {
      transform: rotate(180deg);
    }
  }
}

.sidebar-menu {
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
}

.menu-group {
  padding: 8px 24px;
  margin-bottom: 4px;
  
  .menu-group-title {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.35);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  transition: all 0.2s;
  margin: 4px 12px;
  border-radius: 8px;
  overflow: hidden;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }
  
  &.active {
    background: #1890ff;
    color: #fff;
  }
  
  .menu-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
  
  .menu-text {
    white-space: nowrap;
    font-size: 14px;
  }
}

.sidebar-footer {
  padding: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  
  .user-avatar-small {
    width: 32px;
    height: 32px;
    background: #1890ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    flex-shrink: 0;
  }
  
  .user-detail {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    .user-detail-name {
      font-size: 13px;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .user-detail-role {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.45);
    }
  }
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  transition: all 0.2s;
  
  .logout-icon {
    display: flex;
    flex-shrink: 0;
  }
  
  &:hover {
    background: rgba(255, 77, 79, 0.1);
    border-color: rgba(255, 77, 79, 0.3);
    color: #ff4d4f;
  }
}

// 主内容区
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

// 顶部导航
.header {
  height: 64px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  
  .breadcrumb-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    color: #595959;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    
    &:hover {
      background: #f5f5f5;
      color: #1890ff;
    }
  }
  
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    
    .breadcrumb-item {
      color: #8c8c8c;
      
      &.active {
        color: #262626;
        font-weight: 500;
      }
    }
    
    .breadcrumb-separator {
      color: #bfbfbf;
      display: flex;
      align-items: center;
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-action {
  position: relative;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  
  &:hover {
    background: #f5f5f5;
  }
  
  .action-icon {
    display: flex;
    color: #595959;
  }
  
  .action-badge {
    position: absolute;
    top: 6px;
    right: 6px;
    background: #ff4d4f;
    color: #fff;
    font-size: 10px;
    padding: 1px 5px;
    border-radius: 10px;
    min-width: 16px;
    text-align: center;
    line-height: 1.4;
  }
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  position: relative;
  padding: 6px 10px;
  border-radius: 8px;
  
  &:hover {
    background: #f5f5f5;
  }
  
  .user-avatar {
    width: 36px;
    height: 36px;
    background: #1890ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
  }
  
  .user-name {
    font-size: 14px;
    color: #262626;
  }
  
  .dropdown-arrow {
    display: flex;
    color: #8c8c8c;
  }
}

.user-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  padding: 8px 0;
  min-width: 170px;
  z-index: 1000;
  border: 1px solid #f0f0f0;
  
  .user-menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    font-size: 14px;
    color: #262626;
    cursor: pointer;
    transition: background 0.2s;
    
    .menu-item-icon {
      display: flex;
      color: #595959;
    }
    
    &:hover {
      background: #f5f5f5;
    }
    
    &.logout-item {
      color: #ff4d4f;
      
      .menu-item-icon {
        color: #ff4d4f;
      }
      
      &:hover {
        background: #fff1f0;
      }
    }
  }
  
  .user-menu-divider {
    height: 1px;
    background: #f0f0f0;
    margin: 6px 0;
  }
}

// 内容区域
.content-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.welcome-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  
  .welcome-text h2 {
    font-size: 20px;
    color: #262626;
    margin: 0 0 8px 0;
    font-weight: 600;
  }
  
  .welcome-text p {
    font-size: 14px;
    color: #8c8c8c;
    margin: 0;
  }
  
  .welcome-icon {
    display: flex;
    color: #1890ff;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  
  .stat-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    
    &.users-icon {
      background: #e6f7ff;
      color: #1890ff;
    }
    
    &.tenants-icon {
      background: #f6ffed;
      color: #52c41a;
    }
    
    &.roles-icon {
      background: #fffbe6;
      color: #faad14;
    }
    
    &.logs-icon {
      background: #f9f0ff;
      color: #722ed1;
    }
  }
  
  .stat-info {
    display: flex;
    flex-direction: column;
    
    .stat-value {
      font-size: 22px;
      font-weight: 600;
      color: #262626;
      line-height: 1.2;
    }
    
    .stat-label {
      font-size: 13px;
      color: #8c8c8c;
    }
  }
  
  .stat-trend {
    position: absolute;
    top: 14px;
    right: 14px;
    font-size: 12px;
    color: #8c8c8c;
    display: flex;
    align-items: center;
    gap: 2px;
    
    &.up {
      color: #52c41a;
    }
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.quick-actions, .recent-activity {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #f5f5f5;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.quick-action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 16px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  color: #595959;
  
  .action-icon-wrapper {
    display: flex;
    color: #1890ff;
  }
  
  span:last-child {
    font-size: 13px;
  }
  
  &:hover {
    background: #e6f7ff;
    border-color: #91d5ff;
    color: #1890ff;
  }
}

.activity-list {
  .activity-item {
    display: flex;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #f5f5f5;
    
    &:last-child {
      border-bottom: none;
    }
    
    .activity-dot {
      width: 8px;
      height: 8px;
      background: #1890ff;
      border-radius: 50%;
      margin-top: 6px;
      flex-shrink: 0;
    }
    
    .activity-content {
      flex: 1;
      min-width: 0;
      
      .activity-text {
        font-size: 14px;
        color: #262626;
        margin: 0 0 4px 0;
      }
      
      .activity-time {
        font-size: 12px;
        color: #8c8c8c;
      }
    }
  }
}

// 过渡动画
.slide-fade-enter-active {
  transition: all 0.25s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}

.dropdown-fade-enter-active {
  transition: all 0.2s ease;
}

.dropdown-fade-leave-active {
  transition: all 0.15s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

// 响应式
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 1000;
    transform: translateX(-100%);
    
    &.show {
      transform: translateX(0);
    }
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>