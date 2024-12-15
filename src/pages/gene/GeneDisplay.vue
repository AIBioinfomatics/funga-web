<script setup lang="ts">
import Interactions from "../../components/Interactions.vue";
import {Action, ElMessage, ElMessageBox} from "element-plus";
import {search, windows} from "../../tools";
import VueWordCloud from "vuewordcloud";
function onWordClick(word:string){
  window.open(`/phenotype/${word}`)
}
import {useClipboard} from "@vueuse/core";
import {useBlastStore, useGeneStore} from "../../pinia/Store.ts";
import {ref} from "vue";
import router from "../../router";
import {Result} from "../../network";
import SideBar from "../../components/SideBar.vue";
import InfoFrame from "../../components/InfoFrame.vue";

let drawer = ref(false)
let sequence = ref('')

function copy(a:string){
  ElMessage({
    message: "The replication is successful.",
    type: "success"
  })
  const toClipboard = useClipboard()
  toClipboard.copy(a)
}
let store = useGeneStore()
let isLoad = ref(false)
let data:Result = {
  databases:[""],
  message: "",
  status: false,
  response:{}
}
function query(){
  search.gene(store,data,function (){
    if (!data.status){
      ElMessageBox.alert('No results were queried.', 'Notice', {
        confirmButtonText: 'Return to the query page',
        callback: (action:Action) => {
          router.push("/gene")
        },
      })
    }
    data.databases.shift()
    store.current_select = data.databases[0]
    isLoad.value = true
  })
}


query()

function blast(seq:string){
  let a = useBlastStore()
  a.content = seq
  router.push("/transfer")
}

function randomHexColor() {
  var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
  while (hex.length < 6) {
    hex = '0' + hex;
  }
  return '#' + hex;
}
function getWords(){
  let result:any[] = []
  for (const phe of data.response[store.current_select]['phenotypes']){
    if (!result.map((ele)=> ele[0]).includes(phe["phenotype"])){
      let cache = []
      cache.push(phe["phenotype"])
      cache.push(1)
      result.push(cache)
    }
  }
  return result
}

type Sequence = {
  type:string,
  sequence:string,
  sourceName:string,
  sourceLink:string
  length:string,
}

function getSequences():Sequence[]{
  let result:Sequence[] = []
  if (data.response[store.current_select]["gene"]["polypeptide_sequence"] != undefined){
    result.push({
      type:"Polypeptide",
      sequence:data.response[store.current_select]["gene"]["polypeptide_sequence"],
      sourceName:data.response[store.current_select]["gene"]["source"]["name"],
      sourceLink:data.response[store.current_select]["gene"]["source"]["link"],
      length:data.response[store.current_select]["gene"]["polypeptide_sequence"].length.toString() + " aa"
    })
  }
  if (data.response[store.current_select]["gene"]["dna_sequence"] != undefined){
    result.push({
      type:"Genomic",
      sequence:data.response[store.current_select]["gene"]["dna_sequence"],
      sourceName:data.response[store.current_select]["gene"]["source"]["name"],
      sourceLink:data.response[store.current_select]["gene"]["source"]["link"],
      length:data.response[store.current_select]["gene"]["dna_sequence"].length.toString() + " nt"
    })
  }
  return result
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
    <SideBar :current_select="store.current_select" :databases="data.databases" @change="query()"></SideBar>
    <el-col :span="19">
      <el-row justify="center" >
        <el-col :span="24">
          <info-frame title="Information">
            <el-descriptions :column="1" size="large" border>
              <el-descriptions-item label="FUNGA ID">{{ data.response[store.current_select]["gene"]["funga_id"] }}</el-descriptions-item>
              <el-descriptions-item label="Symbol">{{ data.response[store.current_select]["gene"]["symbol"] }}</el-descriptions-item>
              <el-descriptions-item label="Alias">{{ data.response[store.current_select]["gene"]["other_name"].join(",") }}</el-descriptions-item>
              <el-descriptions-item label="FeatureType">{{ data.response[store.current_select]["gene"]["type"] }}</el-descriptions-item>
              <el-descriptions-item label="Name">{{ data.response[store.current_select]["gene"]["name"] }}</el-descriptions-item>
              <el-descriptions-item label="Description">{{ data.response[store.current_select]["gene"]["description"] }}</el-descriptions-item>
            </el-descriptions>
          </info-frame>
        </el-col>
      </el-row>
      <el-row>
        <br>
      </el-row>
      <el-row justify="center">
        <el-col :span="24">
          <info-frame title="Sequences">
            <template #default>
              <el-table :data="getSequences()">
                <el-table-column prop="type" label="Type"></el-table-column>
                <el-table-column label="Sequence">
                  <template #default="scope">
                    <el-button style="cursor: pointer" @click="sequence = scope.row.sequence;drawer = true">
                      Show
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column label="Source">
                  <template #default="scope">
                <span style="cursor: pointer" @click="windows.goLink(scope.row.sourceLink)">
                  {{scope.row.sourceName}}
                </span>
                  </template>
                </el-table-column>
                <el-table-column prop="length" label="Length"></el-table-column>
                <el-table-column label="Analysis">
                  <template #default="scope">
                    <el-select
                        placeholder="Select tool"
                        size="small"
                        style="width: 100px"
                    >
                      <el-option @click="copy(scope.row.sequence)"
                                 label="Copy"
                      />
                      <el-option @click="blast(scope.row.sequence)"
                                 label="Transfer"
                      />
                      <el-option @click="windows.goLink('https://blast.ncbi.nlm.nih.gov/Blast.cgi'); copy(scope.row.sequence)"
                                 label="NCBI Blast"
                      />
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </info-frame>
        </el-col>
      </el-row>
      <el-row>
        <br>
      </el-row>
      <el-row>
        <el-col :span="24">
          <info-frame title="Phenotype">
            <template #default>
              <vue-word-cloud :animation-duration="5000" enter-animation="animated flipX" leave-animation="animated flipX" font-family="Baloo Bhaijaan" :color="randomHexColor" :spacing="1" :font-size-ratio="1/5" style="height: 50vh;width: 100%" :words="getWords()">
                <template #default="{text, weight, word}">
                <span style="cursor: pointer;" @click="onWordClick(word[0])">
                  {{ text }}
                </span>
                </template>
              </vue-word-cloud>
            </template>
          </info-frame>
        </el-col>
      </el-row>
      <el-row>
        <br>
      </el-row>
      <el-row justify="center">
        <el-col :span="24">
          <info-frame title="Interactions">
            <Interactions :datas="data.response[store.current_select]['graph']"></Interactions>
          </info-frame>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-dialog style="height: 60vh" v-model="drawer" direction="btt">
    <template #default>
      <info-frame title="Sequence Info">
        <el-input
            type="textarea"
            resize="none"
            readonly
            :rows="15"
            v-model="sequence"
        />
      </info-frame>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>