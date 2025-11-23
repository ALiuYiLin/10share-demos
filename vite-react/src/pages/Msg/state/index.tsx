import { useState } from "react"

const State = ()=> {
  return (
    <div>
      <h2>兄弟组件通信（状态提升）-找共同好友帮忙传话</h2>
      <Parent></Parent>
    </div>
  )
}


function SiblingA({data}:{data:string}){
  return (
    <p>{data}</p>
  )
}

function SiblingB({onUpdateData}:{onUpdateData:(data: string)=> void}){
  return (
    <button onClick={()=>onUpdateData('123')}>update data</button>
  )
}


function Parent() {
  const [sharedData, setSharedData] = useState('Initial Data')

  return (
    <div>
      <SiblingA data={sharedData}></SiblingA>
      <SiblingB onUpdateData={(val)=>setSharedData(val)}></SiblingB>
    </div>
  )
}

export default State

