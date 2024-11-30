<script setup lang="ts">
import RelationGraphComponent, {RGLine, RGLink, RGNode} from "relation-graph-vue3";

let props = defineProps(["datas"])
import RelationGraph, {RGOptions} from "relation-graph-vue3";
import {onMounted, reactive, ref} from "vue";
import {search} from "../tools";
import {usePhenotypeOntologySelectorStore} from "../pinia/Store.ts";
const graphRef = ref<RelationGraphComponent | null>(null);

const graphOptions: RGOptions = {
  'layouts': [
    {
      'label': '中心',
      'layoutName': 'tree',
      'layoutClassName': 'seeks-layout-center',
      'defaultJunctionPoint': 'border',
      'defaultNodeShape': 0,
      'defaultLineShape': 1,
      'from': 'right',

    }
  ],
  'defaultLineMarker': {
    'markerWidth': 12,
    'markerHeight': 12,
    'refX': 6,
    'refY': 6,
    'data': 'M2,2 L10,6 L2,10 L6,6 L2,2'
  },
  'defaultNodeShape': 1,
  'defaultNodeWidth': 100,
  'defaultLineShape': 2,
  'defaultJunctionPoint': 'lr',
  'defaultNodeBorderWidth': 0,
  'defaultLineColor': 'rgba(0, 186, 189, 1)',
  'defaultNodeColor': 'rgba(0, 206, 209, 1)'
};
onMounted(() => {
  showGraph();
});
const showGraph = async() => {
  const __graph_json_data = ref(props.datas);
  const graphInstance = graphRef.value!.getInstance();
  if (graphInstance) {

    await graphInstance.setJsonData(__graph_json_data.value);
    await graphInstance.moveToCenter();
    // await graphInstance.zoomToFit();
    graphInstance.setZoom(30);
  }
};
let store = usePhenotypeOntologySelectorStore()
let info = reactive({
  ontology_id: "",
  name:"",
  description:"",
  qualifiers: {

  }
})
function onNodeClick(nodeObject: RGNode){
  search.getPhenotypeOntology(store,nodeObject.id,info)
  dialogVisible.value = true
}
let dialogVisible = ref(false)

</script>

<template>
  <el-dialog v-model="dialogVisible" title="详细信息查看" width="1000">
    <el-descriptions style="margin-bottom: 5px" border :column="2">
      <el-descriptions-item label="UniqueId">{{ info.ontology_id}}</el-descriptions-item>
      <el-descriptions-item label="名称">{{ info.name }}</el-descriptions-item>
      <el-descriptions-item :span="2" label="描述">{{ info.description}}</el-descriptions-item>
      <el-descriptions-item :span="2" label="描述符">
        <el-descriptions style="margin-bottom: 5px" border :column="1">
          <el-descriptions-item v-for="(key,item) in info.qualifiers" :label="item">{{ key }}</el-descriptions-item>
        </el-descriptions>
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
  <div style="height:calc(80vh);">
    <RelationGraph ref="graphRef" :options="graphOptions" :on-node-click="onNodeClick" />
  </div>
</template>

<style scoped>

</style>