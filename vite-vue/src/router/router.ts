import { createRouter, createWebHistory, type RouteLocationRaw, type RouteRecordRaw } from 'vue-router'

export const routes:RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: 'home page'
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/demo-pages/test/test.vue'),
    meta: {
      title: 'test demo page'
    }
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/views/demo-pages/message/message.vue'),
    meta: {
      title: 'message encapsulation demo page'
    }
  },
  {
    path: '/perm',
    name: 'perm',
    component: () => import('@/views/demo-pages/perm/index.vue'),
    meta: {
      title: 'message encapsulation demo page'
    }
  }
  
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})


export const routerPush = (to: RouteLocationRaw | string): void => {
  router.push(typeof to === 'string' ? {path:to} : to)
}


export const currentPageTitle =  ()=>{
  const title = router.currentRoute.value.meta.title
  return title ? title : ''
}