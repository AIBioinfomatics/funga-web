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
    result.message = "cannot be empty"
  }
  if (store.gene1.startsWith(" ") || store.gene2.startsWith(" ")){
    result.status = false
    result.message = "The first character cannot be a space"
  }
  return result
}
</script>

<template>
  <el-row justify="center" align="middle">
    <el-col :span="6">
      <span>Gene I：</span><el-input ref="input1" v-model="store.gene1" clearable/>
    </el-col>
  </el-row>
  <br>
  <el-row  justify="center" align="middle">
    <el-col :span="6">
      <span>Gene II：</span><el-input ref="input2" v-model="store.gene2" clearable/>
    </el-col>
  </el-row>
  <br>
  <el-row  justify="center" align="middle">
    <el-col :span="6">
      <el-button type="primary" ref="submit" @click="select">Submit</el-button>
      <el-button @click="tour = true">Guide</el-button>
      <el-button @click="write()">Populate the sample data</el-button>
    </el-col>
  </el-row>
  <el-row v-if="!check().status" justify="center" align="middle">
    <el-col :span="24">
      <el-result
          icon="error"
          title="Not in accordance with the rules"
          :sub-title="check().message"
      />
    </el-col>
  </el-row>
  <el-row v-else justify="center" align="middle">
    <el-col :span="24">
      <el-result
          icon="success"
          title="Grammatically compliant"
          sub-title="Click Submit to start your search"
      />
    </el-col>
  </el-row>
  <el-tour v-model="tour" >
    <el-tour-step :target="input1?.$el" title="Gene I">
      <div>Enter the first one here based on the name, the FUNGA ID or the gene name.</div><br>
      <div>Example：FUN24</div>
    </el-tour-step>
    <el-tour-step :target="input2?.$el" title="Gene II">
      <div>Enter the second one here based on the name, the FUNGA ID or the gene name.</div><br>
      <div>Example：TFC1</div>
    </el-tour-step>
    <el-tour-step :target="submit?.$el" title="Submit">
      <div>Click here to submit.</div>
    </el-tour-step>
  </el-tour>
</template>

<style scoped>

</style>