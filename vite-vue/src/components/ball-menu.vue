<script lang="ts" setup>
interface Props {
  menuItems: {
    key: string;
    label: string;
  }[];
}
defineProps<Props>()
defineEmits<{
  (e: 'select', key: string): void;
}>()
</script>
<template>
  <div class="ball-menu">
        <button
          v-for="item in menuItems"
          :key="item.key"
          class="ball-menu-item"
          @click="$emit('select', item.key)"
        >
          {{ item.label }}
        </button>
      </div>
</template>

<style scoped>
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