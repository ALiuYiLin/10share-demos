<script lang="ts" setup>
import { currentPageTitle } from './router';

</script>
<template>
  <div>
    <h1>{{ currentPageTitle() }}</h1>
    <RouterView></RouterView>
  </div>
</template>

