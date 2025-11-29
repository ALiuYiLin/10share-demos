const CallBack = () => {
  return (
    <div>
      <h2>子组件向父组件传值</h2>
      <Parent></Parent>
    </div>
  );
};

function Parent() {
  const handleChildData = (data: string) => {
    console.log("data from child:", data);
  };
  return <Child onSendData={handleChildData}></Child>;
}

function Child({ onSendData }: { onSendData: (data: string) => void }) {
  return (
    <button onClick={() => onSendData("hello from 'child")}>send data</button>
  );
}

export default CallBack;
