<script setup lang="ts">
import router from "../../router";
import {useGenePhenotypeStore} from "../../pinia/Store.ts";
import {ref} from "vue";

const store = useGenePhenotypeStore()
const geneCache = ref("")
let cache = ref("")
function select(){
  if (check().status){
    store.genes.length = 0
    Object.assign(store.genes,geneCache.value.split("\n"))
    store.phenotypes.length = 0
    Object.assign(store.phenotypes,cache.value.split(";"))
    router.push("/gene-phenotype/display")
  }
}
function input(){
  cache.value = "heat;growth"
  store.phenotypes.length = 0
  Object.assign(store.phenotypes,["heat","growth"])
  store.genes.length = 0
  Object.assign(store.genes,[
    "FY3T-3281",
    "FY3T-3350",
    "FY3T-2357",
    "FY3T-13",
    "FY3T-65",
    "FY3T-342",
    "FY3T-23544",
    "FY3T-9870",
    "FY3T-7878",
    "FY3T-123",
    "FY3T-43",
    "FY3T-33"
  ])
  geneCache.value = store.genes.join("\n");
}
function check(){
  let result = {
    status: true,
    message: "Unknown"
  }
  if (geneCache.value.length == 0 && cache.value.length == 0){
    result.status = false
    result.message = "不能为空"
  }
  return result
}

</script>

<template>
  <el-row>
    <el-col :span="20">
      <el-row align="middle">
        <el-col :span="24">
          <span>表型：</span><el-input v-model="cache" clearable/>
        </el-col>
      </el-row>
      <br>
      <el-row align="middle">
        <el-col :span="24">
          <el-input
              :rows="30"
              v-model="geneCache"
              resize="none"
              type="textarea"
              placeholder="请输入基因列表(一行一个)"
              clearable
          />
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="4" style="margin: auto">
      <el-row v-if="!check().status" justify="center" align="middle">
        <el-col :span="24">
          <el-result
              icon="error"
              title="不符合规则"
              :sub-title="check().message"
          />
        </el-col>
      </el-row>
      <el-row v-else justify="center" align="middle">
        <el-result
            icon="success"
            title="符合语法"
            sub-title="点击提交开始搜索"
        />
      </el-row>
      <el-row  justify="center" align="middle">
        <el-button type="primary" @click="select">提交</el-button>
      </el-row>
      <br>
      <el-row  justify="center" align="middle">
        <el-button type="primary" @click="input">填充示例</el-button>
      </el-row>
      <br>
      <el-row  justify="center" align="middle">
        <el-button type="primary" @click="select">引导</el-button>
      </el-row>
      <el-row  justify="center" align="middle">
        <el-checkbox v-model="store.include_outer" label="包含外部基因" value="include_outer" />
        <el-checkbox v-model="store.type" label="交集搜索" value="intersection" />
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>