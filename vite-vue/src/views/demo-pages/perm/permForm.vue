<template>
  <div class="role-form">
    <perm v-for="item in INFOS" :key="item.value" :info="item" v-model="keys"></perm>
  </div>
  <div>
    <button>添加</button>
    <button>修改</button>
  </div>
      <table>
        <colgroup>
          <col> <!-- 第一列：默认 auto，随内容撑开 -->
          <col style="width: 100%;"> <!-- 中间列：占剩余空间 -->
          <col> <!-- 第三列：默认 auto，随内容撑开 -->
        </colgroup>  
      <thead>
        <tr>
          <th>1</th>
          <th>2</th>
          <th>3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>1111</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </tbody>
    </table>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { PermKey } from './config';
import { INFOS } from './info';
import perm from './perm.vue';
interface Props {
  rolePermKeys: PermKey[]
}
const props = defineProps<Props>()
const keys = ref<PermKey[]>([...props.rolePermKeys])
console.log('keys: ', keys);
watch(keys,(val)=>{
  console.log('val: ', val);
})  

</script>

<style scoped>
.role-form {
  max-width: 1000px;
  margin-top: 100px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  border: 1px solid black;
}
table {
  border-collapse: collapse;
}
table tr {
  position: relative;
}
table tr::before {
  content: "";
  position: absolute;
  left: 20px;
  right: 0;
  width: calc(100% - 20px);
  height: 100%;
  /* z-index: 99; */
  z-index: -1;
}

table tr:hover::before {
  background-color: gray;
}
</style>