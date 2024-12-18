<script setup lang="ts">
import {search, windows} from "../../tools";
import {reactive} from "vue";
import Statics from "../Statics.vue";
import VueWordCloud from "vuewordcloud";

let staticsData = reactive({
  totalDatabase: 1,
  topGenes:[["TFC3", 0.1], ["VPS8", 0.87], ["EFB1", 0.68], ["SSA1", 0.11], ["ERP2", 0.44], ["FUN14", 0.33], ["SPO7", 0.24], ["MDM10", 0.42], ["SWC3", 0.39], ["CYS3", 0.57], ["DEP1", 0.56], ["SYN8", 0.35], ["NTG1", 0.05], ["TPD3", 0.43], ["PSK1", 0.65], ["LDS1", 0.42], ["FUN30", 0.52], ["ATS1", 0.9], ["CCR4", 0.69], ["FUN26", 0.89], ["PMT2", 0.68], ["LTE1", 0.03], ["MAK16", 0.52], ["DRS2", 0.68], ["SAW1", 0.72], ["FRT2", 0.01], ["MYO4", 0.12], ["SNC1", 0.13], ["GIP4", 0.71], ["PRP45", 0.82], ["GIP3", 0.9], ["GOS1", 0.88], ["MBP1", 0.19], ["GSH1", 0.76], ["PDE1", 0.49], ["PRO1", 0.49], ["ADY4", 0.82], ["MAL42", 0.7], ["FRE8", 0.99], ["RPL6B", 0.94], ["MRX4", 0.81], ["TIP41", 0.18]],
  userActiveNumber: 1000,
  news:[
    {
      title: "Progressive chromatin rewiring by ETO2::GLIS2 revealed in a human iPSC model of pediatric leukemia initiation",
      link: "https://pubmed.ncbi.nlm.nih.gov/39656971/"
    },
    {
      title: "无人扶我青云志，我自踏雪至山巅",
      link: "https://pubmed.ncbi.nlm.nih.gov/39656971/"
    }
  ]
})
search.getStatisticalData(staticsData)
function imgStyle(path:string):string{
  return "border-radius: 20px;height: 90vh;width: 100%;background-image: url('/src/assets/index/"+path+"');background-size: cover"
}
setInterval(function() {
  randomSize()
}, 4900);

function randomSize(){
  for (let i = 0;i<staticsData.topGenes.length;i++) {
    staticsData.topGenes[i][1] = Math.round(Math.random());
  }
}

function randomHexColor() {
  var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
  while (hex.length < 6) {
    hex = '0' + hex;
  }
  return '#' + hex;
}
function onWordClick(word:string){
  window.open(`/gene/${word}`)
}
</script>

<template>
  <el-row>
    <el-row class="news">
      <el-col :span="1">
        <el-image style="height: 20px;margin-left: 16px" fit="fill" src="/src/assets/index/news.png"></el-image>
      </el-col>
      <el-col :span="1">
        <el-carousel direction="vertical" style="width: 50vw" height="30px" arrow="never" indicator-position="none" >
          <el-carousel-item v-for="news in staticsData.news">
            <el-text style="cursor: pointer;color: #f2eada" @click="windows.goLink(news.link)">{{news.title}}</el-text>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>

    <el-card class="info">
      <span class="title">FUNGA</span>
      <hr class="line">
      <p class="content">FUNGA (Functional Gene Annotation Exploitation Platform) is a platform that utilizes artificial intelligence technology to mine gene functions. By integrating a large amount of cross species genetic information from animals, plants, and fungi with private data, an online analysis platform has been constructed, greatly reducing research time and advancing the research process.</p>
      <el-row>
        <el-col :span="8">
          <statics title="Number of databases" :content="staticsData.totalDatabase" />
        </el-col>
        <el-col :span="8">
          <statics title="Daily active users" :content="staticsData.userActiveNumber + '+'" />
        </el-col>
        <el-col :span="8">
          <statics title="Increase volume today" :content="86398" />
        </el-col>
      </el-row>
    </el-card>
    <div class="top-genes">
      <vue-word-cloud :animation-duration="5000" enter-animation="animated flipX" leave-animation="animated flipX" font-family="Baloo Bhaijaan" :color="randomHexColor" :spacing="1" :font-size-ratio="1/5" :words="staticsData.topGenes">
        <template #default="{text, weight, word}">
                <span style="cursor: pointer;" @click="onWordClick(word[1])">
                  {{ text }}
                </span>
        </template>
      </vue-word-cloud>
      <el-row justify="center">
        <span style="align-content: center" class="content">▲ Today's hot genes ▲</span>
      </el-row>
    </div>
    <!--

    -->
    <el-carousel :motion-blur="true" :pause-on-hoverf="false" arrow="never" indicator-position="none" style="border-radius: 20px;height: 90vh;width: 100%" >
      <el-carousel-item v-for="number in 3" :style="imgStyle('carousel-'+number+'.jpg')" />
    </el-carousel>

  </el-row>
</template>

<style scoped>
.content{
  font-size: 20px;
  text-indent: 2em;
  background: transparent;
  color: #f2eada;
  text-align: justify;
  text-align-last: justify;
  text-shadow: 1px 1px 4px black;
}

.title{
  font-size: 30px;
  color: #f2eada;
  cursor: pointer;
  background: transparent;
  text-shadow: 2px 2px 4px black;
}
.line{
  height: 3px;
  background-color: #f2eada;
  border: none;
}
.info{
  position: absolute;
  z-index: 100;
  margin-left: 10%;
  margin-top: 10%;
  width: 30%;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
}
.news{
  position: absolute;
  z-index: 200;
  margin-left: 8%;
  margin-top: 40%;
}
.top-genes{
  position: absolute;
  margin-left: 55%;
  margin-top: 8%;
  z-index: 100;
  width: 600px;
  height: 600px;
}
</style>