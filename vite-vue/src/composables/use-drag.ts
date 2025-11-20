import type { DragDom, DragState } from "@/utils";
import { handleMouseDown, handleMouseMove, handleMouseUp } from "@/utils";
import { ref } from "vue";

export interface UseDragOptions {
  onClick?: () => void;
  onOutsideClick?: (e: PointerEvent | MouseEvent) => void;
  threshold?: number;
}

export const useDrag = (
  target: DragDom,
  dragState: DragState,
  options?: UseDragOptions
) => {
  const targetRef = target;
  const targetStateRef = dragState;
  const downRect = ref<DOMRect | null>(null);
  const threshold = options?.threshold ?? 3;

  const onMouseDown = (e: MouseEvent) => {
    if (targetRef.value) {
      downRect.value = targetRef.value.getBoundingClientRect();
    }
    handleMouseDown(e, targetRef, targetStateRef);
  };

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

  const onDocumentPointerDown = (e: PointerEvent | MouseEvent) => {
    if (!targetRef.value) return;
    const target = e.target as Node;
    if (!targetRef.value.contains(target)) {
      options?.onOutsideClick?.(e);
    }
  };

  return {
    handleMouseDown: onMouseDown,
    handleMouseMove: (e: MouseEvent) => handleMouseMove(e, targetRef, targetStateRef),
    handleMouseUp: onMouseUp,
    onDocumentPointerDown,
  };
};