import { useEffect } from "react";
import { Outlet, useMatches, type UIMatch } from "react-router-dom";
import type { PageHandle } from "@/router";
import FloatingMenu from "./floating-menu";

const DefaultLayout = () => {
  const matches = useMatches() as UIMatch<unknown, PageHandle>[];
  const lastMatch = matches.at(-1);
  // 提取路由标题，做兜底处理
  const pageTitle = lastMatch?.handle?.title || "默认标题";
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);
  return (
    <>
      <header></header>
      <main>
        <FloatingMenu/>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </>
  );
};
export default DefaultLayout;
