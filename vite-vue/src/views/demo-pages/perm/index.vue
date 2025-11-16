<template>
  <div class="perm-page">
    <!-- {{ INFOS }} -->
      <ul>
        <li v-for="perm in myPerms" :key="perm">{{  perm  }}</li>
      </ul>
      <PermFrom :role-perm-keys="myPerms"></PermFrom>
  </div>
</template>

<script lang="ts" setup>
import type { PermKey } from './config';
import PermFrom  from './permForm.vue';
// import { INFOS } from './info';
const myPerms = [
  'cert_base',
  'cert_read'
] as PermKey[]

</script>

<style scoped>
.perm-page{
  display: flex;
  flex-direction: column;
}
</style>