<script setup lang="ts">
import {reactive, ref} from "vue";

import {useGenePhenotypeStore, usePhenotypeStore} from "../../pinia/Store.ts";
import router from "../../router";
import {search, windows} from "../../tools";
import {Action, ElMessageBox} from "element-plus";
import {Result} from "../../network";
import SideBar from "../../components/SideBar.vue";

const store = usePhenotypeStore()
let isLoad = ref(false)
let data:Result = reactive({
  databases:[""],
  message: "",
  status: false,
  response:{}
})

function getGeneName(id:string){
  for (let map of data.response["gene_mapping"]) {
    if (map["origin"] == id && store.current_select == map["db"]) return map["view"]
  }
}

function query(){
  if (store.phenotype.length == 0 || store.phenotype.length == 0){
    router.push("/phenotype/search")
  }else {
    search.phenotype(store,data,function (){
      data.databases.shift()
      store.current_select = data.databases[0]
      isLoad.value = true
      if (!data.status){
        ElMessageBox.alert('没有查询到相关结果.', '通知', {
          confirmButtonText: '返回查询界面',
          callback: (action:Action) => {
            router.push("/phenotype")
          },
        })
      }
    })
  }
}
query()
function goPhenotype(phe:string){
  store.type = "search"
  store.phenotype = phe
  isLoad.value = false
  query()
}
function importGP(){
  let gp = useGenePhenotypeStore()
  gp.phenotypes.length = 0
  Object.assign(gp.phenotypes,[store.phenotype])
  let genes = []
  for (var obj of data.response[store.current_select]){
    genes.push(getGeneName(obj["gene"]))
  }
  gp.genes.length = 0
  Object.assign(gp.genes,genes)
  router.push("/gene-phenotype/search")
}
</script>

<template>
  <el-row v-if="!isLoad" justify="center" align="middle">
    <el-col :span="24">
      <el-result
          icon="info"
          title="搜索中"
          sub-title="请稍作等待···"
      />
    </el-col>
  </el-row>
  <el-row v-else>
    <SideBar :databases="data.databases" :current_select="store.current_select" @change="query()"></SideBar>
    <el-col :span="1">
      <el-divider style="height: 100%" direction="vertical"/>
    </el-col>
    <el-col v-loading="!isLoad" :span="19">
      <el-row style="height: 10vh" align="middle" justify="center">
        <el-text type="primary" style="font-size: 10px">{{store.phenotype}}</el-text>
      </el-row>
      <el-row>
        <el-col :span="21">
          <h1>基因详情：</h1>
          <el-tag type="success">*已为您展示多条最佳结果如果您需要更精准的结果,请直接在表格内点击表型即可!</el-tag>
          <el-tag type="primary" @click="importGP">点击导入至Gene-Phenotype</el-tag>
          <el-table :data="data.response[store.current_select]" max-height="500">
            <el-table-column label="基因">
              <template #default="scope">
                <el-button @click="windows.goLink('/gene/' + scope.row.gene)">{{ getGeneName(scope.row.gene) }}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="表型">
              <template #default="scope">
                <span style="cursor: pointer" @click="goPhenotype(scope.row.phenotype)">{{scope.row.phenotype}}</span>
              </template>
            </el-table-column>
            <el-table-column label="来源">
              <template #default="scope">
                <el-tag @click="windows.goLink(scope.row.source.link)">
                  {{scope.row.source.name}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="similarity" label="相似度"></el-table-column>
            <el-table-column label="引证">
              <template #default="scope">
                <el-button @click="windows.showWindow('引证',scope.row.reference)">点击查看</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="21">
          <h1>Related GO：</h1>
          <el-table :data="data.response['go']">
            <el-table-column prop="goid" label="GO ID" />
            <el-table-column label="标签">
              <template #default="scope">
                <el-button @click="windows.showWindow('Term',[scope.row.term])">点击查看</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="similarity" label="相似度"></el-table-column>
            <el-table-column label="引证">
              <template #default="scope">
                <el-button @click="windows.showWindow('引证',scope.row.reference)">
                  {{ scope.row.gene }}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="链接">
              <template #default="scope">
                <el-button @click="windows.goLink(scope.row.link)">点击前往</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

    </el-col>
  </el-row>
</template>

<style scoped>

</style>