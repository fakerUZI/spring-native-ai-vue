import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/system/Login.vue')
  },
  {
    path: '/system',
    component: () => import('@/views/system/Dashboard.vue'),
    meta: { requiresAuth: true },
    redirect: '/system/home',
    children: [
      {
        path: 'home',
        name: 'SystemHome',
        component: () => import('@/views/system/Home.vue')
      },
      // 用户管理
      {
        path: 'user',
        name: 'UserManagement',
        component: () => import('@/views/system/user/index.vue')
      },
      // 角色管理
      {
        path: 'role',
        name: 'RoleManagement',
        component: () => import('@/views/system/role/index.vue')
      },
      // 菜单管理
      {
        path: 'menu',
        name: 'MenuManagement',
        component: () => import('@/views/system/menu/index.vue')
      },
      // 个人中心
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/system/Profile.vue')
      }
    ]
  },
  // 租户管理
  {
    path: '/tenant',
    component: () => import('@/views/system/Dashboard.vue'),
    meta: { requiresAuth: true },
    redirect: '/tenant/list',
    children: [
      {
        path: 'list',
        name: 'TenantList',
        component: () => import('@/views/tenant/list/index.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/login'
  },
  // 404页面 - 捕获所有未匹配的路由
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/system/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return '/login'
  }
  if (to.path === '/login' && token) {
    return '/system'
  }
  // 允许导航继续
  return true
})

export default router