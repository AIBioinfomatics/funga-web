<script setup lang="ts">
import {useRoute} from "vue-router";
import {usePhenotypeStore} from "../pinia/Store.ts";
import router from "../router";

let gene = useRoute().params.geneID
let store = usePhenotypeStore()
if (gene == undefined){
  router.push("/phenotype/search")
}else {
  store.phenotype = <string>gene
  store.type = "freedom"
  router.push("/phenotype/display")
}
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped>
</style>