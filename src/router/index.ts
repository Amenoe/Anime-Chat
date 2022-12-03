import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/Home.vue'),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/User.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
})

export default router
