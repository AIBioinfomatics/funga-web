import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {request} from "../network";
import {AxiosResponse} from "axios";

export const search = {
    genephenotype:function (store: any, data: any, func: () => void){
        const req_des_data = {
            "genes": store.genes,
            "topK": store.topK,
            "filter":store.filter,
            "phenotype": store.phenotype,
            "databases": [store.current_select]
        }
        request("/get_gene_phenotype",req_des_data,
            function (state: boolean, res: AxiosResponse, status: number) {
                if (state){
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
    description:function (db:string,data:any){
        const req_des_data = {
            "species": db
        }
        request("/get_species_description",req_des_data,
            function (state: boolean, res: AxiosResponse, status: number) {
                if (state){
                    data.length = 0
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
            confirmButtonText: '关闭',
        })
    }
}