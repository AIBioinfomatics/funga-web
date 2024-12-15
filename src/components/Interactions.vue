<script setup lang="ts">
import RelationGraphComponent, {RGLine, RGLink, RGNode} from "relation-graph-vue3";

let props = defineProps(["datas"])
import RelationGraph, {RGOptions} from "relation-graph-vue3";
import {onMounted, ref} from "vue";

  const graphRef = ref<RelationGraphComponent | null>(null);

  const graphOptions: RGOptions = {
    debug: false,
    allowShowMiniToolBar: true,
    defaultNodeBorderWidth: 2,
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultLineShape: 1,
    layout: {
      layoutName: 'force',
      maxLayoutTimes: 1000
    },
    defaultJunctionPoint: 'border'
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
  function onLineClick(lineObject: RGLine, line: RGLink){
    lineObject
    window.open("/gene-gene/"+line.fromNode.id + "/" + line.toNode.id)
  }
  function onNodeClick(nodeObject: RGNode){
    window.open("/gene/"+nodeObject.id)
  }
</script>

<template>

  <div style="height:calc(60vh);">
    <RelationGraph ref="graphRef" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick">
    </RelationGraph>
  </div>
</template>

<style scoped>

</style>