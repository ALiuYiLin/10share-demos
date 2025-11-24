import { lazyLoad, Pages } from "./pages";
import type { AppRouteObject } from "./types";

export const HOME_ROUTE: AppRouteObject = {
  index: true,
  path: '',
  element: lazyLoad(Pages.Home),
  handle: {
    title: "首页",
  },
};

export const ABOUT_ROUTE: AppRouteObject = {
  element: lazyLoad(Pages.About),
  path: "/about",
  handle: {
    title: "关于",
  },
};

export const NOT_FOUND_ROUTE: AppRouteObject = {
  element: lazyLoad(Pages.NotFound),
  path: "/not-found",
  handle: {
    title: "未找到",
  },
};

export const MSG_PROPS_ROUTE: AppRouteObject = {
  element: lazyLoad(Pages.MsgProps),
  path: "/msg/props",
  handle: {
    title: "props",
  },
};

export const MSG_CALLBACK_ROUTE: AppRouteObject = {
  element: lazyLoad(Pages.MsgCallBack),
  path: "/msg/callback",
  handle: {
    title: "callback",
  },
};

export const MSG_STATE_ROUTE: AppRouteObject = {
  element: lazyLoad(Pages.MsgState),
  path: "/msg/state",
  handle: {
    title: "state",
  },
};

export const MSG_CONTEXT_ROUTE: AppRouteObject = {
  element: lazyLoad(Pages.MsgContext),
  path: "/msg/context",
  handle: {
    title: "context",
  },
};

export const MSG_STORET_ROUTE: AppRouteObject = {
  element: lazyLoad(Pages.MsgStore),
  path: "/msg/store",
  handle: {
    title: "store",
  },
};

export const MSG_BUS_ROUTE: AppRouteObject = {
  element: lazyLoad(Pages.MsgBus),
  path: "/msg/bus",
  handle: {
    title: "bus",
  },
};


export const MSG_ROUTE: AppRouteObject = {
  element: lazyLoad(Pages.Msg),
  path: "/msg",
  handle: {
    title: "通信",
  },
  children: [
    MSG_PROPS_ROUTE,
    MSG_CALLBACK_ROUTE,
    MSG_STATE_ROUTE,
    MSG_CONTEXT_ROUTE,
    MSG_STORET_ROUTE,
    MSG_BUS_ROUTE
  ],
};


export const ROUTES = {
  HOME_ROUTE,
  ABOUT_ROUTE,
  NOT_FOUND_ROUTE,
  MSG_ROUTE,
  MSG_PROPS_ROUTE,
};
