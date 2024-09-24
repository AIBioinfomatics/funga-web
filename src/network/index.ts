import * as axios from "axios";

export const key = "123456"
export const client = axios.default.create(
    {

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