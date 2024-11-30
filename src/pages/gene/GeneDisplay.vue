<script setup lang="ts">
import Interactions from "../../components/Interactions.vue";
import {Action, ElMessage, ElMessageBox} from "element-plus";
import {search, windows} from "../../tools";
function onWordClick(word:string){
  window.open(`/phenotype/${word}`)
}
import {useClipboard} from "@vueuse/core";
import {useBlastStore, useGeneStore} from "../../pinia/Store.ts";
import {reactive, ref} from "vue";
import router from "../../router";
import {Result} from "../../network";
function copy(a:string){
  ElMessage({
    message: "复制成功",
    type: "success"
  })
  const toClipboard = useClipboard()
  toClipboard.copy(a)
}
let store = useGeneStore()
let isLoad = ref(false)
const descriptions = reactive([])
let data:Result = {
  databases:[""],
  message: "",
  status: false,
  response:{}
}
function query(){
  search.gene(store,data,function (){
    if (!data.status){
      ElMessageBox.alert('没有查询到相关结果.', '通知', {
        confirmButtonText: '返回查询界面',
        callback: (action:Action) => {
          router.push("/gene")
        },
      })
    }
    data.databases.shift()
    store.current_select = data.databases[0]
    search.description(store.current_select,descriptions)
    isLoad.value = true
  })
}


query()

function blast(){
  let a = useBlastStore()
  a.content = data.response[store.current_select]['gene']['polypeptide_sequence']
  router.push("/transfer")
}
</script>

<template>
  <el-row v-if="isLoad">
    <el-col :span="4">
      <el-select
          v-model="store.current_select"
          filterable
          placeholder="请选择物种"
          @change="query()"
      >
        <el-option
            v-for="item in data.databases"
            :key="item"
            :label="item"
            :value="item"
        />
      </el-select>

      <div>
        <el-collapse accordion>
          <el-collapse-item v-for="descr in descriptions" :title="descr['source']" :name="descr['source']">
            <div>
              拉丁名：{{descr["latin"]}}<br>
              中文名：{{descr["chinesename"]}}<br>
              链接：<el-tag style="cursor: pointer" type="primary" @click="windows.goLink(descr['link'])">点击前往</el-tag><br>
              描述：{{descr["description"]}}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

    </el-col>
    <el-col :span="1">
      <el-divider style="height: 100%" direction="vertical"/>
    </el-col>
    <el-col :span="19">
      <el-row style="margin: auto">
        <el-text type="primary">系统编号：</el-text>
        <el-tag>{{data.response[store.current_select]["gene"]["funga_id"]}}</el-tag>
        <el-text type="success">标准名称：</el-text>
        <el-tag>{{data.response[store.current_select]["gene"]["symbol"]}}</el-tag>
        <el-text type="success">其他名称：</el-text>
        <el-tag>{{data.response[store.current_select]["gene"]["other_name"]}}</el-tag>
      </el-row>
      <el-row>
        <el-col :span="3">
          <h1>氨基酸序列：</h1>
          <center>
            <el-button @click="copy(data.response[store.current_select]['gene']['polypeptide_sequence'])" type="primary" size="large">复制</el-button><br><br>
            <el-button type="primary" @click="blast()" size="large">比对</el-button>
          </center>
        </el-col>
        <el-col :span="21">
          <el-input
              type="textarea"
              resize="none"
              readonly
              :rows="8"
              v-model="data.response[store.current_select]['gene']['polypeptide_sequence']"
          />
        </el-col>
      </el-row>
      <el-row>
        <br>
      </el-row>
      <el-row>
        <el-col :span="3">
          <h1>表型云图：</h1>
        </el-col>
        <el-col :span="21">
          <el-tooltip v-for="phe in data.response[store.current_select]['phenotypes']" effect="dark" :content="phe.phenotype_ontology + '|' + phe.phenotype_qualifiers">
            <el-button @click="onWordClick(phe.phenotype)">{{ phe['phenotype'] }}</el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row>
        <br>
      </el-row>
      <el-row>
        <el-col :span="3">
          <h1>关系网络：</h1>
        </el-col>
        <el-col v-if="isLoad" :span="21">
          <Interactions :datas="data.response[store.current_select]['graph']"></Interactions>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>