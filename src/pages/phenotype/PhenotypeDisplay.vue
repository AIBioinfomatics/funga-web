<script setup lang="ts">
import {reactive, ref} from "vue";

import {usePhenotypeStore} from "../../pinia/Store.ts";
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
</script>

<template>
  <el-row>
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
          <el-table :data="data.response[store.current_select]">
            <el-table-column label="基因">
              <template #default="scope">
                <el-button @click="windows.goLink('/gene/' + scope.row.gene)">{{ scope.row.gene }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="phenotype" label="表型" width="180" />
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