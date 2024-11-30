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
            type: ref("ontology"),
            current_select: ref('#all'),
            filter: ref(0.7),
            topK: ref(10)
        }
    },
})
export const usePhenotypeOntologySelectorStore = defineStore('PhenotypeOntologySelector', {
    state: () => {
        return {
            current_select: ref('#none')
        }
    },
})
export const useGenePhenotypeStore = defineStore('genephenotype', {
    state: () => {
        return {
            include_outer : ref(true),
            type : ref(false),
            phenotypes: reactive([]),
            genes: reactive([]),
            current_select: ref('#all'),
            filter: ref(0.7),
            topK: ref(10)
        }
    },
})
export const useChatStore = defineStore('chat', {
    state: () => {
        return {
            session: ref(crypto.randomUUID().toString()),
        }
    },
})