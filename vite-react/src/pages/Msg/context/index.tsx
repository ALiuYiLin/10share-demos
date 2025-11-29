import { createContext, useContext, useState } from "react";

const ThemeDefault = "light";
const ThemeContext = createContext(ThemeDefault);
const Context = () => {
  const [theme, setTheme] = useState(ThemeDefault);
  function handleTheme() {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }
  return (
    <div>
      <h2>跨层通信（context API）-微信朋友圈</h2>
      <button onClick={handleTheme}>切换主题</button>
      <hr />
      <ThemeContext.Provider value={theme}>
        <ToolBar />
      </ThemeContext.Provider>
    </div>
  );
};
function ToolBar() {
  return <ThemeButton></ThemeButton>;
}
function ThemeButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme === "dark" ? "#333" : "#eee" }}>
      按钮
    </button>
  );
}
export default Context;
