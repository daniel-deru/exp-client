"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getToken } from "@/utils/token"
import { useAppDispatch } from "@/store/hooks"
import { Item, selectActivities, setActivities as setActivitiesAction } from "@/store/slices/activitySlice"
import { call } from "@/utils/call"
import styles from "./dashboard.module.scss"
import { setShoppingItems } from "@/store/slices/shoppingItemSlice"

import Tiles from "@/components/Tiles/Tiles"
import ActivityList from "@/components/ActivityList"
import Link from "next/link"

const Dashboard = () => {

  const router = useRouter()
  const dispatch = useAppDispatch()

  const fetchActivities = useCallback(async () => {
    const activities = await call("/activity/all?includeItems=true", "GET")

    if(activities.error) return activities.error

    dispatch(setActivitiesAction(activities.data))
  }, [])

  const fetchShoppingItems = useCallback(async () => {
    const response = await call("/item/all?noActivity=true", "GET")

    if(response.error) return console.log(response.message)

    dispatch(setShoppingItems(response.data))
  }, [])

  function authorize(){
    const token = getToken()
    if(!token) router.push("/signin")
    else if(token) router.push('/dashboard')
  }

  useEffect(() => {
    authorize()
    fetchActivities()
    fetchShoppingItems()
   
  }, [fetchShoppingItems, fetchActivities])

  return (
    <div className={styles.home}>
      <Tiles />
      <section className="flex justify-between mt-4">
        <div className="w-7/12">
          <div className="flex items-center w-full justify-start">
            <div className="text-xl">Recent Activities</div>
            <button><Link href={"/dashboard/activities/new-activity"}>Add New</Link></button>
          </div>
          <ActivityList />
        </div>
        <div className={`mx-4 w-4/12 ${styles.shoppingList}`}>
          <div className="flex items-center w-full">
            <div className="text-xl">Shopping Items</div>
            <button><Link href={"/dashboard/shopping"}>Add New</Link></button>
          </div>
          {/* Shopping list goes here */}
        </div>
      </section>
    </div>
  )
}

export default Dashboard