import React, { type JSX } from 'react';

const About = React.lazy(()=>import('@/pages/About'))
const Home = React.lazy(()=>import('@/pages/Home'))
const NotFound = React.lazy(()=>import('@/pages/NotFound'))
const DefaultLayout = React.lazy(()=>import('@/layout'))
const Msg = React.lazy(()=>import('@/pages/Msg'))
const MsgProps = React.lazy(()=>import('@/pages/Msg/props'))
const MsgCallBack = React.lazy(()=>import('@/pages/Msg/callback'))
const MsgState = React.lazy(()=>import('@/pages/Msg/state'))
const MsgContext = React.lazy(()=>import('@/pages/Msg/context'))
const MsgStore = React.lazy(()=>import('@/pages/Msg/store'))
const MsgBus = React.lazy(()=>import('@/pages/Msg/bus'))
const I18n = React.lazy(()=>import('@/pages/I18n'))
const Design = React.lazy(()=>import('@/pages/Design'))


export const Pages = {
  About,
  Home,
  NotFound,
  DefaultLayout,
  Msg,
  MsgProps,
  MsgCallBack,
  MsgState,
  MsgContext,
  MsgStore,
  MsgBus,
  I18n,
  Design
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
