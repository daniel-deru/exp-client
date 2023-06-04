"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getToken } from "@/utils/token"
import { useAppDispatch } from "@/store/hooks"
import { selectActivities, setActivities as setActivitiesAction } from "@/store/slices/activitySlice"
import { call } from "@/utils/call"
import styles from "./dashboard.module.scss"

import Tiles from "@/components/Tiles/Tiles"
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
    console.log(getToken())
    if(!token) router.push("/signin")
    else if(token) router.push('/dashboard')

  }, [])

  return (
    <div className={styles.home}>
      <Tiles />
      <section className="flex justify-between mt-4">
        <div className="w-7/12">
          <div className="flex items-center w-full justify-start">
            <div className="text-xl">Recent Activities</div>
            <button className="bg-teal-500 py-1 px-4 rounded-md text-white ml-2">Add New</button>
          </div>
          <ActivityList />
        </div>
        <div className={`mx-4 w-4/12 ${styles.shoppingList}`}>
          <div className="flex items-center w-full">
            <div className="text-xl">Shopping Items</div>
            <button  className="bg-teal-500 py-1 px-4 rounded-md text-white ml-2">Add New</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard