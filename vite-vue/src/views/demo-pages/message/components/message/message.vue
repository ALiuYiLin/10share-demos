<script lang="ts" setup>
import { onMounted, useTemplateRef} from 'vue';
import { messagePropsOptions } from './message';
const messageEl = useTemplateRef<HTMLDivElement>('messageEl')


const props = defineProps(messagePropsOptions)



function closeMessage() {
  messageEl!.value!.style.opacity = '0'
  setTimeout(()=>{
    messageEl!.value!.remove()
  },600)
}

function close(){
  if(props.onClose){
    props.onClose(messageEl!.value!)
  }
  else closeMessage()
}

onMounted(()=>{
  if(props.duration > 0) setTimeout(()=>{
    close()
  },props.duration)
})


</script>
<template>
  <div class="message" ref="messageEl">
    <p>{{ props.content }}</p>
    <span @click="closeMessage">&times;</span>
  </div>
</template>
<style>
#my-messages {
  display: flex;
  flex-direction: column;
  gap: 10px;

  position: fixed;
  left: 50%;
  transform: translateX(-50%);
}

</style>
<style scoped>
.message {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  border: 1px solid green;
  border-radius: 5px;

  background-color: green;
  color: white;
  padding: 11px 15px;

  font-size: 14px;

}

.message > p {
  line-height: 1px;
  margin: 0;
}
.message span {
  cursor: pointer;
}
.message span:hover {
  color: black;
}
</style>