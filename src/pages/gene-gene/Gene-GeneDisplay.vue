<script setup lang="ts">
import {Action, ElMessageBox} from "element-plus";
import {search, windows} from "../../tools"
import router from "../../router";
import {useGeneGeneStore} from "../../pinia/Store.ts";
import {reactive, ref} from "vue";
import SideBar from "../../components/SideBar.vue";
import {Result} from "../../network";

let store = useGeneGeneStore()

let currentPage = ref(1)
function alterPage(n:number){
  currentPage.value = n
}
function goGene(id:string){
  window.open("/gene/"+id)
}

let isLoad = ref(false)
let data:Result = reactive({
  databases:[""],
  message: "",
  status: false,
  response:{}
})
function slice(){
  return [((currentPage.value-1)*10),(currentPage.value * 10)-1]
}

function getGeneName(id:string){
  for (let map of data.response["gene_mapping"]) {
    if (map["origin"] == id && store.current_select == map["db"]) return map["view"]
  }
}

function query(){
  if (store.gene1.length == 0 || store.gene2.length == 0){
    router.push("/gene-gene/search")
  }else {
    search.genegene(store,data,function (){
      data.databases.shift()
      store.current_select = data.databases[0]
      isLoad.value = true
      if (!data.status){
        ElMessageBox.alert('没有查询到相关结果.', '通知', {
          confirmButtonText: '返回查询界面',
          callback: (action:Action) => {
            router.push("/gene-gene")
          },
        })
      }
    })
  }
}

query()
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
    <el-col :span="19">
      <el-row justify="center">
        <el-text @click="goGene(<string>store.gene1)" class="gene" type="primary" >{{store.gene1}}</el-text>
        <h1>&nbsp————&nbsp</h1>
        <el-text @click="goGene(<string>store.gene2)" class="gene" type="primary">{{store.gene2}}</el-text>
      </el-row>
      <el-row>
        <br>
      </el-row>
      <el-row>
        <h1>基因互作结果：</h1>
      </el-row>
      <el-row justify="center">
        <el-col v-if="isLoad" :span="24">
          <el-descriptions v-for="item in data.response[store.current_select].slice(slice()[0],slice()[1])" style="margin-bottom: 5px" border :column="3">
            <el-descriptions-item label="基因I">{{ getGeneName(item["gene1"])}}</el-descriptions-item>
            <el-descriptions-item label="基因II">{{ getGeneName(item["gene2"]) }}</el-descriptions-item>
            <el-descriptions-item label="互作类型">{{ item["type"]}}</el-descriptions-item>
            <el-descriptions-item :span="3" label="来源">
              <el-tag type="primary" @click="windows.goLink(item['source']['link'])">
                {{item["source"]["name"]}}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item :span="3" label="引证">
              <el-tag v-for='reference in item["reference"]' @click="windows.goLink(reference)">
                {{reference}}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-pagination @update:current-page="alterPage" :current-page="currentPage" :page-size="10" background layout="prev, pager, next" :total="data.response[store.current_select].length" />
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped>
.gene{
  font-size: 65px;
  cursor: pointer;
}
</style>