<script setup>
import { Chat } from "@chat-ui/vue3";
import {reactive} from "vue";
import {search} from "../tools/index.ts";
let histories = reactive([{ message: '欢迎使用FUNGA小助手', type: 'chatbot' }])
function handleMessage(message){
  histories.push({
    message: message,
    type: "person"
  })
  histories.push({
    message: "···",
    type: "chatbot"
  })
  search.chat(message,histories,function (){

  })
}
</script>
<template>
  <Chat height="100%" width="100%" :chat="histories" :onSend="handleMessage" />
</template>
<style scoped>

</style>