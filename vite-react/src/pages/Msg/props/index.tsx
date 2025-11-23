const MsgProps = () => {
  return (
    <div className="msg-props">
      <h2>父组件像子组件传值（Props）</h2>
      <Parent></Parent>
    </div>
  );
};
function Parent() {
  const message = "hello from parent";
  return <Child message={message}></Child>;
}

function Child({ message }: { message: string }) {
  return <p>{message}</p>;
}

export default MsgProps;
