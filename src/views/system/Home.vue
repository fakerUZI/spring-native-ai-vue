<template>
  <div>
    <!-- 欢迎区域 -->
    <div class="welcome-card">
      <div class="welcome-text">
        <h2>欢迎回来，{{ userInfo.nickname }}！</h2>
        <p>今天是 {{ currentDate }}，祝您工作愉快</p>
      </div>
      <div class="welcome-icon">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor" opacity="0.3">
          <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/>
        </svg>
      </div>
    </div>
    
    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon users-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">1,286</span>
          <span class="stat-label">用户总数</span>
        </div>
        <span class="stat-trend up">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M7 14l5-5 5 5z"/>
          </svg>
          +12.5%
        </span>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon tenants-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">48</span>
          <span class="stat-label">租户数量</span>
        </div>
        <span class="stat-trend up">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M7 14l5-5 5 5z"/>
          </svg>
          +3.2%
        </span>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon roles-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">24</span>
          <span class="stat-label">角色数量</span>
        </div>
        <span class="stat-trend">--</span>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon logs-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">8,942</span>
          <span class="stat-label">操作日志</span>
        </div>
        <span class="stat-trend up">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M7 14l5-5 5 5z"/>
          </svg>
          +28.6%
        </span>
      </div>
    </div>
    
    <!-- 快捷操作和最近活动 -->
    <div class="content-grid">
      <div class="quick-actions">
        <h3 class="card-title">快捷操作</h3>
        <div class="action-grid">
          <button class="quick-action-btn">
            <span class="action-icon-wrapper">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </span>
            <span>新增用户</span>
          </button>
          <button class="quick-action-btn" @click="$router.push('/system/roles')">
            <span class="action-icon-wrapper">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </span>
            <span>角色管理</span>
          </button>
          <button class="quick-action-btn">
            <span class="action-icon-wrapper">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
            </span>
            <span>数据报表</span>
          </button>
          <button class="quick-action-btn">
            <span class="action-icon-wrapper">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
              </svg>
            </span>
            <span>系统设置</span>
          </button>
        </div>
      </div>
      
      <div class="recent-activity">
        <h3 class="card-title">最近活动</h3>
        <div class="activity-list">
          <div class="activity-item" v-for="(activity, index) in recentActivities" :key="index">
            <div class="activity-dot"></div>
            <div class="activity-content">
              <p class="activity-text">{{ activity.text }}</p>
              <span class="activity-time">{{ activity.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{"nickname":"用户"}')

const currentDate = computed(() => {
  const now = new Date()
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
  return now.toLocaleDateString('zh-CN', options)
})

const recentActivities = [
  { text: '管理员登录了系统', time: '2分钟前' },
  { text: '新增用户成功', time: '15分钟前' },
  { text: '租户已到期', time: '1小时前' },
  { text: '角色权限已更新', time: '2小时前' },
  { text: '系统配置已修改', time: '昨天 18:30' }
]
</script>

<style scoped lang="scss">
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

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>