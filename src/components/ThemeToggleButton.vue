<script setup lang="ts">
import {Moon, Sunny} from "@element-plus/icons-vue";
import {useDark,useToggle} from "@vueuse/core";

const isDark = useDark()
const toggleDark = () => useToggle(isDark)
</script>

<template>
  <el-switch v-model="isDark" inline-prompt
             :active-icon="Moon"
             :inactive-icon="Sunny"
             active-color="var(--el-fill-color-dark)"
             inactive-color="var(--el-color-primary)"
             @change="toggleDark" />
</template>

<style>
#content{
  width: 800px;
}
</style>