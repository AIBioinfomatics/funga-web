<script setup lang="ts">
import {reactive, ref} from "vue";

import {usePhenotypeStore} from "../../pinia/Store.ts";
import router from "../../router";
import {search, windows} from "../../tools";
import {Action, ElMessageBox} from "element-plus";

const store = usePhenotypeStore()
let isLoad = ref(false)
let data = reactive({
  databases: ["#all"],
  genes:[

  ],
  go:[

  ],
  status: "OK"
})
function query(){
  if (store.phenotype.length == 0 || store.phenotype.length == 0){
    router.push("/phenotype/search")
  }else {
    search.phenotype(store,data,function (){
      isLoad.value = true
      if (data.status == "Error"){
        ElMessageBox.alert('没有查询到相关结果.', '通知', {
          confirmButtonText: '返回查询界面',
          callback: (action:Action) => {
            router.push("/phenotype")
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
    <el-col v-loading="!isLoad" :span="19">
      <el-row style="height: 10vh" align="middle" justify="center">
        <el-text type="primary" style="font-size: 10px">{{store.phenotype}}</el-text>
      </el-row>
      <el-row>
        <el-col :span="21">
          <h1>基因详情：</h1>
          <el-table :data="data.genes">
            <el-table-column prop="gene" label="基因" width="180" />
            <el-table-column prop="phenotype" label="表型" width="180" />

            <el-table-column prop="source" label="来源" width="180" />
            <el-table-column prop="similarity" label="相似度"></el-table-column>
            <el-table-column label="引证">
              <template #default="scope">
                <el-button @click="windows.showWindow('引证',scope.row.reference)">点击查看</el-button>
              </template>
            </el-table-column>

            <el-table-column label="基因链接">
              <template #default="scope">
                <el-button @click="windows.goLink('/gene/' + scope.row.gene)">点击查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="21">
          <h1>Related GO：</h1>
          <el-table :data="data.go">
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