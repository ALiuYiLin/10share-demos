import React, { type JSX } from 'react';

const About = React.lazy(()=>import('@/pages/About'))
const Home = React.lazy(()=>import('@/pages/Home'))
const NotFound = React.lazy(()=>import('@/pages/NotFound'))
const DefaultLayout = React.lazy(()=>import('@/layout'))
const Demo = React.lazy(()=>import('@/pages/Demo'))
const DemoProps = React.lazy(()=>import('@/pages/Demo/props'))


export const Pages = {
  About,
  Home,
  NotFound,
  DefaultLayout,
  Demo,
  DemoProps
}

export function lazyLoad(Page:React.LazyExoticComponent<() => JSX.Element>) {
  return (
    <React.Suspense fallback={
      <div>加载中... (别急，奶茶马上到) 🍵</div>
    } >
      <Page></Page>
    </React.Suspense>
  )
}
