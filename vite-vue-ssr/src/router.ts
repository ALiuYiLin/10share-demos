import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router'

const routes:RouteRecordRaw[] = [
  {
    path:'/',
    name: 'home',
    component: ()=> import('./pages/home.vue')
  },
  {
    path:'/test',
    name: 'test',
    component: ()=> import('./pages/test.vue')
  }
] as const

export function createRouter(){
  return _createRouter(
    {
      //@ts-ignore
      history: import.meta.env.SSR
      ? createMemoryHistory('/test/')
      : createWebHashHistory('/test/'),
      routes
    }
  )
}