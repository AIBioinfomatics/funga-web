<script setup lang="ts">

import {search, windows} from "../tools";
import {reactive} from "vue";

let props = defineProps(["databases","current_select"])
let emits =defineEmits(["change"])
let descriptions = reactive({})
function query(){
  search.description(props.current_select,descriptions)
  emits("change")
}
query()
</script>

<template>
  <el-col :span="4">
    <el-select
        v-model="props.current_select"
        filterable
        placeholder="请选择物种"
        @change="query()"
    >
      <el-option
          v-for="item in props.databases"
          :key="item"
          :label="item"
          :value="item"
      />
    </el-select>

    <div>
      <el-collapse accordion>
        <el-collapse-item v-for="descr in descriptions" :title="descr['source']" :name="descr['source']">
          <div>
            拉丁名：{{descr["latin"]}}<br>
            中文名：{{descr["chinesename"]}}<br>
            链接：<el-tag style="cursor: pointer" type="primary" @click="windows.goLink(descr['link'])">点击前往</el-tag><br>
            描述：{{descr["description"]}}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

  </el-col>
</template>

<style scoped>

</style>