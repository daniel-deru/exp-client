import axios from "axios"
import { getToken } from "./utils/token"


export default axios.create({
    baseURL: "http://localhost:3000"
})