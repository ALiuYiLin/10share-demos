
const CallBack = ()=>{
  return (
    <div>
      <h1>子组件向父组件传值</h1>
      <Parent></Parent>
    </div>
  )
}

function Parent() {
  const handleChildData = (data: string) => {
    console.log("data from child:", data);
  }
  return <Child onSendData={handleChildData}></Child>
}

function Child({onSendData}:{onSendData:(data: string)=> void}){
  const sendData = ()=>{
    onSendData("hello from 'child")
  }
  return <button onClick={sendData}>send data</button>
}

export default CallBack