<template>
  <div class="home-container">
    <!-- 欢迎区域 -->
    <div class="welcome-card">
      <div class="welcome-left">
        <h2 class="welcome-title">欢迎回来，{{ userInfo.nickname || '用户' }}！</h2>
        <p class="welcome-desc">今天是 {{ currentDate }}，祝您工作愉快</p>
        <div class="welcome-tags">
          <span class="tag">上次登录：{{ lastLoginTime }}</span>
          <span class="tag">登录IP：{{ lastLoginIp || '未知' }}</span>
        </div>
      </div>
      <div class="welcome-icon">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card" @click="$router.push('/system/user')">
        <div class="stat-icon users-icon">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.userCount || 0 }}</span>
          <span class="stat-label">用户总数</span>
        </div>
        <span class="stat-trend up">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M7 14l5-5 5 5z"/>
          </svg>
          较上月
        </span>
      </div>

      <div class="stat-card" @click="$router.push('/tenant/list')">
        <div class="stat-icon tenants-icon">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.tenantCount || 0 }}</span>
          <span class="stat-label">租户数量</span>
        </div>
        <span class="stat-trend up">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M7 14l5-5 5 5z"/>
          </svg>
          活跃租户
        </span>
      </div>

      <div class="stat-card" @click="$router.push('/system/role')">
        <div class="stat-icon roles-icon">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.roleCount || 0 }}</span>
          <span class="stat-label">角色数量</span>
        </div>
        <span class="stat-trend">
          --
        </span>
      </div>

      <div class="stat-card" @click="$router.push('/system/menu')">
        <div class="stat-icon menu-icon">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.menuCount || 0 }}</span>
          <span class="stat-label">菜单数量</span>
        </div>
        <span class="stat-trend">
          --
        </span>
      </div>
    </div>

    <!-- 快捷操作和最近活动 -->
    <div class="content-grid">
      <!-- 快捷操作 -->
      <div class="content-card">
        <div class="card-header">
          <h3 class="card-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            快捷操作
          </h3>
        </div>
        <div class="action-grid">
          <button class="action-btn" @click="$router.push('/system/user')">
            <div class="action-icon users-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <span class="action-text">用户管理</span>
          </button>
          <button class="action-btn" @click="$router.push('/system/role')">
            <div class="action-icon roles-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </div>
            <span class="action-text">角色管理</span>
          </button>
          <button class="action-btn" @click="$router.push('/system/menu')">
            <div class="action-icon menu-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
              </svg>
            </div>
            <span class="action-text">菜单管理</span>
          </button>
          <button class="action-btn" @click="$router.push('/tenant/list')">
            <div class="action-icon tenant-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
              </svg>
            </div>
            <span class="action-text">租户管理</span>
          </button>
        </div>
      </div>

      <!-- 最近活动 -->
      <div class="content-card">
        <div class="card-header">
          <h3 class="card-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
            </svg>
            最近活动
          </h3>
        </div>
        <div class="activity-list">
          <div class="activity-item" v-for="(activity, index) in activities" :key="index">
            <div class="activity-dot" :class="activity.type"></div>
            <div class="activity-content">
              <p class="activity-text">{{ activity.text }}</p>
              <span class="activity-time">{{ activity.time }}</span>
            </div>
          </div>
          <div v-if="activities.length === 0" class="empty-activity">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="#d9d9d9">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
            </svg>
            <p>暂无活动记录</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { getUserPage } from '@/api/user'
import { getRolePage } from '@/api/role'
import { getMenuList } from '@/api/menu'
import { getTenantPage } from '@/api/tenant'
import { getCurrentUser } from '@/api/auth'

const userInfo = reactive({ nickname: '用户' })
const lastLoginTime = ref('')
const lastLoginIp = ref('')

const currentDate = computed(() => {
  const now = new Date()
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
  return now.toLocaleDateString('zh-CN', options)
})

const stats = reactive({
  userCount: 0,
  tenantCount: 0,
  roleCount: 0,
  menuCount: 0
})

const activities = ref([])

// 加载统计数据
const loadStats = async () => {
  try {
    const [userRes, roleRes, menuRes, tenantRes] = await Promise.allSettled([
      getUserPage({ pageNum: 1, pageSize: 1 }),
      getRolePage({ pageNum: 1, pageSize: 1 }),
      getMenuList(),
      getTenantPage({ pageNum: 1, pageSize: 1 })
    ])
    
    if (userRes.status === 'fulfilled' && userRes.value.code === 200) {
      stats.userCount = userRes.value.data?.total || 0
    }
    if (roleRes.status === 'fulfilled' && roleRes.value.code === 200) {
      stats.roleCount = roleRes.value.data?.total || 0
    }
    if (menuRes.status === 'fulfilled' && menuRes.value.code === 200) {
      stats.menuCount = menuRes.value.data?.length || 0
    }
    if (tenantRes.status === 'fulfilled' && tenantRes.value.code === 200) {
      stats.tenantCount = tenantRes.value.data?.total || 0
    }
  } catch (e) {
    console.warn('加载统计数据失败:', e)
  }
}

// 加载用户信息
const loadUserInfo = async () => {
  const stored = localStorage.getItem('userInfo')
  if (stored) {
    const info = JSON.parse(stored)
    Object.assign(userInfo, info)
  }
  
  try {
    const res = await getCurrentUser()
    if (res.code === 200 && res.data) {
      const data = res.data
      lastLoginTime.value = data.lastLoginTime ? formatTime(data.lastLoginTime) : '首次登录'
      lastLoginIp.value = data.lastLoginIp || '未知'
    }
  } catch (e) {
    console.warn('获取用户信息失败:', e)
  }
}

// 格式化时间
const formatTime = (time) => {
  if (!time) return ''
  const date = new Date(time)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

// 模拟活动数据
const initActivities = () => {
  activities.value = [
    { text: '管理员登录了系统', time: '2分钟前', type: 'login' },
    { text: '系统启动完成', time: '5分钟前', type: 'system' },
    { text: '数据初始化完成', time: '10分钟前', type: 'data' },
    { text: '用户权限配置更新', time: '1小时前', type: 'update' },
    { text: '系统版本升级到 v1.0.0', time: '昨天 18:30', type: 'upgrade' }
  ]
}

onMounted(() => {
  loadUserInfo()
  loadStats()
  initActivities()
})
</script>

<style scoped lang="scss">
.home-container {
  max-width: 1400px;
  margin: 0 auto;
}

// 欢迎卡片
.welcome-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  color: var(--text-color);
  box-shadow: var(--shadow-light);

  .welcome-left {
    flex: 1;
  }

  .welcome-title {
    font-size: 26px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: var(--text-color);
  }

  .welcome-desc {
    font-size: 15px;
    margin: 0 0 16px 0;
    color: var(--text-muted);
  }

  .welcome-tags {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .tag {
    background: var(--page-bg);
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
  }

  .welcome-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-color);
    flex-shrink: 0;
  }
}

// 统计卡片
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 18px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: var(--shadow-light);
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow);
    border-color: var(--primary-color);
  }

  .stat-icon {
    width: 56px;
    height: 56px;
    border-radius: 14px;
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

    &.menu-icon {
      background: #f9f0ff;
      color: #722ed1;
    }
  }

  .stat-info {
    display: flex;
    flex-direction: column;

    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: var(--text-color);
      line-height: 1.2;
    }

    .stat-label {
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 4px;
    }
  }

  .stat-trend {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 12px;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 3px;

    &.up {
      color: #52c41a;
    }
  }
}

// 内容网格
.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.content-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-light);
}

.card-header {
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-color);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

// 快捷操作
.action-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 16px;
  background: var(--page-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.3s;
  color: var(--text-color);

  &:hover {
    background: var(--primary-light);
    border-color: var(--primary-color);
    transform: translateY(-2px);

    .action-icon {
      transform: scale(1.1);
    }
  }

  .action-icon {
    display: flex;
    transition: transform 0.3s;

    &.users-icon svg { fill: #1890ff; }
    &.roles-icon svg { fill: #faad14; }
    &.menu-icon svg { fill: #722ed1; }
    &.tenant-icon svg { fill: #52c41a; }
  }

  .action-text {
    font-size: 13px;
    font-weight: 500;
  }
}

// 最近活动
.activity-list {
  .activity-item {
    display: flex;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid var(--border-color);

    &:last-child {
      border-bottom: none;
    }

    .activity-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-top: 5px;
      flex-shrink: 0;

      &.login { background: #1890ff; }
      &.system { background: #52c41a; }
      &.data { background: #4facfe; }
      &.update { background: #faad14; }
      &.upgrade { background: #722ed1; }
    }

    .activity-content {
      flex: 1;
      min-width: 0;

      .activity-text {
        font-size: 14px;
        color: var(--text-color);
        margin: 0 0 6px 0;
      }

      .activity-time {
        font-size: 12px;
        color: var(--text-muted);
      }
    }
  }

  .empty-activity {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
    color: var(--text-muted);

    p {
      margin-top: 12px;
      font-size: 14px;
    }
  }
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
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .action-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>