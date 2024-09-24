<script setup lang="ts">
import {useGeneStore} from "../../pinia/Store.ts";
import {ElMessage} from "element-plus";
import router from "../../router";
import {ref} from "vue";
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
    ElMessage('搜索不能为空.')
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
              placeholder="请输入基因或描述内容..."
              clearable
              @keyup.enter.native="selectID"
              ref="inputElement"
    >
      <template #append>
        <el-button ref="searchElement" @click="selectID">搜索</el-button>
      </template>
      <template #prepend>
        <el-select ref="selectElement"
            v-model="store.type"
            style="width: 110px"
        >
          <el-option label="精确模式"
              value="accurate"
          />
          <el-option label="语义模式"
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
        * 在该页面，你可以使用
        <el-tag>精确搜索</el-tag>
        或
        <el-tag>模糊搜索</el-tag>
        来搜索您需要了解的基因.
      </el-text>
    </el-row>
    <el-row>
      <el-text class="c">
        * 精确搜索:
      </el-text>
    </el-row>
    <el-row>
      <el-text class="c">
        精确搜索要求您输入无误的基因名称，您可以选择输入 基因名称 或 系统编号 。例如:
        <el-button @click="insertInputValue('FY3T-3856')">系统编号</el-button>
        <el-button @click="insertInputValue('SMC4')">基因名称</el-button>
      </el-text>
    </el-row>
    <el-row>
      <el-text class="c">
        * 模糊搜索:
      </el-text>
    </el-row>
    <el-row>
      <el-text class="c">
        亦或者，您不知道该基因的唯一编号或名称，您可以尝试搜索基因描述以获取一个基因列表，您可以通过点击基因列表里的任意一个基因前往基因描述界面,但前提是您需要选择模糊搜索方式，例如：
        <el-button @click="insertInputValue('Actin');changeSelect('vague')">Actin</el-button>
      </el-text>
    </el-row>
    <el-row>
      <el-text class="c">
        * 系统编号和基因名称可以通过Tools搜索
      </el-text>
    </el-row>
    <el-row>
      <el-button type="primary" @click="tour = true">开始引导</el-button>
    </el-row>
  </div>
  <el-tour v-model="tour" >
    <el-tour-step :target="selectElement?.$el" title="选择搜索方式">
      <div>在这里选择搜索方式.</div><br>
      <div>精确模式：需要输入基因编号或基因名称.</div><br>
      <div>语义模式：需要输入对该基因的描述.</div>
    </el-tour-step>
    <el-tour-step :target="inputElement?.$el" title="输入内容">
      <div>在这里输入基因名称或描述内容.</div><br>
      <div>例如在语义模式下：Actin</div><br>
      <div>例如在精确模式下：FY3T-0</div>
    </el-tour-step>
    <el-tour-step :target="searchElement?.$el" title="提交数据">
      <div>点击这里提交搜索.</div>
    </el-tour-step>
  </el-tour>
</template>

<style scoped>
.c{
  margin-left: 10px;
  font-size: 25px;
}
</style>