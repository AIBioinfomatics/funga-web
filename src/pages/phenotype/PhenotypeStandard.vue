<script setup lang="ts">
import {usePhenotypeStore} from "../../pinia/Store.ts";
import {reactive} from "vue";
import {search} from "../../tools";
import router from "../../router";

let store = usePhenotypeStore()
let isLoad = false
let data = reactive({})
function query(){
  search.phenotypeOntology(store,data,function (){
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
  <div v-else v-for="(value,key) in data">
    <h1 style="font-size: 20px">搜索关键词：{{store.phenotype}},共计{{count()}}个搜索结果.</h1>
    <el-card style="margin-top: 10px" v-for="po in value">
      <template #header>
        <span style="cursor: pointer">{{po["phenotype"]}}</span>
      </template>
      <el-descriptions  size="large" :column="1" border>
        <el-descriptions-item label="描述">{{ po["description"] }}</el-descriptions-item>
        <el-descriptions-item label="相似性">{{ po["similarity"] }}</el-descriptions-item>
        <el-descriptions-item label="操作">
          <el-button type="primary" @click="goPhenotype(po['phenotype'])">点击前往</el-button>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        来源: {{key}}
      </template>
    </el-card>
  </div>
</template>

<style scoped>

</style>