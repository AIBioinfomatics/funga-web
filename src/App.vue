<script setup lang="ts">
import TopMenu from "./components/TopMenu.vue";
import Footer from "./components/Footer.vue";
import Title from "./components/Title.vue";
</script>

<template>
  <el-container id="main">
    <el-header>
      <TopMenu></TopMenu>
    </el-header>
    <el-main>
      <Title></Title>
      <RouterView></RouterView>
    </el-main>
    <el-footer>
      <Footer/>
    </el-footer>
  </el-container>
</template>

<style scoped>
  .el-container {
    min-height: 98vh;
  }
  #sidebar {
    background: red;
  }
</style>
