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
    children: [
      {
        path: '',
        name: 'System',
        component: () => import('@/views/system/Home.vue')
      },
      {
        path: 'roles',
        name: 'RoleManagement',
        component: () => import('@/views/system/Role.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/system')
  } else {
    next()
  }
})

export default router