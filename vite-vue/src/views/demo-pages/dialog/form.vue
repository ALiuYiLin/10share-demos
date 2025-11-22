<template>
  <div>
    <p>这是一个动态表单内容</p>
    <p>{{ title }}</p>
    <input v-model="formData" placeholder="请输入..." style="border:1px solid #ccc; padding: 5px;" />
    
    
    <div style="margin-top: 20px; text-align: right;">
      <button @click="cancel">取消</button>
      <button @click="submit" style="margin-left: 10px;">提交</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['close', 'confirm']);

// 接收外部传来的初始值
const props = defineProps<{ initialName?: string, title: string }>();

const formData = ref(props.initialName || '');

const cancel = () => {
  emit('close'); // 触发关闭
};

const submit = () => {
  // 触发确认，并把数据传出去
  console.log('formData.value: ', formData.value);
  emit('confirm', formData.value);
};
</script>