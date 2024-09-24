import { defineStore } from 'pinia'
import {reactive, ref} from "vue";

export const useGeneStore = defineStore('gene', {
    state: () => {
        return { type: ref("accurate"),
                content: ref(""),
                filter: ref(0.8),
                topK: ref(20),
                current_select: ref('#all')
        }
    },
})
export const useBlastStore = defineStore('blast', {
    state: () => {
        return {
            content: ref(""),
            filter: ref(0.8),
            topK: ref(10),
        }
    },
})
export const useGeneGeneStore = defineStore('genegene', {
    state: () => {
        return {
            gene1: ref(""),
            gene2: ref(""),
            current_select: ref('#all')
        }
    },
})
export const usePhenotypeStore = defineStore('phenotype', {
    state: () => {
        return {
            phenotype: ref(""),
            type: ref("conservative"),
            current_select: ref('#all'),
            filter: ref(0.7),
            topK: ref(10)
        }
    },
})
export const useGenePhenotypeStore = defineStore('genephenotype', {
    state: () => {
        return {
            phenotype: ref(""),
            genes: reactive([]),
            current_select: ref('#all'),
            filter: ref(0.7),
            topK: ref(10)
        }
    },
})