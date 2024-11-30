import * as axios from "axios";

export const key = "123456"
export const client = axios.default.create(
    {
        baseURL: "http://101.43.156.208:2497"
    }
)
export function request(url:string,data:any,func:any){
    data["key"] = key
    client.post(url, data)
        .then(response => {
            func(true,response,response.status)
        }, error => {
            func(false,error.message,error.status)
        })
}

export type Gene = {
    id:string
    funga_id:string
    symbol:string
    name:string
    other_name:string
    description:string
    type:string
    source: {
        name:string
        link:string
        id:string
    }
    dna_sequence:string
    polypeptide_sequence:string,
    extra:{}
}
export type GenePhenotype = {
    id:string
    gene:string
    phenotype:string
    source: {
        name:string
        link:string
        gene:string
    }
    reference: string[]
    phenotype_qualifiers:string
    phenotype_ontology:string
    extra:{}
}
export type Result = {
    databases: string[],
    message: string,
    response:any
    status:boolean
}