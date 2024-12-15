<script setup lang="ts">

import {search, windows} from "../tools";
import {reactive} from "vue";
import {lang} from "../lang";

let props = defineProps(["databases","current_select"])
let emits =defineEmits(["change"])
let descriptions = reactive({})
function query(){
  search.description(props.current_select,descriptions)
}
query()
</script>

<template>
  <el-col :span="4">
    <el-select
        v-model="props.current_select"
        filterable
        :placeholder="lang.display.components.SideBar.select_db"
        @change="query();  emits('change')"
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
          <div v-if="descr['latin'] != null || descr['latin'] != ''">
            {{ lang.display.components.SideBar.latin }}：<i>{{descr["latin"]}}</i><br>
            {{ lang.display.components.SideBar.chinese }}：{{descr["chinesename"]}}<br>
            {{ lang.display.components.SideBar.link }}：<el-tag style="cursor: pointer" type="primary" @click="windows.goLink(descr['link'])">点击前往</el-tag><br>
            {{ lang.display.components.SideBar.description }}：{{descr["description"]}}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

  </el-col>
</template>

<style scoped>

</style>