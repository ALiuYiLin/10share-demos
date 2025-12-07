import styles from "./styles.module.less";
import { useNameSpace } from "@/utils/namespace";

export default function App() {
  const {cx,...ns} = useNameSpace(styles, "form");
  return <div className={cx(ns.b("wrapper"),'nihao')}>Hello React + TypeScript + Webpack</div>;
}
