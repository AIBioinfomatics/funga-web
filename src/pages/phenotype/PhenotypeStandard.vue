<script setup lang="ts">
import {usePhenotypeStore} from "../../pinia/Store.ts";
import {reactive} from "vue";
import {search, windows} from "../../tools";
import router from "../../router";
import {Result} from "../../network";
import SideBar from "../../components/SideBar.vue";

let store = usePhenotypeStore()
let isLoad = false
let data:Result = reactive({
  databases:[""],
  message: "",
  status: false,
  response:{}
})
function query(){
  search.phenotype(store,data,function (){
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
function goPhenotype(phenotype:string){
  store.type = "freedom"
  store.phenotype = phenotype
  router.push("/phenotype/display")
}
</script>

<template>
  <el-row v-if="count()==0 && isLoad" justify="center" align="middle">
    <el-col :span="24">
      <el-result
          icon="error"
          title="搜索失败"
          :sub-title="'没有搜索到与 '+ store.phenotype +' 有关的结果,请重试.'"
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
      <el-card style="margin-top: 10px" v-for="po in data.response[store.current_select]">
        <template #header>
          <span style="cursor: pointer">{{po["name"]}}</span>
        </template>
        <el-descriptions  size="large" :column="1" border>
          <el-descriptions-item label="描述">{{ po["description"] }}</el-descriptions-item>
          <el-descriptions-item label="相似性">{{ po["similarity"] }}</el-descriptions-item>
          <el-descriptions-item label="操作">
            <el-button type="primary" @click="goPhenotype(po['name'])">点击前往</el-button>
          </el-descriptions-item>
        </el-descriptions>
        <template #footer>
          来源:
          <el-tag type="primary" @click="windows.goLink(po['source']['link'])">
            {{po["source"]["name"]}}
          </el-tag>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>