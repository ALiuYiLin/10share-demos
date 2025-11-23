const DemoProps = () => {
  return (
    <div className="demo-props">
      <h1>父组件像子组件传值（Props）</h1>
      <Parent></Parent>
    </div>
  );
};
function Parent() {
  const message = "hello from parent";
  return <Child message={message}></Child>;
}

function Child({ message }: { message: string }) {
  return <h1>{message}</h1>;
}

export default DemoProps;
