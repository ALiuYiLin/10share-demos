import { type RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import DefaultLayout from "../layout";

// 1. 定义自定义的 handle 元数据类型（可扩展其他属性，如 auth、icon 等）
export type PageHandle = {
  title: string;
};

// 2. 扩展 React Router 的 RouteObject，指定 handle 为自定义的 PageHandle 类型
export type AppRouteObject = Omit<RouteObject, "handle" | "children"> & {
  handle?: PageHandle;
  children?: AppRouteObject[]; // 子路由也使用自定义类型
};

export const routes: AppRouteObject[] = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: {
          title: "首页",
        },
      },
      {
        path: "/about",
        element: <About />,
        handle: {
          title: "关于",
        },
      },
      {
        path: "*",
        element: <NotFound />,
        handle: {
          title: "未找到",
        },
      },
    ],
  },
];
