const MsgProps = () => {
  return (
    <div className="msg-props">
      <h2>父组件向子组件传值（Props）</h2>
      <Parent></Parent>
    </div>
  );
};

function Parent() {
  const message = "hello from parent";
  return <Child message={message}></Child>;
}

function Child(props: { message: string }) {
  return <p>{props.message}</p>;
}

export default MsgProps;
