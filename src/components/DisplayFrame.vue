<script setup lang="ts">
let attr = defineProps(["title","img","type","content"])

</script>

<template>
  <el-row v-if="attr.type == 'remap'" justify="center">
    <el-col :span="11">
      <div style="height: 408px">
        <el-image style="border-radius: 10px" fit="scale-down" :src="attr.img">

        </el-image>
      </div>
    </el-col>
    <el-col :span="11">
      <div style="position: relative;top: 10%;height: 408px;margin-left: 20px">
        <el-text class="title" type="success">{{attr.title}}</el-text><br>
        <div style="margin-top: 20px">
          <el-text style="font-size: 20px">{{attr.content}}</el-text>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row v-else justify="center">
    <el-col :span="11">
      <div style="position: relative;top: 10%;height: 408px">
        <el-text class="title" type="success">{{attr.title}}</el-text><br>
        <div style="margin-top: 20px">
          <el-text style="font-size: 20px">{{attr.content}}</el-text>
        </div>
      </div>
    </el-col>
    <el-col :span="11">
      <div style="height: 408px;margin-left: 20px">
        <el-image style="border-radius: 10px" fit="scale-down" :src="attr.img">

        </el-image>
      </div>
    </el-col>
  </el-row>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
</template>

<style scoped>
.title{
  font-size: 35px;
  color: black;
  font-family: 'Microsoft YaHei',serif;
  cursor: pointer;
}
</style>