<script setup lang="ts">
import {reactive, ref} from "vue";
import {search, windows} from "../../tools";
import Interactions from "../../components/Interactions.vue";
import {useGenePhenotypeStore} from "../../pinia/Store.ts";
import router from "../../router";
import {Action, ElMessageBox} from "element-plus";
import { Marked } from '@ts-stack/markdown';

let store = useGenePhenotypeStore()
let isLoad = ref(false)
let inter = ref()
let data = reactive({
  databases: ["#all"],
  status: "OK",
  graph:{

  },
  phenotype_ontology_mapping:[

  ],
  genes:[

  ],
  summary: "### 正在生成中,请等待"
})
function query(){
  if (store.phenotypes.length == 0 || store.genes.length == 0){
    router.push("/gene-phenotype/search")
  }else {
    search.genephenotype(store,data,function (){
      isLoad.value = true
      console.log(JSON.stringify(data))
      if (data.status == "Error"){
        ElMessageBox.alert('没有查询到相关结果.', '通知', {
          confirmButtonText: '返回查询界面',
          callback: (action:Action) => {
            router.push("/gene-phenotype")
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
  <el-row v-loading="!isLoad">
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
          <el-table :data="data.genes">
            <el-table-column prop="gene" label="基因"></el-table-column>
            <el-table-column prop="phenotype" label="表型" width="180" />
            <el-table-column prop="source" label="来源" width="180" />

            <el-table-column label="引证">
              <template #default="scope">
                <el-button @click="windows.showWindow('引证',['引证：' + scope.row.reference])">点击查看</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="评分" />
            <el-table-column prop="similarity" label="相似度"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-row>
          <h1>基因互作网络：</h1>
        </el-row>
        <el-col :span="24">
          <Interactions ref="inter" v-if="isLoad" :datas="data.graph"/>
          <div v-else>
            请选择物种
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-row>
          <h1>摘要：</h1>
        </el-row>
        <el-col :span="24">
          <el-card shadow="always" v-html="Marked.parse(data.summary)">
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>