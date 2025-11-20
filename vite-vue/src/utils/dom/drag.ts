import type { UseDragOptions } from "@/composables";
import type { Ref } from "vue";
export type DragState = {
  isDragging: boolean;
  offsetX: number;
  offsetY: number;
  downRect: DOMRect | null;
}
export type DragDom = Ref<HTMLDivElement | null>;
// 鼠标按下：开始拖拽
export const handleMouseDown = (e: MouseEvent, target: DragDom, dragState: DragState) => {
  if (!target.value) return;
  
  dragState.isDragging = true;
  const rect = target.value.getBoundingClientRect();
  dragState.offsetX = e.clientX - rect.left;
  dragState.offsetY = e.clientY - rect.top;
  dragState.downRect = rect;

  // 可选：添加临时样式反馈
  target.value.style.cursor = 'grabbing';
};


// 鼠标移动：更新位置
export const handleMouseMove = (e: MouseEvent, target: DragDom, dragState: DragState) => {
  if (!dragState.isDragging || !target.value) return;

  let x = e.clientX - dragState.offsetX;
  let y = e.clientY - dragState.offsetY;

  // 边界限制：不能拖出视口
  const maxX = window.innerWidth - target.value.offsetWidth;
  const maxY = window.innerHeight - target.value.offsetHeight;
  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  target.value.style.left = `${x}px`;
  target.value.style.top = `${y}px`;
};


// 鼠标松开：结束拖拽
export const handleMouseUp = (target: DragDom, dragState: DragState) => {
  dragState.isDragging = false;
  if (target.value) {
    target.value.style.cursor = 'grab';
  }
};

/**
   * 文档指针按下事件处理函数
   * @param e 指针事件
   */  
export const onDocumentPointerDown = (e: PointerEvent | MouseEvent, target: DragDom,options: UseDragOptions) => {
  if (!target.value) return;
  const targetNode = e.target as Node;
  if (!target.value.contains(targetNode)) { 
    options?.onOutsideClick?.(e);
  }
};