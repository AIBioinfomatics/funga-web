import {reactive, ref} from "vue";
import {useCookies} from "vue3-cookies";

export let language = ref("zh_CN")

const langCache = {
    en_US:{
        pages:{
            gene:{
                search:{

                }
            }
        },
        components: {
            Assistant:{
                message: "Welcome use Assistant"
            },
            PhenotypeOntologyInteractions:{
                title: "Details",
                id: "UniqueId",
                name: "Display Name",
                description: "Description",
                qualifiers: "Qualifiers"
            },
            SideBar: {
                latin:"Latin Name",
                chinese: "Chinese Name",
                link: "Link",
                description: "Description",
                go: "Click Go",
                select_db: "Please Select Species"
            },
            TopMenu: {
                home: "Home",
                gene: "Gene",
                gene_gene: "Gene-Gene",
                gene_phenotype: "Gene-Phenotype",
                phenotype: "Phenotype",
                tool:"Tools",
                transfer:"Transfer",
                selector: "Phenotype Ontology Selector",
                assistant:"Assistant",
                language: "Switch Language",
                help: "Can I help you?"
            }
        }
    },
    zh_CN:{
        common:{
            empty: "搜索不能为空",
            btn_search: "提交",
            btn_tour: "引导"
        },
        pages:{
            gene:{
                search:{
                    placeholder: "请输入基因或基因描述内容",
                    accurate: "精确模式",
                    vague: "语义模式",
                }
            }
        },
        components: {
            Assistant:{
                message: "欢迎使用FUNGA小助手"
            },
            PhenotypeOntologyInteractions:{
                title: "详细信息查看",
                id: "编号",
                name: "名称",
                description: "描述",
                qualifiers: "描述符",
                phenotype: "查询表型"
            },
            SideBar: {
                latin:"拉丁名",
                chinese: "中文名",
                link: "链接",
                description: "描述",
                go: "点击前往",
                select_db: "请选择物种"
            },
            TopMenu: {
                home: "主页",
                gene: "基因",
                gene_gene: "基因-基因",
                gene_phenotype: "基因-表型",
                phenotype: "表型",
                tool:"工具",
                transfer:"转换",
                selector: "表型本体查询",
                assistant:"助手",
                language: "切换语言",
                help: "有什么需要帮助的吗?"
            }
        }
    }
}

export const lang = {
    displayName: function ():string {
        switch (language.value) {
            case "zh_CN" : return "简体中文"
            case "en_US" : return "English"
        }
        return "Unknown"
    },
    changeLang:function () {
        useCookies().cookies.set("language",language.value)
        window.location.reload()
    },
    display: reactive(langCache.zh_CN)
}

