<script setup lang="ts">
function openURL(href:string){
  window.open(href,'_blank');
}
</script>

<template>
  <el-card id="footer" shadow="hover" align="center">
    <el-text >2023 - 2024 © Changchun Revo Technology - </el-text>
    <el-text style="cursor: pointer" @click="openURL('https://beian.miit.gov.cn/')">吉ICP备2024010699号-1</el-text>
  </el-card>
</template>

<style scoped>
#footer {
  height: fit-content;
}
</style>