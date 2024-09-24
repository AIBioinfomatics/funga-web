<script setup lang="ts">
import {Action, ElMessageBox} from "element-plus";
import {search, windows} from "../../tools"
import router from "../../router";
import {useGeneGeneStore} from "../../pinia/Store.ts";
import {reactive, ref} from "vue";

let store = useGeneGeneStore()

let currentPage = ref(1)
function alterPage(n:number){
  currentPage.value = n
}
function goGene(id:string){
  window.open("/gene/"+id)
}

let isLoad = ref(false)
let data = reactive({
  databases: ["#all"],
  interaction: [
    {
      gene1: "",
      gene2: "",
      type: "",
      link: "",
      species: "",
      source: "",
      reference: []
    }
  ],
  status: "OK"
})
function slice(){
  return [((currentPage.value-1)*10),(currentPage.value * 10)-1]
}
function query(){
  if (store.gene1.length == 0 || store.gene2.length == 0){
    router.push("/gene-gene/search")
  }else {
    search.genegene(store,data,function (){
      isLoad.value = true
      if (data.status == "Error"){
        ElMessageBox.alert('没有查询到相关结果.', '通知', {
          confirmButtonText: '返回查询界面',
          callback: (action:Action) => {
            router.push("/gene-gene")
          },
        })
      }
    })
    search.description(store.current_select,descriptions)
  }
}

const descriptions = reactive([])
query()
</script>

<template>
  <el-row>
    <el-col :span="4">
      <el-select
          v-model="store.current_select"
          filterable
          placeholder="请选择物种"
          @change="query()"
      >
        <el-option
            label="全部"
            value="#all"
        />
        <el-option
            v-for="item in data.databases"
            :key="item"
            :label="item"
            :value="item"
        />
      </el-select>

      <div v-if="store.current_select != '#all'">
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
      <el-row justify="center">
        <el-text @click="goGene(<string>store.gene1)" class="gene" type="primary" >{{store.gene1}}</el-text>
        <h1>&nbsp————&nbsp</h1>
        <el-text @click="goGene(<string>store.gene2)" class="gene" type="primary">{{store.gene2}}</el-text>
      </el-row>
      <el-row>
        <br>
      </el-row>
      <el-row>
        <h1>置信度评分表：</h1>
      </el-row>
      <el-row justify="center">
        <el-col v-if="isLoad" :span="24">
          <el-descriptions v-for="item in data.interaction.slice(slice()[0],slice()[1])" style="margin-bottom: 5px" border :column="3">
            <el-descriptions-item label="基因I">{{ item.gene1}}</el-descriptions-item>
            <el-descriptions-item label="基因II">{{ item.gene2 }}</el-descriptions-item>
            <el-descriptions-item label="互作类型">{{ item.type}}</el-descriptions-item>
            <el-descriptions-item label="物种">{{ item.species}}</el-descriptions-item>
            <el-descriptions-item label="评分">100</el-descriptions-item>
            <el-descriptions-item label="来源">{{ item.source}}</el-descriptions-item>
            <el-descriptions-item :span="3" label="链接">{{ item.link}}</el-descriptions-item>
            <el-descriptions-item label="引证">{{ item.reference }}</el-descriptions-item>
          </el-descriptions>
        </el-col>
        <el-col v-else :span="24">
          <el-row justify="center" align="middle">
            <el-col :span="24">
              <el-result
                  icon="info"
                  title="搜索中"
                  sub-title="请稍作等待···"
              />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-pagination @update:current-page="alterPage" :current-page="currentPage" :page-size="10" background layout="prev, pager, next" :total="data.interaction.length" />
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