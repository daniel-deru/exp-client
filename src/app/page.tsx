"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getToken } from "@/utils/token"
import { useAppDispatch } from "@/store/hooks"
import { setActivities } from "@/store/slices/activitySlice"
import { call } from "@/utils/call"


export default function Home() {

  const router = useRouter()
  const dispatch = useAppDispatch()

  async function fetchActivities(){
    const activities = await call("/activity/all?includeItems=true", "GET")
    console.log(activities)
    if(activities.error) return activities.error

    dispatch(setActivities(activities.data))

  }

  useEffect(() => {
    const token = getToken()

    if(token) router.push("/dashboard")
    else if(!token) router.push("/signin")

  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  )
}
