"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getToken } from "@/utils/token"
import styles from "./dashboard.module.scss"

import Tiles from "@/components/Tiles/Tiles"
import ActivityList from "@/components/ActivityList"
import Link from "next/link"

const Dashboard = () => {

  const router = useRouter()

  function authorize(){
    const token = getToken()
    if(!token) router.push("/signin")
    else if(token) router.push('/dashboard')
  }

  useEffect(() => {
    authorize()
   
  }, [])

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