<script lang="ts" setup>
import { message } from './components/message';

let i = 1

function addMessage(){
  message(`hello msg${i++}`)
}

</script>
<template>
  <div class="message-demo">
    <button @click="addMessage">addMessage</button>
  </div>
</template>