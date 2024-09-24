<script setup lang="ts">
import router from "../../router";
import {useGenePhenotypeStore} from "../../pinia/Store.ts";
import {ref} from "vue";

const store = useGenePhenotypeStore()
const geneCache = ref("")
function select(){
  if (check().status){
    store.genes.length = 0
    Object.assign(store.genes,geneCache.value.split("\n"))
    router.push("/gene-phenotype/display")
  }
}
function check(){
  let result = {
    status: true,
    message: "Unknown"
  }
  if (store.phenotype.length == 0 || store.phenotype.length == 0){
    result.status = false
    result.message = "不能为空"
  }
  if (store.genes.join(",").startsWith(" ") || store.phenotype.startsWith(" ")){
    result.status = false
    result.message = "首字符不能为空格"
  }
  return result
}
</script>

<template>
  <el-row>
    <el-col :span="20">
      <el-row align="middle">
        <el-col :span="24">
          <span>表型：</span><el-input v-model="store.phenotype" clearable/>
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
        <el-button type="primary" @click="select">填充示例</el-button>
      </el-row>
      <br>
      <el-row  justify="center" align="middle">
        <el-button type="primary" @click="select">引导</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>