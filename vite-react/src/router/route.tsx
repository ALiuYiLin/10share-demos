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
  index: true,
  element: lazyLoad(Pages.About),
  handle: {
    title: "关于",
  },
};


export const NOT_FOUND_ROUTE: AppRouteObject = {
  index: true,
  element: lazyLoad(Pages.NotFound),
  handle: {
    title: "未找到",
  },
};

export const ROUTES = {
  HOME_ROUTE,
  ABOUT_ROUTE,
  NOT_FOUND_ROUTE
};
