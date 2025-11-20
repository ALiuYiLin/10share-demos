import { routes } from "../router";

// 根据 routes 构造
export const MENUS: {
  key: string;
  label: string;
}[] = routes.map((item) => ({
  key: item.path as string,
  label: (item.meta?.title as string) || item.path,
}));
