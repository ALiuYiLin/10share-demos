import { ref, type Ref } from "vue";


export type PromiseStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';

type UsePromiseReturn<Args extends any[]> = [
  (...args: Args) => Promise<void>,
  Ref<PromiseStatus>
]

export function usePromise<Args extends any[]>(
  fn: (...args: Args) => Promise<any>
): UsePromiseReturn<Args> {
  // 定义状态 ref
  const status = ref<PromiseStatus>('idle')
  const load = async (...args: Args) => {
    status.value = 'pending'
    try {
      await fn(...args)
      status.value = 'fulfilled'
    } catch(error) {
      status.value = 'rejected'
      throw error
    }
  }
  return [load, status]
}



