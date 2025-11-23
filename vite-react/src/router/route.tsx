import { lazyLoad, Pages } from "./pages";
import type { AppRouteObject } from "./types";

export const HOME_ROUTE: AppRouteObject = {
  index: true,
  element: lazyLoad(Pages.Home),
  handle: {
    title: "首页",
  },
};

export const ABOUT_ROUTE: AppRouteObject = {
  element: lazyLoad(Pages.About),
  path:'/about',
  handle: {
    title: "关于",
  },
};

export const NOT_FOUND_ROUTE: AppRouteObject = {
  element: lazyLoad(Pages.NotFound),
  path:'/not-found',
  handle: {
    title: "未找到",
  },
};

export const DEMO_PROPS_ROUTE: AppRouteObject = {
  element: lazyLoad(Pages.DemoProps),
  path:'/demo/props',
  handle: {
    title: "演示",
  },
};


export const DEMO_ROUTE: AppRouteObject = {
  element: lazyLoad(Pages.Demo),
  path: '/demo',
  handle: {
    title: "演示",
  },
  children:[DEMO_PROPS_ROUTE]
};


export const ROUTES = {
  HOME_ROUTE,
  ABOUT_ROUTE,
  NOT_FOUND_ROUTE,
  DEMO_ROUTE,
  DEMO_PROPS_ROUTE
};
