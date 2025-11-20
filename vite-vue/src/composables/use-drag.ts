import type { DragDom, DragState } from "@/utils";
import { handleMouseDown, handleMouseMove, handleMouseUp } from "@/utils";
import { ref } from "vue";

/**
 * 拖拽组合式函数选项
 * @param onClick 点击触发
 * @param onOutsideClick 点击外部触发
 * @param threshold 触发点击的阈值
 */
export interface UseDragOptions {
  onClick?: () => void; 
  onOutsideClick?: (e: PointerEvent | MouseEvent) => void; 
  threshold?: number;
}

/**
 * 拖拽组合式函数
 * @param target 拖拽目标元素
 * @param dragState 拖拽状态
 * @param options 拖拽选项
 * @returns 拖拽事件处理函数
 */
export const useDrag = (
  target: DragDom,
  dragState: DragState,
  options?: UseDragOptions
) => {
  const targetRef = target;
  const targetStateRef = dragState;
  const downRect = ref<DOMRect | null>(null);
  // 点击阈值，默认3px
  const threshold = options?.threshold ?? 3;

  /**
   * 鼠标松开事件处理函数
   */
  const onMouseUp = () => {
    handleMouseUp(targetRef, targetStateRef);
    if (!targetRef.value || !downRect.value) {
      options?.onClick?.();
      return;
    }
    const rect = targetRef.value.getBoundingClientRect();
    const dx = Math.abs(rect.left - downRect.value.left);
    const dy = Math.abs(rect.top - downRect.value.top);
    const moved = dx > threshold || dy > threshold;
    if (!moved) {
      options?.onClick?.();
    }
  };

  /**
   * 文档指针按下事件处理函数
   * @param e 指针事件
   */
  const onDocumentPointerDown = (e: PointerEvent | MouseEvent) => {
    if (!targetRef.value) return;
    const target = e.target as Node;
    if (!targetRef.value.contains(target)) {
      options?.onOutsideClick?.(e);
    }
  };
  return {
    handleMouseDown: (e: MouseEvent) => handleMouseDown(e, targetRef, targetStateRef),
    handleMouseMove: (e: MouseEvent) => handleMouseMove(e, targetRef, targetStateRef),
    handleMouseUp: onMouseUp,
    onDocumentPointerDown,
  };
};