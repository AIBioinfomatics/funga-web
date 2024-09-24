<script setup lang="ts">
import {useGeneGeneStore} from "../../pinia/Store.ts";
import router from "../../router";
import {ref} from "vue";

let store = useGeneGeneStore()

let input1 = ref()
let input2 = ref()
let submit = ref()
let tour = ref(false)
function write(){
  store.gene1 = "FUN24"
  store.gene2 = "TFC1"
}
function select(){
  if (check().status){
    router.push("/gene-gene/display")
  }
}
function check(){
  let result = {
    status: true,
    message: "Unknown"
  }
  if (store.gene1 == undefined || store.gene1.length == 0 || store.gene2 == undefined || store.gene2.length == 0){
    result.status = false
    result.message = "基因ID不能为空"
  }
  if (store.gene1.startsWith(" ") || store.gene2.startsWith(" ")){
    result.status = false
    result.message = "基因ID首字符不能为空格"
  }
  return result
}
</script>

<template>
  <el-row justify="center" align="middle">
    <el-col :span="6">
      <span>基因一：</span><el-input ref="input1" v-model="store.gene1" clearable/>
    </el-col>
  </el-row>
  <br>
  <el-row  justify="center" align="middle">
    <el-col :span="6">
      <span>基因二：</span><el-input ref="input2" v-model="store.gene2" clearable/>
    </el-col>
  </el-row>
  <br>
  <el-row  justify="center" align="middle">
    <el-col :span="6">
      <el-button type="primary" ref="submit" @click="select">提交</el-button>
      <el-button @click="tour = true">引导</el-button>
      <el-button @click="write()">填充示例数据</el-button>
    </el-col>
  </el-row>
  <el-row v-if="!check().status" justify="center" align="middle">
    <el-col :span="24">
      <el-result
          icon="error"
          title="基因ID不符合规则"
          :sub-title="check().message"
      />
    </el-col>
  </el-row>
  <el-row v-else justify="center" align="middle">
    <el-col :span="24">
      <el-result
          icon="success"
          title="基因ID符合语法"
          sub-title="点击提交开始搜索"
      />
    </el-col>
  </el-row>
  <el-tour v-model="tour" >
    <el-tour-step :target="input1?.$el" title="基因1">
      <div>在这里输入第一个基于名称,系统编号或基因名称都可以.</div><br>
      <div>例如：FUN24</div>
    </el-tour-step>
    <el-tour-step :target="input2?.$el" title="基因2">
      <div>在这里输入第二个基于名称,系统编号或基因名称都可以.</div><br>
      <div>例如：TFC1</div>
    </el-tour-step>
    <el-tour-step :target="submit?.$el" title="提交数据">
      <div>点击这里提交搜索.</div>
    </el-tour-step>
  </el-tour>
</template>

<style scoped>

</style>