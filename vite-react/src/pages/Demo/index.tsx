import { Outlet } from "react-router-dom"
const Demo = ()=>{
  return (
    <div className="demo-page">
      <h1>组件通信方式demo</h1>
      <Outlet></Outlet>
    </div>
  )
}

export default Demo