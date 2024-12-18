<script setup lang="ts">
import TopMenu from "./components/TopMenu.vue";
import Footer from "./components/Footer.vue";
</script>

<template style="">
  <el-container id="main">
    <el-header>
      <TopMenu></TopMenu>
    </el-header>
    <el-main>
      <RouterView></RouterView>
    </el-main>
    <el-footer>
      <Footer/>
    </el-footer>
  </el-container>
</template>

<style scoped>
  .el-container {
    background: transparent;
    min-height: 95vh;
  }
  #sidebar {
    background: red;
  }
</style>
