import { useState } from "react";
import styles from "./styles.module.less";
import { useNameSpace } from "@/utils";

export default function App() {
  const { cx, ...ns } = useNameSpace(styles, "form");
  const [active, setActive] = useState(false);
  return (
    <div>
      <div className={cx(ns.b("wrapper"), ns.is("active",active))}>
        Hello React + TypeScript + Webpack
      </div>
      <button className={cx(ns.b("switch"))} onClick={() => setActive(!active)}>
        Switch
      </button>
    </div>
  );
}
