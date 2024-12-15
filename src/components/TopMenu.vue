<script setup lang="ts">
import ThemeToggleButton from "./ThemeToggleButton.vue";
import router from "../router";
import {ref} from "vue";
import Assistant from "./Assistant.vue";
import {lang, language} from "../lang";
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
  if (key == "transfer"){
    router.push({path:"/transfer"})
  }
  if (key == "pos"){
    router.push({path:"/phenotype-ontology-selector"})
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
      {{ lang.display.components.TopMenu.home }}
    </el-menu-item>
    <el-menu-item index="gene">
      {{ lang.display.components.TopMenu.gene }}
    </el-menu-item>
    <el-menu-item index="gene-gene">
      {{ lang.display.components.TopMenu.gene_gene }}
    </el-menu-item>
    <el-menu-item index="phenotype">
      {{ lang.display.components.TopMenu.phenotype }}
    </el-menu-item>
    <el-menu-item index="gene-phenotype">
      {{ lang.display.components.TopMenu.gene_phenotype }}
    </el-menu-item>
    <el-sub-menu index="tools">
      <template #title>{{ lang.display.components.TopMenu.tool }}</template>
      <el-menu-item index="transfer">{{ lang.display.components.TopMenu.transfer }}</el-menu-item>
      <el-menu-item index="pos">{{ lang.display.components.TopMenu.selector }}</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="llm">
      {{ lang.display.components.TopMenu.assistant }}
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item>
      <el-select
          v-model="language"
          :placeholder="lang.displayName()"
          style="width: 200px"
          @change="lang.changeLang()"
      >
        <el-option
            label="简体中文"
            value="zh_CN"
        />
        <el-option
            label="English"
            value="en_US"
        />
      </el-select>
    </el-menu-item>
    <el-menu-item index="theme"><ThemeToggleButton/></el-menu-item>
    <el-sub-menu index="2">
      <template #title>Welcome, Liu HX</template>
      <div v-loading="true">
        <el-menu-item index="2-1">个人设置</el-menu-item>
        <el-menu-item index="2-2">余额：5000.00 CNY</el-menu-item>
        <el-menu-item index="2-3">权限：VIP</el-menu-item>
      </div>
    </el-sub-menu>
  </el-menu>
  <el-drawer v-model="drawer" direction="rtl">
    <template #header>
      <h4>Can I help you？</h4>
    </template>
    <template  #default>
      <el-row>
        <Assistant></Assistant>
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
.el-sub-menu{
  background-color: transparent !important;
  border-bottom-color: transparent !important;
}
.el-menu-item {
  background-color: transparent !important;
  border-bottom-color: transparent !important;
}
</style>