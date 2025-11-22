<script setup lang="ts">
import { ref } from 'vue';
import { usePromise } from '@/composables';
// 模拟 API
const getDataApi = () => new Promise<string>((resolve) => 
  setTimeout(() => resolve('Hello World'), 1000)
);

// 业务数据
const data = ref<string | null>(null);
// 使用 usePromise
// 注意：这里修正了您的写法，Composition API 中不使用 this.data，而是 data.value
const [load, loadState] = usePromise(async () => {
  // 用户在这里手动控制数据赋值逻辑
  const res = await getDataApi();
  data.value = res; 
});
 
</script>

<template>
  <div>
    <p>当前状态: {{ loadState }}</p>
    
    <button @click="() => load()" :disabled="loadState === 'pending'">
      {{ loadState === 'pending' ? '加载中...' : '点击加载' }}
    </button>

    <div v-if="data">结果: {{ data }}</div>
  </div>
</template>
