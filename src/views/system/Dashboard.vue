<template>
  <div class="dashboard-container">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
            </svg>
          </div>
          <transition name="slide-fade">
            <span v-show="!sidebarCollapsed" class="logo-text">后台管理系统</span>
          </transition>
        </div>
      </div>
      
      <nav class="sidebar-menu">
        <!-- 工作台（始终显示） -->
        <div class="menu-item" :class="{ active: activeMenu === 'dashboard' }" @click="goTo('/system/home', 'dashboard')">
          <span class="menu-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
          </span>
          <transition name="slide-fade">
            <span v-show="!sidebarCollapsed" class="menu-text">工作台</span>
          </transition>
        </div>
        
        <!-- 动态菜单 - 支持展开 -->
        <template v-for="menu in userMenus" :key="menu.id">
          <!-- 有子菜单的情况 -->
          <div class="menu-group" v-if="menu.children && menu.children.length > 0">
            <div class="menu-item" :class="{ active: expandedMenus.includes(menu.id) }" @click="toggleMenu(menu.id)">
              <span class="menu-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path :d="getMenuIcon(menu.icon)"/>
                </svg>
              </span>
              <transition name="slide-fade">
                <span v-show="!sidebarCollapsed" class="menu-text">{{ menu.menuName }}</span>
              </transition>
              <span v-show="!sidebarCollapsed" class="menu-arrow" :class="{ expanded: expandedMenus.includes(menu.id) }">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </span>
            </div>
            <transition name="expand">
              <div v-show="expandedMenus.includes(menu.id) && !sidebarCollapsed" class="submenu">
                <div 
                  v-for="child in menu.children" 
                  :key="child.id"
                  class="submenu-item"
                  :class="{ active: activeMenu === child.path }"
                  @click="goTo(child.path, child.path)"
                >
                  <span class="submenu-text">{{ child.menuName }}</span>
                </div>
              </div>
            </transition>
          </div>
          <!-- 没有子菜单的直接显示 -->
          <div v-else class="menu-item" :class="{ active: activeMenu === menu.path }" @click="goTo(menu.path, menu.path)">
            <span class="menu-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path :d="getMenuIcon(menu.icon)"/>
              </svg>
            </span>
            <transition name="slide-fade">
              <span v-show="!sidebarCollapsed" class="menu-text">{{ menu.menuName }}</span>
            </transition>
          </div>
        </template>
        
        <!-- 个人中心 -->
        <div class="menu-item" :class="{ active: activeMenu === 'profile' }" @click="goTo('/system/profile', 'profile')">
          <span class="menu-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </span>
          <transition name="slide-fade">
            <span v-show="!sidebarCollapsed" class="menu-text">个人中心</span>
          </transition>
        </div>
      </nav>
      
      <div class="sidebar-footer">
        <div class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed" :title="sidebarCollapsed ? '展开' : '收起'">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path :d="sidebarCollapsed ? 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' : 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'"/>
          </svg>
        </div>
      </div>
    </aside>
    
    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 顶部导航 -->
      <header class="header">
        <div class="header-left">
          <div class="breadcrumb">
            <span class="breadcrumb-item">首页</span>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item active">{{ getCurrentMenuName() }}</span>
          </div>
        </div>
        
        <div class="header-right">
          <div class="header-action" @click="showThemeSettings = true" title="主题设置">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            </svg>
          </div>
          
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="user-info">
              <div class="user-avatar">
                <span>{{ userInfo.nickname?.charAt(0) || 'U' }}</span>
              </div>
              <span class="user-name">{{ userInfo.nickname || '用户' }}</span>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" class="arrow">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                  </svg>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      
      <!-- 内容区域 -->
      <div class="content-wrapper">
        <router-view />
      </div>

      <!-- 页脚备案信息 -->
      <footer class="footer">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
          陕ICP备2026011170号
        </a>
      </footer>
    </main>
    
    <!-- 退出登录第一次确认 -->
    <el-dialog v-model="showLogoutConfirm1" title="提示" width="360px" :close-on-click-modal="false">
      <span>确定要退出登录吗？</span>
      <template #footer>
        <el-button @click="showLogoutConfirm1 = false">取消</el-button>
        <el-button type="primary" @click="handleLogoutConfirm1">确定</el-button>
      </template>
    </el-dialog>
    
    <!-- 退出登录第二次确认 -->
    <el-dialog v-model="showLogoutConfirm2" title="再次确认" width="360px" :close-on-click-modal="false">
      <span>您真的要退出系统吗？此操作将清除您的登录状态</span>
      <template #footer>
        <el-button @click="showLogoutConfirm2 = false">取消</el-button>
        <el-button type="danger" @click="confirmLogout">确定退出</el-button>
      </template>
    </el-dialog>
    
    <!-- 主题设置 -->
    <el-dialog v-model="showThemeSettings" title="主题设置" width="400px">
      <div class="theme-settings">
        <div class="theme-item">
          <span class="theme-label">主题色</span>
          <div class="color-options">
            <div v-for="color in themeColors" :key="color.value" 
                 class="color-option" 
                 :class="{ active: currentTheme === color.value }" 
                 @click="setTheme(color.value)">
              <span class="color-preview" :style="{ background: color.primary }"></span>
              <span class="color-name">{{ color.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { logout, getCurrentUser } from '@/api/auth'
import { getUserMenus } from '@/api/menu'

const router = useRouter()
const route = useRoute()

const sidebarCollapsed = ref(false)
const activeMenu = ref('dashboard')
const expandedMenus = ref([])
const showLogoutConfirm1 = ref(false)
const showLogoutConfirm2 = ref(false)
const showThemeSettings = ref(false)
const currentTheme = ref(localStorage.getItem('theme') || 'default')

// 用户菜单
const userMenus = ref([])

const themeColors = [
  { name: '默认', value: 'default', primary: '#409EFF' },
  { name: '绿色', value: 'green', primary: '#67C23A' },
  { name: '橙色', value: 'orange', primary: '#E6A23C' },
  { name: '红色', value: 'red', primary: '#F56C6C' },
  { name: '紫色', value: 'purple', primary: '#722ed1' }
]

const setTheme = (theme) => {
  currentTheme.value = theme
  localStorage.setItem('theme', theme)
  applyTheme()
}

const applyTheme = () => {
  const theme = themeColors.find(t => t.value === currentTheme.value)
  if (theme) {
    document.documentElement.style.setProperty('--primary-color', theme.primary)
  }
}

// 菜单图标映射
const iconMap = {
  'system': 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z',
  'tenant': 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z',
  'user': 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  'role': 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
  'menu': 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z',
  'list': 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z'
}

const getMenuIcon = (icon) => {
  return iconMap[icon] || iconMap['menu']
}

// 加载用户菜单
const loadUserMenus = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    if (userInfo.userId) {
      const res = await getUserMenus(userInfo.userId)
      if (res.code === 200 && res.data) {
        const allMenus = res.data
        // 获取一级目录菜单（menuType === 0）并排序
        const parentMenus = allMenus.filter(m => m.menuType === 0)
        parentMenus.sort((a, b) => a.sort - b.sort)
        
        // 为每个一级菜单添加子菜单
        userMenus.value = parentMenus.map(parent => {
          const children = allMenus.filter(m => m.menuType === 1 && m.parentId === parent.id)
          children.sort((a, b) => a.sort - b.sort)
          return {
            id: parent.id,
            menuName: parent.menuName,
            path: parent.path,
            icon: parent.icon,
            children: children
          }
        })
        
        // 默认展开所有有子菜单的目录
        expandedMenus.value = userMenus.value.filter(m => m.children.length > 0).map(m => m.id)
      }
    }
  } catch (e) {
    console.warn('加载用户菜单失败:', e)
  }
}

// 切换菜单展开/收起
const toggleMenu = (menuId) => {
  const index = expandedMenus.value.indexOf(menuId)
  if (index > -1) {
    expandedMenus.value.splice(index, 1)
  } else {
    expandedMenus.value.push(menuId)
  }
}

watch(() => route.path, (newPath) => {
  // 匹配子菜单路径
  for (const menu of userMenus.value) {
    if (menu.children) {
      const matchedChild = menu.children.find(c => c.path === newPath)
      if (matchedChild) {
        activeMenu.value = matchedChild.path
        // 自动展开父菜单
        if (!expandedMenus.value.includes(menu.id)) {
          expandedMenus.value.push(menu.id)
        }
        return
      }
    }
  }
  
  if (newPath === '/system/home') {
    activeMenu.value = 'dashboard'
  } else if (newPath === '/system/profile') {
    activeMenu.value = 'profile'
  }
}, { immediate: true })

const goTo = (path, menu) => { activeMenu.value = menu; router.push(path) }

const userInfo = reactive({ userId: null, username: '', nickname: '', role: '', avatar: '' })

const menuNames = reactive({ dashboard: '工作台', profile: '个人中心' })

// 动态生成菜单名称映射
const updateMenuNames = () => {
  userMenus.value.forEach(m => {
    menuNames[m.path] = m.menuName
    if (m.children) {
      m.children.forEach(child => {
        menuNames[child.path] = child.menuName
      })
    }
  })
}

const getCurrentMenuName = () => menuNames[activeMenu.value] || '工作台'

const handleCommand = (command) => {
  if (command === 'profile') goTo('/system/profile', 'profile')
  else if (command === 'logout') handleLogoutClick()
}

const loadUserInfo = async () => {
  const stored = localStorage.getItem('userInfo')
  if (stored) Object.assign(userInfo, JSON.parse(stored))
  try {
    const res = await getCurrentUser()
    if (res.code === 200 && res.data) {
      const info = { userId: res.data.userId, username: res.data.username, nickname: res.data.realName, role: 'admin', avatar: res.data.avatar }
      Object.assign(userInfo, info)
      localStorage.setItem('userInfo', JSON.stringify(info))
    }
  } catch (e) { console.warn('获取用户信息失败:', e) }
}

onMounted(async () => { 
  await loadUserInfo()
  await loadUserMenus()
  updateMenuNames()
  applyTheme() 
})

const handleLogoutClick = () => { showLogoutConfirm1.value = true }
const handleLogoutConfirm1 = () => { showLogoutConfirm1.value = false; showLogoutConfirm2.value = true }
const confirmLogout = async () => {
  showLogoutConfirm2.value = false
  try { await logout() } catch (e) {}
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  router.push('/login')
}
</script>

<style scoped lang="scss">
.dashboard-container {
  display: flex;
  height: 100vh;
  background: var(--page-bg);
}

// 侧边栏样式 - D2Admin风格（白色）
.sidebar {
  width: 220px;
  background: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-right: 1px solid var(--border-color);
  transition: width 0.3s;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
  
  &.collapsed {
    width: 64px;
  }
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
  background: var(--sidebar-bg);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--primary-color);
  overflow: hidden;
  
  .logo-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .logo-text {
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
    color: var(--text-color);
  }
}

.sidebar-menu {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.menu-group {
  margin: 2px 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--radius);
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    color: var(--primary-color);
    background: var(--primary-light);
  }
  
  &.active {
    color: var(--primary-color);
    background: var(--primary-light);
  }
  
  .menu-icon {
    display: flex;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  
  .menu-text {
    white-space: nowrap;
    font-size: 14px;
    flex: 1;
  }
  
  .menu-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s;
    
    &.expanded {
      transform: rotate(180deg);
    }
  }
}

.submenu {
  padding-left: 20px;
  
  .submenu-item {
    padding: 10px 20px;
    color: var(--text-muted);
    cursor: pointer;
    border-radius: var(--radius);
    transition: all 0.2s;
    
    &:hover {
      color: var(--primary-color);
      background: var(--primary-light);
    }
    
    &.active {
      color: var(--primary-color);
      background: var(--primary-light);
    }
    
    .submenu-text {
      white-space: nowrap;
      font-size: 13px;
    }
  }
}

.sidebar-footer {
  padding: 12px;
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
}

.sidebar-footer .collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  cursor: pointer;
  color: var(--text-muted);
  border-radius: var(--radius);
  
  &:hover {
    color: var(--primary-color);
    background: var(--primary-light);
  }
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

.header {
  height: 50px;
  background: var(--header-bg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    
    .breadcrumb-item {
      color: var(--text-muted);
      
      &.active {
        color: var(--text-color);
      }
    }
    
    .breadcrumb-separator {
      color: var(--text-muted);
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-action {
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  border-radius: var(--radius);
  
  &:hover {
    color: var(--primary-color);
    background: var(--primary-light);
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--radius);
  
  &:hover {
    background: var(--primary-light);
  }
  
  .user-avatar {
    width: 28px;
    height: 28px;
    background: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 500;
    font-size: 12px;
    border-radius: 50%;
  }
  
  .user-name {
    font-size: 14px;
    color: var(--text-color);
  }
  
  .arrow {
    color: var(--text-muted);
  }
}

.content-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: var(--page-bg);
  min-height: 0;
}

.footer {
  padding: 12px 20px;
  text-align: center;
  border-top: 1px solid var(--border-color);
  background: var(--header-bg);
  flex-shrink: 0;

  a {
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: var(--primary-color);
    }
  }
}

.theme-settings {
  .theme-item {
    margin-bottom: 16px;
    
    .theme-label {
      display: block;
      font-size: 14px;
      color: var(--text-color);
      margin-bottom: 12px;
    }
  }
}

.color-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.color-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  border-radius: var(--radius);
  transition: all 0.2s;
  
  &.active {
    border-color: var(--primary-color);
    background: var(--primary-light);
  }
  
  &:hover {
    border-color: var(--primary-color);
  }
  
  .color-preview {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .color-name {
    font-size: 12px;
    color: var(--text-color);
  }
}

// 动画
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

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>