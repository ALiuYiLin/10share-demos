<template>
  <tr>
    <td><p :style="{ paddingLeft: `${level * 20}px` }">{{ info.label }}</p></td>
    <td></td>
    <td>
      <template v-if="isLeafParent">
        <div class="perm-list" >
          <template v-for="item in info.children" :key="item.value">
            <input type="checkbox"  name="perm" :value="item.value" v-model="leafSelected" ></input>
            <label for="perm">{{ item.label }}</label>
          </template>
        </div>
      </template>
    </td>
  </tr>
  <template v-if="!isLeafParent">
    <perm v-for="item in info.children" :key="item.value" :info="item" v-model="leafSelected" :level="level + 1" :parent="info"></perm>
  </template>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { PermInfo } from './info';
import type { PermKey } from './config';
import { normalizePermKeys } from './info';
interface Props {
  info: PermInfo,
  modelValue: PermKey[]
  level: number
  parent?: PermInfo
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
    return normalizePermKeys(props.modelValue)
  },
  set(val){
    // 如果父节点存在子节点value在val中，且val中不包含父节点value，
    // 则将父节点value添加到val中
    // 否则，去除val中的父节点value
    emit('update:modelValue',normalizePermKeys(val))
  }
})
</script>

<style scoped>
.perm {
  border: 1px solid black;
}
.perm-list {
  display: flex;
  flex-direction: row;
}
tr:hover {
  background-color: #f0f0f0;
}
tr td {
  white-space: nowrap;
}
</style>