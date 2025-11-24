import { Outlet } from "react-router-dom"
const Msg = ()=>{
  return (
    <div className="msg-page">
      <h1>组件通信方式</h1>
      <Outlet></Outlet>
    </div>
  )
}

export default Msg