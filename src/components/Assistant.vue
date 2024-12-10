<script setup>
import { Chat } from "@chat-ui/vue3";
import {reactive} from "vue";
import {search} from "../tools/index.ts";
import {lang} from "../lang/index.ts";
let histories = reactive([{ message: lang.display["components"]["Assistant"]["message"], type: 'chatbot' }])
function handleMessage(message){
  histories.push({
    message: message,
    type: "person"
  })
  histories.push({
    message: "···",
    type: "chatbot"
  })
  if (message === "/clear"){
    histories.length = 0
    return
  }
  search.chat(message,histories,function (){

  })
}
</script>
<template>
  <Chat height="100%" width="100%" :chat="histories" :onSend="handleMessage" />
</template>
<style scoped>

</style>