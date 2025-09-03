import { createRouter, createWebHistory, type RouteLocationRaw, type RouteRecordRaw } from 'vue-router'

export const routes:RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test/test.vue')
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})


export const routerPush = (to: RouteLocationRaw | string): void => {
  router.push(typeof to === 'string' ? {path:to} : to)
}

