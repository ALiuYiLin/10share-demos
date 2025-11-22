<script lang="ts" setup>
import { ref, type Component } from "vue";

interface Props {
  component: Component;
  props: Record<string, any>;
  title?: string;
  onConfirm?: (data: any) => void;
  onCancel?: () => void;
}

const props = defineProps<Props>();

const visible = ref(false);

const open = () => {
  visible.value = true;
};

const handleClose = () => {
  visible.value = false;
  props.onCancel?.();
};

const handleConfirm = (data: any) => {
  props.onConfirm?.(data);
  visible.value = false;
};

defineExpose({
  open,
  close: handleClose,
});
</script>
<template>
  <Transition name="dialog-fade">
    <div v-if="visible" class="dialog-overlay" @click.self="handleClose">
      <div class="dialog-content">
        <div v-if="title" class="dialog-header">
          <h3>{{ title }}</h3>
          <span class="close-btn" @click="handleClose"></span>
        </div>
        <component
          :is="component"
          v-bind="props.props"
          @close="handleClose"
          @confirm="handleConfirm"
        >
        </component>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
/* 简单写一点样式，实际项目中可以用 ElementUI/AntD 的样式类 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.dialog-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.close-btn {
  cursor: pointer;
  font-size: 20px;
}

/* 动画 */
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.3s;
}
.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>
