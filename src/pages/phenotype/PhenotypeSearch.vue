<script setup lang="ts">
import {usePhenotypeStore} from "../../pinia/Store.ts";
import router from "../../router";
import {ref} from "vue";

const store = usePhenotypeStore()

const input = ref()
const submit = ref()
const r1 = ref()
const r2 = ref()
const r3 = ref()
const r4 = ref()
const tour = ref(false)
function select(){
  if (check().status){
    if (store.type == "standard"){
      router.push("/phenotype/standard")
    }else {
      router.push("/phenotype/display")
    }
  }
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
  <el-row justify="center" align="middle">
    <el-col :span="6">
      <span>搜索方式：</span>
      <el-radio-group v-model="store.type">
        <el-radio ref="r1" value="conservative">保守</el-radio>
        <el-radio ref="r2" value="tolerate">宽容</el-radio>
        <el-radio ref="r3" value="freedom">自由</el-radio>
        <el-radio ref="r4" value="standard">标准</el-radio>
      </el-radio-group>
    </el-col>
  </el-row>
  <br>
  <el-row justify="center" align="middle">
    <el-col :span="6">
      <el-button ref="submit" type="primary" @click="select">提交</el-button>
      <el-button @click="tour = true">引导</el-button>
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
  <el-tour v-model="tour" >
    <el-tour-step :target="input?.$el" title="表型">
      <div>在这里输入你想要了解的表型.</div><br>
      <div>语句中通常含有表型和限定词,例如：身高是一个表型，那么在这句话中.</div><br>
      <div>身高长得矮，那么表型将是身高，限定词将为矮</div><br>
      <div>例如：inviable</div>
    </el-tour-step>
    <el-tour-step :target="r1?.$el" title="保守搜索模式">
      <div>将最精准的去匹配您输入的表型和限定词.</div><br>
    </el-tour-step>
    <el-tour-step :target="r2?.$el" title="宽容搜索模式">
      <div>将模糊匹配您的表型和限定词.</div><br>
    </el-tour-step>
    <el-tour-step :target="r3?.$el" title="自由搜索模式">
      <div>完全匹配您的表型，而不关心限定词.</div><br>
    </el-tour-step>
    <el-tour-step :target="r4?.$el" title="标准搜索模式">
      <div>自己选择Phenotype Ontology.</div><br>
    </el-tour-step>
    <el-tour-step :target="submit?.$el" title="提交数据">
      <div>点击这里提交搜索.</div>
    </el-tour-step>
  </el-tour>
</template>

<style scoped>

</style>