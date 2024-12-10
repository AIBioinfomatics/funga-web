<script setup lang="ts">
import {reactive, ref} from "vue";
import {search, windows} from "../../tools";
import Interactions from "../../components/Interactions.vue";
import {useGenePhenotypeStore} from "../../pinia/Store.ts";
import router from "../../router";
import {Action, ElMessageBox} from "element-plus";
import { Marked } from '@ts-stack/markdown';
import {Result} from "../../network";
import SideBar from "../../components/SideBar.vue";

type Gene = {
  gene:string,
  tags:[],
  source:{
    name:string,
    link:string
  },
  phenotype:string,
  reference:[],
  score:number
}
let summary = ref('正在生成中')
let store = useGenePhenotypeStore()
let isLoad = ref(false)
let inter = ref()
let data:Result = reactive({
  databases:[""],
  message: "",
  status: false,
  response:{}
})

let filters = ref(['in-list'])
function query(){
  if (store.phenotypes.length == 0 || store.genes.length == 0){
    router.push("/gene-phenotype/search")
  }else {
    search.genephenotype(store,data,function (){
      if (!data.status){
        ElMessageBox.alert('没有查询到相关结果.', '通知', {
          confirmButtonText: '返回查询界面',
          callback: (action:Action) => {
            router.push("/gene-phenotype")
          },
        })
      }else {
        data.databases.shift()
        store.current_select = data.databases[0]
        isLoad.value = true
        onFilterChange()
        generateSummary()
      }
    })
  }
}
type Graph = {
  nodes:any[],
  lines:any[]
}
let state = ref(1)
let tablesData = reactive([])
let graphData:Graph = reactive({nodes:[],lines:[]})

function generateSummary(){
  let history = reactive([])
  search.getSummary(history,()=>{
    summary.value = history[history.length-1]["message"]
  })
}

function getGeneName(id:string){
  for (let map of data.response["gene_mapping"]) {
    if (map["origin"] == id && store.current_select == map["db"]) return map["view"]
  }
}
function containsAll(sup:string[],chi:string[]):boolean{
  for (let ele of chi) {
    if (!sup.includes(ele)){
      return false
    }
  }
  return true
}
function generateGraph() {
  graphData.lines.length = 0
  graphData.nodes.length = 0
  for (let geneData of tablesData) {
    var cache = {}
    if (containsAll(geneData["tags"],["in-list",'related-phenotype'])){
      cache = {
        id: geneData["gene"],
        text: geneData["gene"],
        color: "#F08080",
        borderWidth: -1,
        fontColor: "#FDFEFE"
      }
    }else if (containsAll(geneData["tags"],["in-list"])){
      cache = {
        id: geneData["gene"],
        text: geneData["gene"],
        color: "#2E86C1",
        borderWidth: -1,
        fontColor: "#FDFEFE"
      }
    } else if (containsAll(geneData["tags"],["not-in-list",'related-phenotype'])){
      cache = {
        id: geneData["gene"],
        text: geneData["gene"],
        color: "#F08080",
        fontColor: "#FDFEFE",
        borderWidth: -1,
        nodeShape: 1
      }
    }
    graphData.nodes.push(cache)
    state.value = state.value+1
  }
  for (let obj of data.response["graph"]["predict_genes"][store.current_select]) {
    if (containsAll(obj["graph_type"],filters.value)){
      graphData.lines.push(
          {
            from: getGeneName(obj["gene1"]),
            to: getGeneName(obj["gene2"]),
            type: obj["type"],
          }
      )
    }
  }
}
function onFilterChange() {
  tablesData.length = 0
  Object.assign(graphData,{})
  let cache:Gene[] = []
  for (let obj of data.response["graph"]["func_genes"][store.current_select]) {
    if (containsAll(obj["graph_type"],filters.value)){
      cache.push(
          {
            gene: getGeneName(obj["gene"]),
            tags: obj["graph_type"],
            source: obj["source"],
            reference: obj["reference"],
            score:obj["score"],
            phenotype: obj["phenotype"] == null ? "无" : obj["phenotype"]
          }
      )
    }
  }
  for (let obj of data.response["graph"]["predict_genes"][store.current_select]) {
    if (containsAll(obj["graph_type"],filters.value)){
      cache.push(
          {
            gene: getGeneName(obj["name"]),
            tags: obj["graph_type"],
            source: obj["source"],
            reference: obj["reference"],
            score:obj["score"],
            phenotype: "无"
          }
      )
    }
  }
  for (let obj of data.response["graph"]["outer_genes"][store.current_select]) {
    if (containsAll(obj["graph_type"],filters.value)){
      cache.push(
          {
            gene: getGeneName(obj["gene"]),
            tags: obj["graph_type"],
            source: obj["source"],
            reference: obj["reference"],
            score:obj["score"],
            phenotype: obj["phenotype"] == null ? "无" : obj["phenotype"]
          }
      )
    }
  }
  Object.assign(tablesData,cache)
  generateGraph()
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
      <el-row align="middle" justify="center">
        <el-card style="max-width: 480px">
          <template #header>
            <div class="card-header">
              <span>Genes</span>
            </div>
          </template>
          <div>
            <el-tag type="primary" v-for="d in store.genes">
              {{ d }}
            </el-tag>
          </div>
        </el-card>
        <el-card style="max-width: 480px">
          <template #header>
            <div class="card-header">
              <span>Phenotype</span>
            </div>
          </template>
          <div>
            <el-tag type="primary" v-for="d in store.phenotypes">
              {{ d }}
            </el-tag>
          </div>
        </el-card>
      </el-row>
      <el-row>
        <el-row>
          <h1>功能基因列表：</h1>
        </el-row>
        <el-col :span="24">
          <el-checkbox-group @change="onFilterChange()" v-model="filters">
            <el-checkbox label="列表内" value="in-list" />
            <el-checkbox label="距离为1" value="distance-1" />
            <el-checkbox label="距离为2" value="distance-2" />
            <el-checkbox label="距离为3" value="distance-3" />
            <el-checkbox label="表型关联基因" value="related-phenotype" />
            <el-checkbox label="非列表内" value="not-in-list" />
          </el-checkbox-group>
          <el-table :data="tablesData">
            <el-table-column prop="gene" label="基因"></el-table-column>
            <el-table-column label="标签">
              <template #default="scope">
                <el-tag v-for="tag in scope.row.tags">{{tag}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="额外信息">
              <el-table-column label="来源">
                <template #default="scope">
                  <el-tag @click="windows.goLink(scope.source['link'])">{{scope.row.source["name"]}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="phenotype" label="关联表型" />
              <el-table-column label="引证">
                <template #default="scope">
                  <el-button @click="windows.showWindow('引证',['引证：' + scope.row.reference])">点击查看</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="score" label="置信度(x 100%)" />
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-row>
          <h1>基因互作网络：</h1>
        </el-row>
        <el-col :span="24">
          <Interactions :key="state" ref="inter" v-if="isLoad" :datas="graphData"/>
          <div v-else>
            请选择物种
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-row>
          <el-tooltip content="重新生成?">
            <h1 @click="generateSummary()">摘要：</h1>
          </el-tooltip>
        </el-row>
        <el-col :span="24">
          <el-card shadow="always" v-html="Marked.parse(summary)">
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>