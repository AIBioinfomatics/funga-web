<script setup lang="ts">

import {reactive} from "vue";
import {useGeneStore} from "../../pinia/Store.ts";
import {search} from "../../tools";
let store = useGeneStore()
let isLoad = false
let data = reactive({})
function query(){
  search.gene(store,data,function (){
    isLoad = true
  })
}
query()
function count() {
  let c = 0
  for (let dataKey in data) {
    c+=data[dataKey].length
  }
  return c
}
</script>

<template>
  <el-row v-if="count()==0 && isLoad" justify="center" align="middle">
    <el-col :span="24">
      <el-result
          icon="error"
          title="搜索失败"
          :sub-title="'没有搜索到与 '+ store.content +' 有关的结果,请重试.'"
      />
    </el-col>
  </el-row>
  <el-row v-else-if="count()==0 && !isLoad" justify="center" align="middle">
    <el-col :span="24">
      <el-result
          icon="info"
          title="搜索中"
          sub-title="请稍作等待···"
      />
    </el-col>
  </el-row>
  <div v-else v-for="(value,key) in data">
    <h1 style="font-size: 20px">模糊搜索关键词：{{store.content}},共计{{count()}}个搜索结果.</h1>
    <el-card style="margin-top: 10px" v-for="gene in value">
      <template #header>
        <span>{{gene["system_id"]}}</span>
      </template>
      <el-descriptions size="large" :column="1" border>
        <el-descriptions-item label="其他名称">{{ gene["standard_id"] }}</el-descriptions-item>
        <el-descriptions-item label="基因描述">{{ gene["description"] }}</el-descriptions-item>
        <el-descriptions-item label="相似性">{{ gene["similarity"] }}</el-descriptions-item>
      </el-descriptions>
      <template #footer>
        来源: {{key}}
      </template>
    </el-card>
  </div>
</template>

<style scoped>
</style>