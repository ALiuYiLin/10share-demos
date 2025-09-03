<script lang="ts" setup>
import { routerPush, routes } from '@/router';

</script>
<template>
  <div>
    <ul>
      <li v-for="route in routes" :key="route.name" @click="routerPush(route.path)">{{ route.name }}</li>
    </ul>
  </div>
</template>