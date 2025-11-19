<script setup lang="ts">
import { useDrag } from '@/composables';
import { type DragState } from '@/utils';
import { ref, onMounted, onUnmounted } from 'vue';

const ballRef = ref<HTMLDivElement | null>(null);
const dragState: DragState = {
  isDragging: false,
  offsetX: 0,
  offsetY: 0,
}

const showMenu = ref(false);


const dragComposable = useDrag(ballRef, dragState);
// 绑定全局事件
onMounted(() => {
  document.addEventListener('mousemove', dragComposable.handleMouseMove);
  document.addEventListener('mouseup', dragComposable.handleMouseUp);
});
// 解绑全局事件
onUnmounted(() => {
  document.removeEventListener('mousemove', dragComposable.handleMouseMove);  
  document.removeEventListener('mouseup', dragComposable.handleMouseUp);
});

</script>
<template>
  <div
    ref="ballRef"
    class="floating-ball"
    @mousedown="dragComposable.handleMouseDown"
  >
    +
  </div>
</template>
<style scoped>
.floating-ball {
  position: fixed;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: grab;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  user-select: none;

  /* 初始位置（可选） 改为右下角 */
  right: 10%;
  bottom: 40%;
}

</style>