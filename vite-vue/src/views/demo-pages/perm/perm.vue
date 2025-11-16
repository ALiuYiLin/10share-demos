<template>
  <div class="perm">{{ info.label }}</div>
  <div class="perm"></div>
  <div class="perm">
    <template v-if="isLeafParent">
      <template v-for="item in info.children" :key="item.value">
        <input type="checkbox"  name="perm" :value="item.value" v-model="leafSelected" ></input>
        <label for="perm">{{ item.label }}</label>
      </template>
    </template>
  </div>
  <template v-if="!isLeafParent">
    <perm v-for="item in info.children" :key="item.value" :info="item" v-model="leafSelected" ></perm>
  </template>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { PermInfo } from './info';
import type { PermKey } from './config';
interface Props {
  info: PermInfo,
  modelValue: PermKey[]
}
type Emits = {
  (e: 'update:modelValue', value: PermKey[]): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const isLeafParent = computed(()=>{
  const children = props.info.children
  if(!children || children.length === 0) return false
  return children.every(child => !child.children || child.children.length === 0)
})

const leafSelected = computed({
  get() {
    return props.modelValue
  },
  set(val){
    emit('update:modelValue',val)
  }
})
</script>

<style scoped>
.perm {
  border: 1px solid black;
}


</style>