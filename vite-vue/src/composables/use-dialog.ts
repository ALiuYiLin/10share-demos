import DialogWrapper from "@/components/dialog-wrapper.vue";
import { createVNode, getCurrentInstance, render, type Component } from "vue";



// 1. 定义一个构造器类型，用于匹配 .vue 导入的组件
type ComponentConstructor = abstract new (...args: any) => any;

// 2. 提取组件 Props 的工具类型
// Omit 掉 Vue 内部保留的 props (如 key, ref, class, style 等)
type GetProps<T extends ComponentConstructor> = Omit<
  InstanceType<T>['$props'],
  'key' | 'ref' | 'ref_for' | 'ref_key' | 'class' | 'style'
>;

interface DialogOptions<T extends ComponentConstructor> {
  props?: GetProps<T>;
  title?: string;
  onConfirm?: (data: any) => void;
  onCancel?: () => void;
}



export function useDialog<T extends ComponentConstructor>(component: T, options?: DialogOptions<T>) {
  const container = document.createElement("div");

  const instance = getCurrentInstance();

  const vNode = createVNode(DialogWrapper, {
    component,
    ...(options as any),
  });

  if(instance){
    vNode.appContext = instance.appContext;
  }
  render(vNode,container);

  document.body.appendChild(container);

  const destroy = () => {
    render(null,container);
    document.body.removeChild(container);
  }

  return {
    open: () => {
      vNode.component?.exposed?.open?.();
    },
    close: () => {
      vNode.component?.exposed?.close?.();
    },
    destroy,
  }

}
