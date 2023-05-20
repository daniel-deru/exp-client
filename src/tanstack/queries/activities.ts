import { call } from "@/utils/call"

export default async function fetchActivities(){
    const data = await call('/activity/all', "GET")
    // console.log(data)
    return data
}