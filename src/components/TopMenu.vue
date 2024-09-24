<script setup lang="ts">
import ThemeToggleButton from "./ThemeToggleButton.vue";
import router from "../router";
import {ref} from "vue";
const drawer = ref(false)

const handleSelect = (key: string) => {
  if (key == "logo"){
    router.push({path:"/home"})
  }
  if (key == "logo2"){
    router.push({path:"/home"})
  }
  if (key == "home"){
    router.push({path:"/home"})
  }
  if (key == "gene"){
    router.push({path:"/gene"})
  }
  if (key == "gene-gene"){
    router.push("/gene-gene")
  }
  if (key == "phenotype"){
    router.push({path:"/phenotype"})
  }
  if (key == "gene-phenotype"){
    router.push({path:"/gene-phenotype"})
  }
  if (key == "tools"){
    router.push({path:"/tools"})
  }
  if (key == "llm"){
    drawer.value = true
  }
}
let active = window.location.href.split("/")[3]
if (active.length == 0){
  active = "home"
}
</script>

<template>
  <el-menu
      mode="horizontal"
      :ellipsis="false"
      :collapse-transition="true"
      @select="handleSelect"
      class="nav"
      :default-active="active"
  >
    <!---
    <el-menu-item index="logo" >
      <img
          style="width: 150px"
          src="/src/assets/logo.png"
          alt="LOGO2"
      />
    </el-menu-item>
    --->
    <el-menu-item index="logo2" >
      <img
          style="width: 200px"
          src="/src/assets/title.png"
          alt="LOGO"
      />
    </el-menu-item>
    <el-menu-item index="home">
      Home
    </el-menu-item>
    <el-menu-item index="gene">
      Gene
    </el-menu-item>
    <el-menu-item index="gene-gene">
      Gene-Gene
    </el-menu-item>
    <el-menu-item index="phenotype">
      Phenotype
    </el-menu-item>
    <el-menu-item index="gene-phenotype">
      Gene-Phenotype
    </el-menu-item>
    <el-menu-item index="tools">
      Tools
    </el-menu-item>
    <el-menu-item index="llm">
      Assistant
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="theme"><ThemeToggleButton/></el-menu-item>
    <el-sub-menu index="2">
      <template #title>欢迎, Liu HX</template>
      <div v-loading="true">
        <el-menu-item index="2-1">个人设置</el-menu-item>
        <el-menu-item index="2-2">余额：5000.00 CNY</el-menu-item>
        <el-menu-item index="2-3">权限：VIP</el-menu-item>
      </div>
    </el-sub-menu>
  </el-menu>
  <el-drawer v-model="drawer" direction="rtl">
    <template #header>
      <h4>有什么需要提问的吗？</h4>
    </template>
    <template  #default>
      <el-row>

      </el-row>
    </template>
  </el-drawer>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.el-menu-item {
  background-color: transparent !important;
  border-bottom-color: transparent !important;
}
</style>