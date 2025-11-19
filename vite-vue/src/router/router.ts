import { createRouter, createWebHistory, type RouteLocationRaw, type RouteRecordRaw } from 'vue-router'

export const routes:RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/demo-pages/test/test.vue'),
    meta: {
      title: '测试页'
    }
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/views/demo-pages/message/message.vue'),
    meta: {
      title: '消息封装页'
    }
  },
  {
    path: '/perm',
    name: 'perm',
    component: () => import('@/views/demo-pages/perm/index.vue'),
    meta: {
      title: '权限封装页'
    }
  }
  
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局路由守卫
router.afterEach((to) => {
  document.title = to.meta.title as string || '10share-demos'
})


export const routerPush = (to: RouteLocationRaw | string): void => {
  router.push(typeof to === 'string' ? {path:to} : to)
}


export const currentPageTitle =  ()=>{
  const title = router.currentRoute.value.meta.title
  return title ? title : ''
}