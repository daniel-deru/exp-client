import { AxiosError, AxiosResponse } from "axios"
import axios from "../axios.config"
import { getToken } from "./token"

type Method = "POST" | "GET" | "DELETE" | "PATCH" | "PUT" 
type CallResponse<T> = { error: false, data: T } | {error: true, message: string }

export async function call<T = any, S = any>(endpoint: string, method: Method, payload?: S): Promise<CallResponse<T>> {

    const token = getToken()

    const headers = {
        Authorization: `Bearer ${token}`
    }

    try {
        let request: AxiosResponse<T>

        switch(method){
            case "DELETE":
                request = await axios.delete(endpoint, {headers})
                break
            case "GET":
                request = await axios.get(endpoint, {headers})
                break
            case "PATCH":
                request = await axios.patch(endpoint, payload, {headers})
                break
            case "POST":
                request = await axios.post(endpoint, payload, {headers})
                break
            case "PUT":
                request = await axios.put(endpoint, payload, {headers})
                break
            default:
                request = await axios.get(endpoint, {headers})
        }

        return {error: false, data: request.data}

    } catch (error) {
        if(error instanceof AxiosError) {
           return { error: true, message: error.response?.data.message }
        }
    }

    return {error: true, message: "Something went wrong"}
}