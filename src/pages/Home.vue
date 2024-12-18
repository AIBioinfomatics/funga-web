<script lang="ts" setup>
import Header from "../components/index/Header.vue";

</script>
<template>
  <Header id="index"></Header>
</template>
<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}
.text{
  font-size: 40px;
  font-family: 'Microsoft YaHei',serif;
}
.box{
  margin: 20px;
}
.notice{
  border-style: solid;
  border-radius: 20px;
  border-color: darkgrey;
  width: fit-content;
  margin: 15px auto 0 auto;
}
</style>