import {createRouter, createWebHistory} from "vue-router";
import Home from "../pages/Home.vue";
import Gene from "../pages/Gene.vue";
import GeneDisplay from "../pages/gene/GeneDisplay.vue";
import GeneGene from "../pages/Gene-Gene.vue";
import Phenotype from "../pages/Phenotype.vue";
import GenePhenotype from "../pages/Gene-Phenotype.vue";
import GeneVague from "../pages/gene/GeneVague.vue";
import GeneSearch from "../pages/gene/GeneSearch.vue";
import GeneGeneSearch from "../pages/gene-gene/Gene-GeneSearch.vue";
import GeneGeneDisplay from "../pages/gene-gene/Gene-GeneDisplay.vue";
import PhenotypeSearch from "../pages/phenotype/PhenotypeSearch.vue";
import PhenotypeDisplay from "../pages/phenotype/PhenotypeDisplay.vue";
import GenePhenotypeSearch from "../pages/gene-phenotype/Gene-PhenotypeSearch.vue";
import GenePhenotypeDisplay from "../pages/gene-phenotype/Gene-PhenotypeDisplay.vue";
import Transfer from "../pages/tools/Transfer.vue";
import PhenotypeOntologySelector from "../pages/tools/PhenotypeOntologySelector.vue";

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/",
            redirect: "/home"
        },
        {
            path: "/home",
            component: Home
        },
        {
            path: "/gene",
            component: Gene,
            redirect: "/gene/search",
            children: [
                {
                    path: ":geneID",
                    component: Gene
                },
                {
                    path: "vague",
                    component:GeneVague
                },
                {
                    path: "search",
                    component:GeneSearch
                },
                {
                    path: "display",
                    component:GeneDisplay
                }
            ]
        },
        {
            path: "/gene-gene",
            component: GeneGene,
            redirect: "/gene-gene/search",
            children:[
                {
                    path: ":gene1/:gene2",
                    component: GeneGene
                },
                {
                    path: "search",
                    component:GeneGeneSearch
                },
                {
                    path: "display",
                    component:GeneGeneDisplay
                }
            ]
        },
        {
            path: "/phenotype",
            component: Phenotype,
            redirect: "/phenotype/search",
            children:[
                {
                    path: ":geneID",
                    component: Phenotype
                },
                {
                    path: "search",
                    component:PhenotypeSearch
                },
                {
                    path: "display",
                    component:PhenotypeDisplay
                }
            ]
        },
        {
            path: "/gene-phenotype",
            component: GenePhenotype,
            redirect: "/gene-phenotype/search",
            children:[
                {
                    path: "search",
                    component:GenePhenotypeSearch
                },
                {
                    path: "display",
                    component:GenePhenotypeDisplay
                }
            ]
        },
        {
            path: "/transfer",
            component: Transfer,
            children:[
                {
                    path: ":sequences",
                    component:Transfer
                }
            ]
        },
        {
            path: "/phenotype-ontology-selector",
            component: PhenotypeOntologySelector
        }
    ]
})
export default router