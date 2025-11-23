import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

const Context = () => {
  return (
    <div>
      <h2>跨层通信（context API）-微信朋友圈</h2>
      <ThemeContext.Provider value="dark">
        <ToolBar />
      </ThemeContext.Provider>
    </div>
  );
};

function ToolBar() {
  return <ThemeButton />;
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
