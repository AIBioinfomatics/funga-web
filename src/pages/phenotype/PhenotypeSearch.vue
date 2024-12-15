<script setup lang="ts">
import {usePhenotypeStore} from "../../pinia/Store.ts";
import router from "../../router";
import {ref} from "vue";
const store = usePhenotypeStore()
store.type = "ontology"
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
    result.message = "Not Empty"
  }
  if (store.phenotype.startsWith(" ")){
    result.status = false
    result.message = "The first character cannot be a space"
  }
  return result
}
</script>

<template>
  <el-row justify="center" align="middle">
    <el-col :span="6">
      <span>Phenotype：</span><el-input ref="input" v-model="store.phenotype" clearable/>
    </el-col>
  </el-row>
  <br>
  <el-row justify="center" align="middle">
    <el-col :span="6">
      <el-button ref="submit" type="primary" @click="select">Submit</el-button>
    </el-col>
  </el-row>
  <el-row v-if="!check().status" justify="center" align="middle">
    <el-col :span="24">
      <el-result
          icon="error"
          title="The phenotype does not conform to the rules"
          :sub-title="check().message"
      />
    </el-col>
  </el-row>
  <el-row v-else justify="center" align="middle">
    <el-col :span="24">
      <el-result
          icon="success"
          title="The phenotype conforms to the syntax"
          sub-title="Click Submit to start your search"
      />
    </el-col>
  </el-row>
</template>

<style scoped>

</style>