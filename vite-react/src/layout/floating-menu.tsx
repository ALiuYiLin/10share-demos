import { useRef, useState } from "react";
import styles from "./floating-menu.module.css";
import { routes as ROUTES } from "@/router/routes";
import type { AppRouteObject } from "@/router";
import { useNavigate } from "react-router-dom";
import { useDraggable } from "@/hooks/useDraggable";

function ListMenus({ routes }: { routes: AppRouteObject[] }) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    navigate(path);
  };

  return routes.map((route) => (
    <div key={route.path} onClick={(e) => handleClick(e, route.path || "")}>
      {route.handle?.title}
      {route.children && route.children.length > 0 && (
        <ListMenus routes={route.children} />
      )}
    </div>
  ));
}

function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const ballRef = useRef<HTMLDivElement>(null);
  const { onMouseDown, clicked } = useDraggable(ballRef);
  return (
    <div
      className={styles["floating-container"]}
      ref={ballRef}
      onClick={()=> clicked && setIsOpen(!isOpen)}
      onMouseDown={onMouseDown}
    >
      {/* 悬浮球 */}
      <div className={styles["floating-ball"]}></div>

      {/* 菜单 */}
      {isOpen && (
        <div className={styles["menu"]}>
          <ListMenus routes={ROUTES[0].children || []} />
        </div>
      )}
    </div>
  );
}

export default FloatingMenu;
