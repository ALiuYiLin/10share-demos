import type { DragDom, DragState } from "@/utils";
import { handleMouseDown, handleMouseMove, handleMouseUp } from "@/utils";


export const useDrag = (target: DragDom, dragState: DragState) => {
  const targetRef = target;
  const targetStateRef = dragState;
  return {
    handleMouseDown:(e: MouseEvent) => handleMouseDown(e, targetRef, targetStateRef),
    handleMouseMove:(e: MouseEvent) => handleMouseMove(e, targetRef, targetStateRef),
    handleMouseUp:() => handleMouseUp(targetRef, targetStateRef)  
  }
}