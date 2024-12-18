<script setup lang="ts">
import {reactive, ref} from "vue";
import {graph, search, windows} from "../../tools";
import Interactions from "../../components/Interactions.vue";
import {useGenePhenotypeStore} from "../../pinia/Store.ts";
import router from "../../router";
import {Action, ElMessage, ElMessageBox} from "element-plus";
import { Marked } from '@ts-stack/markdown';
import {Result} from "../../network";
import SideBar from "../../components/SideBar.vue";
import InfoFrame from "../../components/InfoFrame.vue";
import {lang} from "../../lang";

const groups:Graph[] = reactive([])
let viewGroupData = reactive({nodes:[],lines:[]})
const currentSelectGroupIndex = ref(0)
let searchToolContent = ref('')
let selected = reactive([])

function onSelected(v:any[]) {
  if (v.length == 0){
    generateGraph(tablesData)
    return
  }
  selected.length = 0
  Object.assign(selected,v)
  generateGraph(selected)
}

function searchGene() {
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].nodes.map((ele)=>ele['text']).includes(searchToolContent.value)){
      currentSelectGroupIndex.value = i
      changeView()
      ElMessage({
        type:"success",
        message: "Change Group " + i +"."
      })
      return
    }
  }
  ElMessage({
    type:"error",
    message: "Query Failed."
  })
}

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
let toolsName = ref('Append')
let summary = ref('Generating in progress')
let store = useGenePhenotypeStore()
let isLoad = ref(false)
let inter = ref()
let data:Result = reactive({
  databases:[""],
  message: "",
  status: false,
  response:{}
})

let filters = ref([])
function query(){
  if (store.phenotypes.length == 0 || store.genes.length == 0){
    router.push("/gene-phenotype/search")
  }else {
    search.genephenotype(store,data,function (){
      if (!data.status){
        ElMessageBox.alert('No results were queried.', 'Notice', {
          confirmButtonText: 'Return to the query page',
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
export type Graph = {
  nodes:any[],
  lines:any[]
}
let state = ref(1)
let tablesData = reactive([])
let graphData:Graph = {nodes:[],lines:[]}

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
function containsAny(sup:string[],chi:string[]):boolean{
  for (let ele of chi) {
    if (sup.includes(ele)){
      return true
    }
  }
  return false
}
function generateGraph(td:any[]) {
  graphData.lines.length = 0
  graphData.nodes.length = 0
  for (let geneData of td) {
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
    if (graphData.nodes.map((ele)=>ele["text"]).includes(getGeneName(obj["gene1"])) || graphData.nodes.map((ele)=>ele["text"]).includes(getGeneName(obj["gene2"]))){
      graphData.lines.push(
          {
            from: getGeneName(obj["gene1"]),
            to: getGeneName(obj["gene2"]),
            text: obj["type"],
          }
      )
    }
  }
  for (let obj of data.response["graph"]["outer_genes"][store.current_select]) {
    for (let inter of obj["interaction"]){
      if (graphData.nodes.map((ele)=>ele["text"]).includes(getGeneName(inter["gene1"])) || graphData.nodes.map((ele)=>ele["text"]).includes(getGeneName(inter["gene2"]))){
        graphData.lines.push(
            {
              from: getGeneName(inter["gene1"]),
              to: getGeneName(inter["gene2"]),
              text: inter["type"],
            }
        )
      }
    }
  }
  Object.assign(groups,graph.group(graphData))
  currentSelectGroupIndex.value = -1
  changeView()
}
function onFilterChange() {
  tablesData.length = 0
  Object.assign(graphData,{})
  let cache:Gene[] = []
  for (let obj of data.response["graph"]["func_genes"][store.current_select]) {
    cache.push(
        {
          gene: getGeneName(obj["gene"]),
          tags: obj["graph_type"],
          source: obj["source"],
          reference: obj["reference"],
          score:obj["score"],
          phenotype: obj["phenotype"] == null ? "Empty" : obj["phenotype"]
        }
    )
  }
  for (let obj of data.response["graph"]["predict_genes"][store.current_select]) {
    if (containsAny(obj["graph_type"],filters.value)){
      cache.push(
          {
            gene: getGeneName(obj["name"]),
            tags: obj["graph_type"],
            source: obj["source"],
            reference: obj["reference"],
            score:obj["score"],
            phenotype: "Empty"
          }
      )
    }
  }
  for (let obj of data.response["graph"]["outer_genes"][store.current_select]) {
    if (containsAny(filters.value,["not-in-list"])){
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
  generateGraph(tablesData)
}

function transferTags(tags:string[]):string[]{
  let result = []
  for (let tag of tags) {
    switch (tag){
      case "in-list" : {
        result.push("In list")
        break
      }
      case "not-in-list" : {
        result.push("Not in list")
        break
      }
      case "distance-1" : {
        result.push("One edge")
        break
      }
      case "distance-2" : {
        result.push("Two edges")
        break
      }
      case "distance-3" : {
        result.push("Three edges")
        break
      }
      case "distance-0" : {
        result.push("No edges")
        break
      }
      case "related-phenotype" : {
        result.push("Related Phenotype")
        break
      }
    }
  }
  return result
}

function changeView(){
  if (currentSelectGroupIndex.value == -1){
    Object.assign(viewGroupData,graphData)
  }else {
    Object.assign(viewGroupData,groups[currentSelectGroupIndex.value])
  }
}

query()


</script>

<template>
  <el-row v-if="!isLoad" justify="center" align="middle">
    <el-col :span="24">
      <el-result
          icon="info"
          title="Loading"
          sub-title="Please wait..."
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
        <el-col :span="24">
          <info-frame title="Gene Interaction Network">
            <el-segmented block v-model="toolsName" :options="['Append', 'Group', 'Search']">
            </el-segmented>
            <el-row>
              <el-col :span="24">
                <el-card>
                  <el-checkbox-group v-if="toolsName == 'Append'" @change="onFilterChange()" v-model="filters">
                    <el-checkbox label="Connected by an edge" value="distance-1" />
                    <el-checkbox label="Connected by two edges" value="distance-2" />
                    <el-checkbox label="Connected by three edges" value="distance-3" />
                    <el-checkbox label="Not in list" value="not-in-list" />
                  </el-checkbox-group>
                  <el-select
                      v-else-if="toolsName == 'Group'"
                      v-model="currentSelectGroupIndex"
                      placeholder="Group All"
                      style="width: 240px"
                      @change="changeView()"
                      filterable
                  >
                    <el-option
                        :key="-1"
                        label="Group All"
                        :value="-1"
                    />
                    <el-option
                        v-for="item in groups.length"
                        :key="item"
                        :label="'Group '+item+' '"
                        :value="item-1"
                    />
                  </el-select>
                  <el-input
                      v-else-if="toolsName == 'Search'"
                      v-model="searchToolContent"
                            placeholder="Please enter a gene name..."
                            clearable
                            @keyup.enter.native="searchGene"
                  >
                    <template #append>
                      <el-button ref="searchElement" @click="searchGene">{{ lang.display.common.btn_search }}</el-button>
                    </template>
                  </el-input>
                </el-card>
              </el-col>
            </el-row>
            <el-card>
              <Interactions :key="state" ref="inter" v-if="isLoad" :datas="viewGroupData"/>
              <div v-else>
                Please select a species
              </div>
            </el-card>

          </info-frame>
        </el-col>
      </el-row>
      <el-row>
        <br>
      </el-row>
      <el-row>
        <el-col :span="24">
          <info-frame title="Functional Genes">
            <el-button type="success" @click="windows.saveFile('#data')">
              Download Table
            </el-button>
            <el-table @selection-change="onSelected" id="data" :data="tablesData">
              <el-table-column type="selection" :selectable="true" width="55" />
              <el-table-column prop="gene" label="Gene"></el-table-column>
              <el-table-column label="Tags">
                <template #default="scope">
                  <el-tag v-for="tag in transferTags(scope.row.tags)">{{tag}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="Additional information">
                <el-table-column label="Source">
                  <template #default="scope">
                    <el-tag @click="windows.goLink(scope.source['link'])">{{scope.row.source["name"]}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="phenotype" label="Related Phenotype" />
                <el-table-column label="Reference">
                  <template #default="scope">
                    <el-button @click="windows.showWindow('引证',['引证：' + scope.row.reference])">点击查看</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="score" label="Confidence (x 100%)" />
              </el-table-column>
            </el-table>
          </info-frame>
        </el-col>
      </el-row>
      <el-row>
        <br>
      </el-row>
      <el-row>
        <el-col :span="24">
          <info-frame title="Summary" tooltip="Rebuild?">
            <el-card shadow="always" v-html="Marked.parse(summary)" />
          </info-frame>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>