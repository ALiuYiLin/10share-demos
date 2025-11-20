<script setup lang="ts">
import { useDrag } from '@/composables';
import { type DragState } from '@/utils';
import { ref, onMounted, onUnmounted, computed } from 'vue';

type MenuItem = { label: string; key: string };

const ballRef = ref<HTMLDivElement | null>(null);
const dragState: DragState = {
  isDragging: false,
  offsetX: 0,
  offsetY: 0,
};

const showMenu = ref(false);
let downRect: DOMRect | null = null;

const props = defineProps<{ items?: MenuItem[] }>();
const emit = defineEmits<{ (e: 'select', key: string): void }>();
const defaultItems: MenuItem[] = [
  { label: '首页', key: 'home' },
  { label: '设置', key: 'settings' },
  { label: '帮助', key: 'help' },
];
const menuItems = computed(() => props.items ?? defaultItems);

const dragComposable = useDrag(ballRef, dragState);

const onMouseDown = (e: MouseEvent) => {
  if (ballRef.value) {
    downRect = ballRef.value.getBoundingClientRect();
  }
  dragComposable.handleMouseDown(e);
};

const onMouseUp = () => {
  dragComposable.handleMouseUp();
  if (!ballRef.value || !downRect) {
    showMenu.value = !showMenu.value;
    return;
  }
  const rect = ballRef.value.getBoundingClientRect();
  const dx = Math.abs(rect.left - downRect.left);
  const dy = Math.abs(rect.top - downRect.top);
  const moved = dx > 3 || dy > 3;
  if (!moved) showMenu.value = !showMenu.value;
};

const onDocumentPointerDown = (e: PointerEvent | MouseEvent) => {
  if (!ballRef.value) return;
  const target = e.target as Node;
  if (!ballRef.value.contains(target)) {
    showMenu.value = false;
  }
};

const onSelect = (key: string) => {
  emit('select', key);
  showMenu.value = false;
};

// 绑定全局事件
onMounted(() => {
  document.addEventListener('mousemove', dragComposable.handleMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('pointerdown', onDocumentPointerDown);
});
// 解绑全局事件
onUnmounted(() => {
  document.removeEventListener('mousemove', dragComposable.handleMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  document.removeEventListener('pointerdown', onDocumentPointerDown);
});

</script>
<template>
  <div
    ref="ballRef"
    class="floating-ball"
    @mousedown="onMouseDown"
  >
    +
    <Transition name="ball-menu">
      <div v-if="showMenu" class="ball-menu">
        <button
          v-for="item in menuItems"
          :key="item.key"
          class="ball-menu-item"
          @click="onSelect(item.key)"
        >
          {{ item.label }}
        </button>
      </div>
    </Transition>
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

.ball-menu {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translate(8px, -50%);
  min-width: 140px;
  background: #fff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  padding: 8px;
}

.ball-menu-item {
  display: block;
  width: 100%;
  background: transparent;
  border: none;
  text-align: left;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.ball-menu-item:hover {
  background: rgba(0, 123, 255, 0.08);
}

.ball-menu-enter-active,
.ball-menu-leave-active {
  transition: all 0.15s ease;
}

.ball-menu-enter-from,
.ball-menu-leave-to {
  opacity: 0;
  transform: translate(8px, -50%) scale(0.96);
}

</style>