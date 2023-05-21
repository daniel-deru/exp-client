"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getToken } from "@/utils/token"
import { useAppDispatch } from "@/store/hooks"
import { selectActivities, setActivities as setActivitiesAction } from "@/store/slices/activitySlice"
import { call } from "@/utils/call"

import DashboardNav from "@/components/DashboardNav/DashboardNav"
import Tiles from "@/components/Tiles/Tiles"
import Header from "@/components/Header"
import ActivityList from "@/components/ActivityList"

const Dashboard = () => {

  const router = useRouter()
  const dispatch = useAppDispatch()

  async function fetchActivities(){
    const activities = await call("/activity/all?includeItems=true", "GET")
    console.log(activities)
    if(activities.error) return activities.error

    dispatch(setActivitiesAction(activities.data))

  }


  useEffect(() => {
    fetchActivities()
    const token = getToken()

    if(!token) router.push("/signin")
    else if(token) router.push('/dashboard')

  }, [])

  return (
    <div>
          <Tiles />
          <ActivityList />
    </div>
  )
}

export default Dashboard