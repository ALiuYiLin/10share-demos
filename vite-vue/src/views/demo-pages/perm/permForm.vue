<template>
  <table>
    <colgroup>
      <col />
      <!-- 第一列：默认 auto，随内容撑开 -->
      <col style="width: 100%" />
      <!-- 中间列：占剩余空间 -->
      <col />
      <!-- 第三列：默认 auto，随内容撑开 -->
    </colgroup>
    <tbody>
      <perm
        v-for="item in INFOS"
        :key="item.value"
        :info="item"
        v-model="keys"
        :level="0"
      ></perm>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import type { PermKey } from "./config";
import { INFOS } from "./info";
import perm from "./perm.vue";
interface Props {
  rolePermKeys: PermKey[];
}
const props = defineProps<Props>();
const keys = ref<PermKey[]>([...props.rolePermKeys]);
console.log("keys: ", keys);
watch(keys, (val) => {
  console.log("val: ", val);
});
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 800px;
}
table tr {
  position: relative;
}
</style>
