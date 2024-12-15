<script setup lang="ts">
import {useGeneStore} from "../../pinia/Store.ts";
import {ElMessage} from "element-plus";
import router from "../../router";
import {ref} from "vue";
import {lang} from "../../lang";
let store = useGeneStore()

let selectElement = ref()
let inputElement = ref()
let searchElement = ref()
let tour = ref(false)

function insertInputValue(value:string){
  store.content = value
  changeSelect("accurate")
}
function changeSelect(v:string) {
  store.type = v
}
function selectID(){
  if (store.content == undefined || store.content.length == 0){
    ElMessage(lang.display.common.empty)
    return
  }
  if (store.type == "vague"){
    router.push("/gene/vague")
  }else {
    router.push("/gene/display")
  }
}
</script>

<template>
  <el-row justify="center" align="middle">
    <el-input v-model="store.content"
              placeholder="Please enter a gene or description..."
              clearable
              @keyup.enter.native="selectID"
              ref="inputElement"
    >
      <template #append>
        <el-button ref="searchElement" @click="selectID">{{ lang.display.common.btn_search }}</el-button>
      </template>
      <template #prepend>
        <el-select ref="selectElement"
            v-model="store.type"
            style="width: 110px"
        >
          <el-option label="Precision patterns"
              value="accurate"
          />
          <el-option label="Semantic patterns"
                     value="vague"
          />
        </el-select>
      </template>
    </el-input>

  </el-row>
  <hr>
  <div style="margin-top: 20px">
    <el-row>
      <el-text style="font-size: 30px" tag="b" size="large">How to use?</el-text>
    </el-row>
    <el-row>
      <el-text class="c">
        * On this page, you can use
        <el-tag>Precision patterns</el-tag>
        or
        <el-tag>Semantic patterns</el-tag>
        to search for the genes you need to know.
      </el-text>
    </el-row>
    <el-row>
      <el-text class="c">
        * Precision patterns:
      </el-text>
    </el-row>
    <el-row>
      <el-text class="c">
        The precision patterns requires you to enter an incorrect gene name, either by gene name or FUNGA ID. For example:
        <el-button @click="insertInputValue('FY3T-3856')">FUNGA ID</el-button>
        <el-button @click="insertInputValue('VPS70')">Gene Symbol</el-button>
      </el-text>
    </el-row>
    <el-row>
      <el-text class="c">
        * Semantic patterns:
      </el-text>
    </el-row>
    <el-row>
      <el-text class="c">
        Or, if you don't know the unique number or name of the gene, you can try searching for a gene description to get a gene list, you can click on any gene in the gene list to go to the gene description interface, but only if you choose a fuzzy semantic patterns, for example:
        <el-button @click="insertInputValue('Actin');changeSelect('vague')">Actin</el-button>
      </el-text>
    </el-row>
    <el-row>
      <el-text class="c">
        * The FUNGA ID and gene symbol can be searched through Transfer
      </el-text>
    </el-row>
    <el-row>
      <el-button type="primary" @click="tour = true">{{ lang.display.common.btn_tour }}</el-button>
    </el-row>
  </div>
  <el-tour v-model="tour" >
    <el-tour-step :target="selectElement?.$el" title="Select how you want to search">
      <div>Select your search method here</div><br>
      <div>Precision pattern: You need to enter the FUNGA ID or gene name</div><br>
      <div>Semantic pattern: A description of the gene needs to be entered</div>
    </el-tour-step>
    <el-tour-step :target="inputElement?.$el" title="Input">
<div>Enter the gene name or description here</div><br>
      <div>For example, in semantic pattern: Actin</div><br>
      <div>For example, in precision pattern: FY3T-0</div>
    </el-tour-step>
    <el-tour-step :target="searchElement?.$el" title="Submit">
      <div>Click it to submit.</div>
    </el-tour-step>
  </el-tour>
</template>

<style scoped>
.c{
  margin-left: 10px;
  font-size: 25px;
}
</style>