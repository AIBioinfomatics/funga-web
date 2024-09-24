<script setup lang="ts">
import {useRoute} from "vue-router";
import router from "../router";
import {useGeneGeneStore} from "../pinia/Store.ts";
let gene1 = useRoute().params.gene1
let gene2 = useRoute().params.gene2
let store = useGeneGeneStore()
if (gene1 == undefined || gene2 == undefined){
  router.push("/gene-gene/search")
}else {
  store.gene1 = <string>gene1
  store.gene2 = <string>gene2
  router.push("/gene-gene/display")
}
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped>
</style>