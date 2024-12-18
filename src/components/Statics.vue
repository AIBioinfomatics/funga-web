<script setup lang="ts">
let attr = defineProps(["title","content"])
</script>

<template>
  <span class="statics_title">{{ attr.title }}</span><br>
  <p v-if='attr.content != null' class="statics_content">{{ attr.content }}</p>
  <slot name="default" v-else></slot>
</template>

<style scoped>
.statics_title{
  font-size: 13px;
  background: transparent;
  color: #f2eada;
  text-align: justify;
  text-align-last: justify;
  text-shadow: 1px 1px 4px black;
}
.statics_content{
  font-size: 30px;
  background: transparent;
  color: #f2eada;
  margin-top: 10px;
}
</style>