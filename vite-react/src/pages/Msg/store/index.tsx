import {create} from 'zustand'
const useStore = create((set) => ({
  count: 0,
  increment: ()=> set((state: { count: number }) => ({count: state.count + 1}))
}))

const Store = ()=>{
  return (
    <div>
      <h1>全局状态管理-zustand</h1>
      <Counter></Counter>
    </div>
  )
}

function Counter() {
  const {count, increment} = useStore() as {count:number,increment:()=>void}
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+++</button>
    </div>
  )
}

export default Store