import { lazyLoad, Pages } from "./pages";
import { ROUTES } from "./route";
import type { AppRouteObject } from "./types";


export const routes: AppRouteObject[] = [
  {
    path: "/",
    element: lazyLoad(Pages.DefaultLayout),
    children: [
      ROUTES.HOME_ROUTE,
      ROUTES.ABOUT_ROUTE,
      ROUTES.NOT_FOUND_ROUTE
    ],
  },
];
