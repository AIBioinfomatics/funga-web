<script setup lang="ts">
import {reactive, ref} from "vue";

import {useGenePhenotypeStore, usePhenotypeStore} from "../../pinia/Store.ts";
import router from "../../router";
import {search, windows} from "../../tools";
import {Action, ElMessageBox} from "element-plus";
import {Result} from "../../network";
import SideBar from "../../components/SideBar.vue";
import VueWordCloud from "vuewordcloud";
import InfoFrame from "../../components/InfoFrame.vue";


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

function getWords(){
  let result:any[] = []
  for (const obj of data.response[store.current_select]){
    if (!result.map((ele)=> ele[0]).includes(obj["phenotype"])){
      let cache = []
      cache.push(obj["phenotype"])
      cache.push(obj['similarity'])
      result.push(cache)
    }
  }
  return result
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
        ElMessageBox.alert('No results were queried.', 'Notice', {
          confirmButtonText: 'Return to the query page',
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

function randomHexColor(weight:any[]) {
  if (weight[1] > 0.9){
    return "#FF6A6A"
  }
  var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
  while (hex.length < 6) {
    hex = '0' + hex;
  }
  return '#' + hex;
}

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
          <info-frame title="Information">
            <el-descriptions :column="1" size="large" border>
              <el-descriptions-item label="Phenotype searched">{{ store.phenotype }}</el-descriptions-item>
              <el-descriptions-item label="Number of databases">{{ data.databases.length }}</el-descriptions-item>
            </el-descriptions>
          </info-frame>
        </el-col>
      </el-row>
      <el-row>
        <br>
      </el-row>

      <el-row justify="center">
        <el-col :span="24" v-if="store.type == 'search'">
          <info-frame title="Genes">
            <el-tag type="primary" @click="importGP">Import Gene-Phenotype</el-tag>
            <el-table :data="data.response[store.current_select]" max-height="500">
              <el-table-column label="Gene">
                <template #default="scope">
                  <el-button @click="windows.goLink('/gene/' + scope.row.gene)">{{ getGeneName(scope.row.gene) }}</el-button>
                </template>
              </el-table-column>
              <el-table-column label="Phenotype">
                <template #default="scope">
                  <span style="cursor: pointer" @click="goPhenotype(scope.row.phenotype)">{{scope.row.phenotype}}</span>
                </template>
              </el-table-column>
              <el-table-column label="Source">
                <template #default="scope">
                  <el-tag @click="windows.goLink(scope.row.source.link)">
                    {{scope.row.source.name}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="Reference">
                <template #default="scope">
                  <el-button @click="windows.showWindow('Reference',scope.row.reference)">Show</el-button>
                </template>
              </el-table-column>

            </el-table>
          </info-frame>
        </el-col>
        <el-col :span="24" v-else>
          <info-frame title="Phenotype Ontologies">
            <vue-word-cloud :animation-duration="5000" enter-animation="animated flipX" leave-animation="animated flipX" font-family="Baloo Bhaijaan" :color="randomHexColor" :spacing="1" :font-size-ratio="1/5" style="height: 50vh;width: 100%" :words="getWords()">
              <template #default="{text, weight, word}">
                <el-tooltip :content="weight*100+'%'">
                <span style="cursor: pointer;" @click="goPhenotype(word[0])">
                  {{ text }}
                </span>
                </el-tooltip>
              </template>
            </vue-word-cloud>
          </info-frame>
        </el-col>
      </el-row>

      <el-row>
        <br>
      </el-row>

      <el-row>
        <el-col :span="24">
          <info-frame title="Related Gene Ontology">
            <el-table :data="data.response['go']">
              <el-table-column prop="goid" label="GO ID" />
              <el-table-column label="Term">
                <template #default="scope">
                  <el-button @click="windows.showWindow('Term',[scope.row.term])">Show</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="similarity" label="Similarity"></el-table-column>
              <el-table-column label="Reference">
                <template #default="scope">
                <span style="cursor: pointer" @click="windows.goLink(scope.row.reference[0])" v-if='scope.row.reference.toString().split("/")[scope.row.reference.toString().split("/").length-1] != "-"'>
                  {{scope.row.reference.toString().split("/")[scope.row.reference.toString().split("/").length-1]}}
                </span>
                  <span v-else>Empty</span>
                </template>
              </el-table-column>
              <el-table-column label="Link">
                <template #default="scope">
                  <el-button @click="windows.goLink(scope.row.link)">Redirect</el-button>
                </template>
              </el-table-column>
            </el-table>
          </info-frame>
        </el-col>
      </el-row>

    </el-col>
  </el-row>
</template>

<style scoped>

</style>