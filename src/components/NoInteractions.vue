<script setup lang="ts">
import RelationGraphComponent from "relation-graph-vue3";

let props = defineProps(["datas"])
import RelationGraph, {RGOptions} from "relation-graph-vue3";
import {onMounted, ref} from "vue";
  const graphRef = ref<RelationGraphComponent | null>(null);

  const graphOptions: RGOptions = {
    debug: false,
    defaultNodeBorderWidth: 0,
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultLineShape: 1,
    layout: {
      layoutName: 'force',
      maxLayoutTimes: 10000
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
</script>

<template>
  <div style="height:calc(44vh);">
    <RelationGraph ref="graphRef" :options="graphOptions" />
  </div>
</template>

<style scoped>

</style>