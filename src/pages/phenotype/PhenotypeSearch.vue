<script setup lang="ts">
import {usePhenotypeStore} from "../../pinia/Store.ts";
import router from "../../router";
import {ref} from "vue";

const store = usePhenotypeStore()

const input = ref()
const submit = ref()
function select(){
  router.push("/phenotype/display")
}
function check(){
  let result = {
    status: true,
    message: "Unknown"
  }
  if (store.phenotype == undefined || store.phenotype.length == 0){
    result.status = false
    result.message = "基因ID不能为空"
  }
  if (store.phenotype.startsWith(" ")){
    result.status = false
    result.message = "基因ID首字符不能为空格"
  }
  return result
}
</script>

<template>
  <el-row justify="center" align="middle">
    <el-col :span="6">
      <span>表型：</span><el-input ref="input" v-model="store.phenotype" clearable/>
    </el-col>
  </el-row>
  <br>
  <el-row justify="center" align="middle">
    <el-col :span="6">
      <el-button ref="submit" type="primary" @click="select">提交</el-button>
    </el-col>
  </el-row>
  <el-row v-if="!check().status" justify="center" align="middle">
    <el-col :span="24">
      <el-result
          icon="error"
          title="表型不符合规则"
          :sub-title="check().message"
      />
    </el-col>
  </el-row>
  <el-row v-else justify="center" align="middle">
    <el-col :span="24">
      <el-result
          icon="success"
          title="表型符合语法"
          sub-title="点击提交开始搜索"
      />
    </el-col>
  </el-row>
</template>

<style scoped>

</style>