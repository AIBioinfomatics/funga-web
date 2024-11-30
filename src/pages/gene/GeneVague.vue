<script setup lang="ts">

import {useGeneStore} from "../../pinia/Store.ts";
import {search, windows} from "../../tools";
import {Result} from "../../network";
import SideBar from "../../components/SideBar.vue";
import {reactive} from "vue";
let store = useGeneStore()
let isLoad = false
let data:Result = reactive({
  databases:[""],
  message: "",
  status: false,
  response:{}
})
function query(){
  search.gene(store,data,function (){
    data.databases.shift()
    store.current_select = data.databases[0]
    isLoad = true
  })
}
query()
function count() {
  var size = 0
  for (let dbName in data.response) {
    if (dbName != "session"){
      size += data.response[dbName].length
    }
  }
  return size
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
  <el-row v-else>
    <SideBar @change="query()" :databases="data.databases" :current_select="store.current_select"></SideBar>
    <el-col :span="1">
      <el-divider style="height: 100%" direction="vertical"/>
    </el-col>
    <el-col :span="19">
      <el-card style="margin-top: 10px" v-for="gene in data.response[store.current_select]">
        <template #header>
          <span>{{gene["funga_id"]}}</span>
        </template>
        <el-descriptions size="large" :column="3" border>
          <el-descriptions-item label="标准名称">{{ gene["symbol"] }}</el-descriptions-item>
          <el-descriptions-item label="基因类型">{{ gene["type"] }}</el-descriptions-item>
          <el-descriptions-item label="基因名字">{{ gene["name"] }}</el-descriptions-item>
          <el-descriptions-item label="基因描述" :span="3">{{gene["description"]}}</el-descriptions-item>
          <el-descriptions-item label="相似度">{{gene["similarity"]}}</el-descriptions-item>
          <el-descriptions-item label="其他名称" :span="2">{{gene["other_name"]}}</el-descriptions-item>
        </el-descriptions>
        <template #footer>
          来源:
          <el-tag type="primary" @click="windows.goLink(gene['source']['link'])">
            {{gene["source"]["name"]}}
          </el-tag>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
</style>