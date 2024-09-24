<script lang="ts" setup>
import {reactive} from "vue";
import {windows} from "../tools";
import {Bell, Document, Location, TrendCharts} from "@element-plus/icons-vue";
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
</script>
<template>
  <el-row style="width: 100%">
    <el-col :span="12" style="margin-top: 30px">
      <div style="position: relative;top: 10%">
        <div class="box">
          <el-text class="text" type="success">FUNGA-生物信息智能化</el-text><br>
        </div>
        <div class="box">
          <el-text class="text" style="font-size: 35px" type="primary">大语言模型助力生物数据分析···</el-text>
        </div>
        <div class="box">
          <el-text class="text" style="font-size: 20px">FUNGA集成了生物信息学和人工智能的大模型，能够高吞吐量地分析大规模生物数据。跨学科的融合将引领当前的生物学前沿，为相关领域带来新的研究和应用范式。它具有高度的可定制性，可以根据用户需求灵活配置，支持多种数据格式和处理方法，为用户提供全面的数据分析和决策支持能力。</el-text>
        </div>
        <div class="box">
          <el-button type="primary">使用文档</el-button>
          <el-button >申请加入新品种</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="12" style="margin-top: 15px">
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

  <el-row justify="center" style="margin-top: 15px">
    <el-card style="width: 480px" shadow="hover">
      <el-row>
        <el-icon size="40px"><Document /></el-icon>
        <el-text size="large" style="margin-left: 10px">数据库数量</el-text>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-text>本站收集了包含菌物、动物以及植物的大量基因数据和表型数据，构建了超过300+数据库目录，通过大语言模型加速检索，能够快速的完成通用任务。</el-text>
      </el-row>
    </el-card>
    <el-card style="width: 480px; margin-left: 20px" shadow="hover">
      <el-row>
        <el-icon size="40px"><TrendCharts /></el-icon>
        <el-text size="large" style="margin-left: 10px">大语言模型助力</el-text>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-text>本项目使用新的算法和参数去修改或微调现有的开源大语言模型，达到垂直领域深度应用的效果。可捕获不同基因序列和表达在不同样品、组织和细胞在不同环境背景下的动态关联关系，模型参数规模达110亿。</el-text>
      </el-row>
    </el-card>
    <el-card style="width: 480px; margin-left: 20px" shadow="hover">
      <el-row>
        <el-icon size="40px"><Location /></el-icon>
        <el-text size="large" style="margin-left: 10px">无编程分析</el-text>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-text>通过训练整合不同物种的数据信息及先验知识，可以实现多个物种下游任务的迁移学习，充分展示了基于多物种无标注大数据预训练，再利用不同子任务数据进行模型微调的策略优势，有望成为实现基因功能和基因网络挖掘等生物问题分析预测的通用解决方案。</el-text>
      </el-row>
    </el-card>
  </el-row>
  <el-row class="notice" justify="center">
    &nbsp
    <el-icon size="25px"><Bell /></el-icon>
    <el-text @click="windows.goLink(news[0]['url'])" style="cursor:pointer; margin-left: 5px">{{news[0]['title']}}</el-text>
    &nbsp&nbsp
  </el-row>
</template>
<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}
.text{
  font-size: 50px;
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