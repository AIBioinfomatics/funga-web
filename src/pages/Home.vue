<script lang="ts" setup>
import {reactive} from "vue";
import {windows} from "../tools";
import {Bell, Document, Location, TrendCharts} from "@element-plus/icons-vue";
import InfoFrame from "../components/InfoFrame.vue";
import DisplayFrame from "../components/DisplayFrame.vue";
import Interactions from "../components/Interactions.vue";
const imgs = reactive([])
const news = reactive([])
simulate()
function simulate(){
  const data = [
    {
      title: "食用菌表型组技术研究进展",
      image: "https://manu40.magtech.com.cn/Jwxb/fileup/1672-6472/PIC/1620609448895-734837102_pic.jpg",
      url: "https://manu40.magtech.com.cn/Jwxb/CN/10.13346/j.mycosystema.210075"
    },
    {
      title: "吉师风范丨李玉：蘑菇院士的家国情怀",
      image: "http://inews.gtimg.com/newsapp_bt/0/13209405026/641",
      url: "https://mp.weixin.qq.com/s?__biz=MjM5OTMxMjM5OA==&mid=2651144350&idx=2&sn=e0b1976e8cbc88d5fa9cd8d356e05c70&chksm=bddbed3aa23034c3d213add09cd69f0a2cb7917cf271f4595e4b1e6bd0706bdf4ebe3756ee19&scene=27"
    },
    {
      title:"吉林农业大学微生物学学科首次进入ESI全球学科排名前1%",
      url: "https://news.sina.com.cn/zx/gj/2024-09-13/doc-incnyqcu2570974.shtml",
      image: "https://k.sinaimg.cn/n/spider20240913/338/w1080h858/20240913/4daa-9e494fa9074ad9dda2ac6e6dc35479b2.png/w700d1q75cms.jpg?by=cms_fixed_width"
    },
    {
      title: "喜讯：吉林农业大学新增7个国家级一流本科专业建设点",
      url: "https://www.jlau.edu.cn/info/1023/23310.htm",
      image: "https://www.jlau.edu.cn/__local/C/23/2C/C7A70F0E79E0E98F70D3C772ADE_B49F5C16_53EE0.png"
    }
  ]
  Object.assign(imgs,data)
  const data1 = [
    {
      title: "Representing core gene expression activity relationships using the latent structure implicit in Bayesian networks",
      url: "https://academic.oup.com/bioinformatics/article/40/8/btae463/7720781?login=false"
    }
  ]
  Object.assign(news,data1)

}
const __graph_json_data = {
  'rootId': 'a',
  'nodes': [
    { 'id': 'a', 'text': 'a', data: { iconColor: 'yellow', icon: 'el-icon-star-on' } },
    { 'id': 'b', 'text': 'b', data: { iconColor: 'yellow', icon: 'el-icon-star-on' } },
    { 'id': 'b1', 'text': 'b1', data: { iconColor: 'yellow', icon: 'el-icon-star-on' } },
    { 'id': 'b1-1', 'text': 'b1-1', data: { iconColor: 'blue', icon: 'el-icon-user-solid' } },
    { 'id': 'b1-2', 'text': 'b1-2', data: { iconColor: 'blue', icon: 'el-icon-user-solid' } },
    { 'id': 'b1-3', 'text': 'b1-3', data: { iconColor: 'blue', icon: 'el-icon-user-solid' } },
    { 'id': 'b1-4', 'text': 'b1-4', data: { iconColor: 'blue', icon: 'el-icon-s-promotion' } },
    { 'id': 'b1-5', 'text': 'b1-5', data: { iconColor: 'blue', icon: 'el-icon-s-promotion' } },
    { 'id': 'b1-6', 'text': 'b1-6', data: { iconColor: 'blue', icon: 'el-icon-s-promotion' } },
    { 'id': 'b2', 'text': 'b2', data: { iconColor: 'red', icon:'el-icon-basketball' }},
    { 'id': 'b2-1', 'text': 'b2-1', data: { iconColor: 'red', icon:'el-icon-basketball'} },
    { 'id': 'b2-2', 'text': 'b2-2', data: { iconColor: 'red', icon:'el-icon-basketball'} },
    { 'id': 'c', 'text': 'c', data: { iconColor: 'purple', icon: 'el-icon-potato-strips' } },
    { 'id': 'c1', 'text': 'c1', data: { iconColor: 'purple', icon: 'el-icon-potato-strips' } },
    { 'id': 'c2', 'text': 'c2', data: { iconColor: 'purple', icon: 'el-icon-potato-strips' } },
    { 'id': 'c3', 'text': 'c3', data: { iconColor: 'purple', icon: 'el-icon-potato-strips' } }],
  'lines': [
    { 'from': 'a', 'to': 'b', text: '' },
    { 'from': 'b', 'to': 'b1', text: '' },
    { 'from': 'b1', 'to': 'b1-1', text: '' },
    { 'from': 'b1', 'to': 'b1-2', text: '' },
    { 'from': 'b1', 'to': 'b1-3', text: '' },
    { 'from': 'b1', 'to': 'b1-4', text: '' },
    { 'from': 'b1', 'to': 'b1-5', text: '' },
    { 'from': 'b1', 'to': 'b1-6', text: '' },
    { 'from': 'b', 'to': 'b2', text: '' },
    { 'from': 'b2', 'to': 'b2-1', text: '' },
    { 'from': 'b2', 'to': 'b2-2', text: '' },
    { 'from': 'a', 'to': 'c', text: '' },
    { 'from': 'c', 'to': 'c1', text: '' },
    { 'from': 'c', 'to': 'c2', text: '' },
    { 'from': 'c', 'to': 'c3', text: '' }]
};
</script>
<template>
  <el-row justify="center" style="width: 100%">
    <el-col :span="11" style="margin-top: 30px">
      <div style="position: relative;top: 10%">
        <div class="box">
          <el-text class="text" type="success">FUNGA-Bioinformatics intelligence</el-text><br>
        </div>
        <div class="box">
          <el-text class="text" style="font-size: 35px" type="primary">Large language models help biological data analysis···</el-text>
        </div>
        <div class="box">
          <el-text class="text" style="font-size: 20px">FUNGA integrates large models of bioinformatics and artificial intelligence to analyze large-scale biological data with high throughput. The integration of interdisciplines will lead the current frontier of biology and bring new research and application paradigms to related fields. It is highly customizable, can be flexibly configured according to user needs, supports a variety of data formats and processing methods, and provides users with comprehensive data analysis and decision support capabilities.</el-text>
        </div>
        <div class="box">
          <el-button type="primary">Documentation</el-button>
          <el-button >New database</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="11" style="margin-top: 15px">
      <el-carousel indicator-position="outside" height="500px" motion-blur autoplay>
        <el-carousel-item v-for="item in imgs" :key="item['title']">
          <el-image @click="windows.goLink(item['url'])" style="cursor: pointer;height: 470px;width: 100%" fit="fill" :src="item['image']"></el-image>
          <el-row justify="center" align="middle">
            <el-text type="info" style="cursor: pointer" @click="windows.goLink(item['url'])">{{item['title']}}</el-text>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>
  <el-row class="notice" justify="center">
    &nbsp
    <el-icon size="25px"><Bell /></el-icon>
    <el-text @click="windows.goLink(news[0]['url'])" style="cursor:pointer; margin-left: 5px">{{news[0]['title']}}</el-text>
    &nbsp&nbsp
  </el-row>
  <br>
  <display-frame title="Number of databases" img="/src/assets/database.png" content="This site has collected a large number of genetic data and phenotypic data including fungi, animals and plants, and built more than 300+ database catalogs, which can be used to accelerate retrieval through large language models and quickly complete general tasks."></display-frame>
  <display-frame type="remap" title="Powered by large language models" img="/src/assets/llm.webp" content="This project uses new algorithms and parameters to modify or fine-tune existing open-source large language models to achieve the effect of in-depth application in vertical fields. It can capture the dynamic association of different gene sequences and expressions in different samples, tissues, and cells in different environmental backgrounds, with a model parameter scale of 11 billion."></display-frame>
  <display-frame title="No programming analysis" img="/src/assets/code.jpg" content="By training and integrating the data information and prior knowledge of different species, the transfer learning of downstream tasks of multiple species can be realized, which fully demonstrates the strategic advantages of pre-training based on multi-species labeled big data and then using different sub-task data for model fine-tuning, which is expected to become a general solution for the analysis and prediction of biological problems such as gene function and gene network mining."></display-frame>
  <display-frame type="remap" title="Experienced team" img="/src/assets/team.jpg" content="Our team has gathered a group of experts who have been deeply involved in the fields of artificial intelligence and bioinformatics for many years. With rich project experience and profound professional knowledge, they have successfully applied artificial intelligence technology to multiple bioinformatics research fields such as gene sequencing, protein structure prediction, and disease prediction. Our team is committed to promoting the deep integration of artificial intelligence and bioinformatics, providing efficient and accurate data analysis and solutions for researchers, and helping biomedical research make breakthrough progress."></display-frame>
</template>
<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}
.text{
  font-size: 40px;
  font-family: 'Microsoft YaHei',serif;
}
.box{
  margin: 20px;
}
.notice{
  border-style: solid;
  border-radius: 20px;
  border-color: darkgrey;
  width: fit-content;
  margin: 15px auto 0 auto;
}
</style>