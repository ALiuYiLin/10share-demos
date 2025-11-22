<template>
  <div>
    <h1>useDialog 演示</h1>
    <button @click="handleOpen">打开弹窗</button>
  </div>
</template>

<script setup lang="ts">
import { useDialog } from '@/composables/use-dialog';
import Form from './form.vue'; // 引入上面的表单组件

// 初始化 Dialog
const dialog = useDialog(Form, {
  title: '编辑用户信息',
  
  // 传递给 Form.vue 的 props
  props: {
    initialName: 'Gemini',
    title: '编辑用户信息',
  },
  
  // 监听 Form.vue 的 confirm 事件
  onConfirm: (data) => {
    console.log('表单提交的数据:', data);
  },
  
  // 监听取消
  onCancel: () => {
    console.log('用户取消了');
  }
});

const handleOpen = () => {
  dialog.open();
};
</script>