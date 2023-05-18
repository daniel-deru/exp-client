import { AxiosError, AxiosResponse } from "axios"
import axios from "../axios.config"

type Method = "POST" | "GET" | "DELETE" | "PATCH" | "PUT" 
type CallResponse<T> = { error: false, data: T } | {error: true, message: string }

export async function call<T = any, S = any>(endpoint: string, method: Method, payload: S): Promise<CallResponse<T>> {
    try {
        let request: AxiosResponse<T>

        switch(method){
            case "DELETE":
                request = await axios.delete(endpoint)
                break
            case "GET":
                request = await axios.get(endpoint)
                break
            case "PATCH":
                request = await axios.patch(endpoint, payload)
                break
            case "POST":
                request = await axios.post(endpoint, payload)
                break
            case "PUT":
                request = await axios.put(endpoint, payload)
                break
            default:
                request = await axios.get(endpoint)
        }

        return {error: false, data: request.data}

    } catch (error) {
        if(error instanceof AxiosError) {
           return { error: true, message: error.response?.data.message }
        }
    }

    return {error: true, message: "Something went wrong"}
}