<script setup lang="ts">
import { useDrag } from '@/composables';
import { type DragState } from '@/utils';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import BallMenu from './ball-menu.vue';
import { MENUS } from '@/router/menu';
type MenuItem = { label: string; key: string };
import { router} from '@/router';
const ballRef = ref<HTMLDivElement | null>(null);
const dragState: DragState = {
  isDragging: false,
  offsetX: 0,
  offsetY: 0,
  downRect: null,
};

const showMenu = ref(false);

const props = defineProps<{ items?: MenuItem[] }>();
const emit = defineEmits<{ (e: 'select', key: string): void }>();
const defaultItems: MenuItem[] = MENUS;
const menuItems = computed(() => props.items ?? defaultItems);

const dragComposable = useDrag(ballRef, dragState, {
  onClick: () => {
    showMenu.value = !showMenu.value;
  },
  onOutsideClick: () => {
    showMenu.value = false;
  },
  threshold: 10,
});


const onDocumentPointerDown = (e: PointerEvent | MouseEvent) => {
  if (!ballRef.value) return;
  const target = e.target as Node;
  if (!ballRef.value.contains(target)) {
    showMenu.value = false;
  }
};



const onSelect = (key: string) => {
  router.push({ path: key });
  console.log('key: ', key);
  emit('select', key);
  showMenu.value = false;
};

// 绑定全局事件
onMounted(() => {
  document.addEventListener('mousemove', dragComposable.handleMouseMove);
  document.addEventListener('mouseup', dragComposable.handleMouseUp);
  document.addEventListener('pointerdown', onDocumentPointerDown);
});
// 解绑全局事件
onUnmounted(() => {
  document.removeEventListener('mousemove', dragComposable.handleMouseMove);
  document.removeEventListener('mouseup', dragComposable.handleMouseUp);
  document.removeEventListener('pointerdown', onDocumentPointerDown);
});

</script>
<template>
  <div
    ref="ballRef"
    class="floating-ball"
    @mousedown="dragComposable.handleMouseDown"
  >
    +
    <Transition name="ball-menu">
      <BallMenu
        v-show="showMenu"
        :menuItems="menuItems"
        @select="(key) => onSelect(key)"
      />
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

</style>