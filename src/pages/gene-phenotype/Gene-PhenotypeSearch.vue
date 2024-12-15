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
    "FUNGA-G-SAC-4707",
    "ACT1",
    "SMC6",
    "BCY1",
    "MLP1",
    "RIM21"
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
    result.message = "Not empty"
  }
  return result
}
geneCache.value = store.genes.join("\n")
cache.value = store.phenotypes.join(";")
</script>

<template>
  <el-row>
    <el-col :span="20">
      <el-row align="middle">
        <el-col :span="24">
          <span>Phenotype：</span><el-input v-model="cache" clearable/>
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
              placeholder="Please enter a list of genes (one per line)"
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
              title="Not in accordance with the rules"
              :sub-title="check().message"
          />
        </el-col>
      </el-row>
      <el-row v-else justify="center" align="middle">
        <el-result
            icon="success"
            title="Grammatically compliant"
            sub-title="Click Submit to start your search"
        />
      </el-row>
      <el-row  justify="center" align="middle">
        <el-button type="primary" @click="select">Submit</el-button>
      </el-row>
      <br>
      <el-row  justify="center" align="middle">
        <el-button type="primary" @click="input">Populate the sample data</el-button>
      </el-row>
      <br>
      <el-row  justify="center" align="middle">
        <el-button type="primary" @click="select">Guidance</el-button>
      </el-row>
      <el-row  justify="center" align="middle">
        <el-checkbox v-model="store.type" label="Intersection Search" value="intersection" />
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>