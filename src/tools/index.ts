import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {request} from "../network";
import {AxiosResponse} from "axios";
import {useChatStore} from "../pinia/Store.ts";
import {lang} from "../lang";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";

export const prompt = {
    generateSummary: "你现在扮演一个生物信息学领域的专家，从专业的角度，你认为根据现在已知的信息如何写一篇论文？\n" +
        "写作以符合学术风格，提高拼写、语法、清晰度、简洁性和整体可读性。\n" +
        "注意，不要胡编乱造，您需要按照格式写出文章，并且使用"+ lang.displayName() +"。\n"
}

export const search = {
    getSummary:function (data:any,func: ()=> void){
        request("/chat", {
                sessionID: useChatStore().session,
                message: prompt.generateSummary
            },
            function (state: boolean, res: AxiosResponse, status: number) {
                if (state){
                    data.length = 0
                    Object.assign(data,res.data)
                    func()
                }else {
                    ElMessage({
                        message: `请求超时 ${status}`,
                        type: "error"
                    })
                }
            }
        )
    },
    getStatisticalData:function (data:any){
        request("/get_statistical_data", {},
            function (state: boolean, res: AxiosResponse, status: number) {
                if (state){
                    data.length = 0
                    Object.assign(data,res.data)
                }else {
                    ElMessage({
                        message: `请求超时 ${status}`,
                        type: "error"
                    })
                }
            }
        )
    },
    phenotypeOntologySelector:function (store: any,data:any,func: ()=> void){
        const req_des_data = {
            "databases": [store.current_select]
        }
        request("/phenotype_ontology_selector",req_des_data,
            function (state: boolean, res: AxiosResponse, status: number) {
                if (state){
                    data.length = 0
                    Object.assign(data,res.data)
                    func()
                }else {
                    ElMessage({
                        message: `请求超时 ${status}`,
                        type: "error"
                    })
                }
            }
        )
    },
    getPhenotypeOntology:function (store: any,id:string,data:any){
        const req_des_data = {
            "databases": [store.current_select],
            "id":id
        }
        request("/phenotype_ontology_selector",req_des_data,
            function (state: boolean, res: AxiosResponse, status: number) {
                if (state){
                    data.length = 0
                    Object.assign(data,res.data)
                }else {
                    ElMessage({
                        message: `请求超时 ${status}`,
                        type: "error"
                    })
                }
            }
        )
    },
    chat:function (message:string,data:any,func: ()=> void){
        var store = useChatStore()
        const req_des_data = {
            "sessionID": store.session,
            "message": message
        }
        request("/chat",req_des_data,
            function (state: boolean, res: AxiosResponse, status: number) {
                if (state){
                    data.length = 0
                    Object.assign(data,res.data)
                    func()
                }else {
                    ElMessage({
                        message: `请求超时 ${status}`,
                        type: "error"
                    })
                }
            }
        )
    },
    genephenotype:function (store: any, data: any, func: () => void){
        var type = "union"
        if (store.type == true){
            type = "intersection"
        }
        const req_des_data = {
            "genes": store.genes,
            "topK": store.topK,
            "filter":store.filter,
            "type": type,
            "phenotype": store.phenotypes,
            "databases": [store.current_select]
        }
        request("/get_gene_phenotype",req_des_data,
            function (state: boolean, res: AxiosResponse, status: number) {
                if (state){
                    var chat = useChatStore()
                    chat.session = res.data["response"]["session"]
                    Object.assign(data,res.data)
                    func()
                }else {
                    ElMessage({
                        message: `请求超时 ${status}`,
                        type: "error"
                    })
                }
            }
        )
    },
    phenotype:function (store: any, data: any, func: () => void){
        const req_des_data = {
            "content": store.phenotype,
            "topK": store.topK,
            "filter":store.filter,
            "type": store.type,
            "databases": [store.current_select]
        }
        request("/get_phenotype",req_des_data,
            function (state: boolean, res: AxiosResponse, status: number) {
                if (state){
                    var chat = useChatStore()
                    chat.session = res.data["response"]["session"]
                    Object.assign(data,res.data)
                    func()

                }else {
                    ElMessage({
                        message: `请求超时 ${status}`,
                        type: "error"
                    })
                }
            }
        )
    },
    genegene:function (store: any, data: any, func: () => void){
        const req_des_data = {
            "gene1": store.gene1,
            "gene2": store.gene2,
            "databases": [store.current_select]
        }
        request("/get_gene_gene",req_des_data,
            function (state: boolean, res: AxiosResponse, status: number) {
                if (state){
                    var chat = useChatStore()
                    chat.session = res.data["response"]["session"]
                    Object.assign(data,res.data)
                    func()
                }else {
                    ElMessage({
                        message: `请求超时 ${status}`,
                        type: "error"
                    })
                }
            }
        )
    },
    blast:function (store: any, data: any, func: () => void){
        const req_des_data = {
            "content": store.content,
            "topK": store.topK,
            "filter":store.filter
        }
        request("/blast",req_des_data,
            function (state: boolean, res: AxiosResponse, status: number) {
                if (state){
                    var chat = useChatStore()
                    data.length = 0
                    chat.session = res.data["response"]["session"]
                    Object.assign(data,res.data)
                    func()
                }else {
                    ElMessage({
                        message: `请求超时 ${status}`,
                        type: "error"
                    })
                }
            }
        )
    },
    description:function (db:string,data:any){
        const req_des_data = {
            "species": db
        }
        request("/get_species_description",req_des_data,
            function (state: boolean, res: AxiosResponse, status: number) {
                if (state){
                    Object.assign(data,res.data["data"])
                }else {
                    ElMessage({
                        message: `请求超时 ${status}`,
                        type: "error"
                    })
                }
            }
        )
    },
    gene: function (store: any, data: any, func: () => void){
        const req_data = {
            "type":store.type,
            "content": store.content,
            "databases": [store.current_select],
            "filter" : store.filter,
            "topK": store.topK,
        }
        request("/get_gene",req_data,
            function (state: boolean, res: AxiosResponse, status: number) {
                if (state){
                    var chat = useChatStore()
                    chat.session = res.data["response"]["session"]
                    Object.assign(data,res.data)
                    ElNotification({
                        title: '提醒',
                        message: '搜索成功',
                        type: 'success',
                    })
                    func()
                }else {
                    ElMessage({
                        message: `请求超时 ${status}`,
                        type: "error"
                    })
                }
            }
        )
    }
}
export const windows = {
    "getWebTitle":async function(url:string) {
        try {
            const response = await fetch(url);
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            return doc.title
        } catch (error) {
            console.error('Error fetching website metadata:', error);
            return "";
        }
    },
    "goLink":function (url:string) {
        ElNotification({
            title: '提醒',
            message: '正在跳转至目标网站,请稍后',
            type: 'info',
        })
        setTimeout(
            function () {
                window.open(url)
            }
            , 1500);
    },
    "showWindow":function showWindow(title:string,values:any[]){
        if (values.length == 0){
            values = ["无"]
        }
        ElMessageBox.alert(values.join("\n"), title, {
            // if you want to disable its autofocus
            // autofocus: false,
            confirmButtonText: '关闭'
        })
    },
    "saveFile":function saveFile(id:string) {
        var wb = XLSX.utils.table_to_book(document.querySelector(id));//关联dom节点
        /* get binary string as output */
        var wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            bookSST: true,
            type: 'array'
        })
        try {
            FileSaver.saveAs(new Blob([wbout], {
                type: 'application/octet-stream'
            }), 'result.xlsx')//自定义文件名
        } catch (e) {
            if (typeof console !== 'undefined') console.log(e, wbout);
        }
        return wbout
    }
}