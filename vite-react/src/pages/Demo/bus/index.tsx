// 创建事件发射器
import { EventEmitter } from "events";
import { useEffect, useState } from "react";

const emitter = new EventEmitter();

const Bus = () => {
  return (
    <div>
      <h2>事件总线</h2>
      <ComponentA />
      <ComponentB />
    </div>
  );
};

// A组件中触发事件
function ComponentA() {
  return (
    <button onClick={() => emitter.emit("message", "A: hello component B")}>
      触发事件：像B组件传递消息
    </button>
  );
}

// B组件中接收消息
function ComponentB() {
  const [msg, setMsg] = useState("waiting msg");
  // 避免重复注册监听事件
  useEffect(() => {
    const hanlderEvent = (message: string) => {
      console.log(message);
      setMsg(message);
    };
    emitter.on("message", hanlderEvent);

    return () => {
      // 卸载组件时移除
      emitter.off("message", hanlderEvent);
    };
  }, []);
  return <p>{msg}</p>;
}

export default Bus;
