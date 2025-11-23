import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import { routes } from "./routes";

const router = createBrowserRouter(routes as RouteObject[]);

const AppRouter = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export type { PageHandle, AppRouteObject } from "./types";

export default AppRouter;

