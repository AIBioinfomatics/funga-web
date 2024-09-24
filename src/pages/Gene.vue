<script setup lang="ts">
  import router from "../router";
  import {useRoute} from "vue-router";
  import {useGeneStore} from "../pinia/Store.ts";
  let gene = useRoute().params.geneID
  let store = useGeneStore()
  if (gene == undefined){
    router.push("/gene/search")
  }else {
    store.content = <string>gene
    router.push("/gene/display")
  }
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped>
</style>