"use client"

import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { selectActivities, Activity, deleteActivity } from "@/store/slices/activitySlice"
import styles from "./style.module.scss"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FaTimesCircle } from "react-icons/fa"
import { call } from "@/utils/call"



const activities = () => {

    const activities = useAppSelector(selectActivities)
    const dispatch = useAppDispatch()
    const router = useRouter()

    function activityTotal(activity: Activity){
        let total = 0

        for(let item of activity.items){
            total += (item.price * item.quantity)
        }

        return total
    }

    function goToActivityPage(id: string){
        router.push(`/dashboard/activities/${id}`)
    }

    async function removeActivity(activity: Activity){
        const confirmDelete = confirm("Are You sure")

        if(!confirmDelete) return

        const response = await call(`activity/delete/${activity.id}`, "DELETE")

        if(!response.error){
            dispatch(deleteActivity(activity))
        }
    }

    return (
        <section className={styles.activities}>
            <div>
                <span>Activities</span>
                <button><Link href={"/dashboard/activities/new-activity"}>Add New</Link></button>
            </div>
            <div className="activityList">
                <div className="flex justify-between my-3">
                    <div>Name</div>
                    <div>Status</div>
                    <div>Items</div>
                    <div>Total</div>
                </div>
                {activities.map((activity: Activity) => (
                    <div className="flex justify-between mb-4 shadow-md items-center" key={activity.id} >
                        <div className="flex justify-between dataContainer items-center" onClick={() => goToActivityPage(activity.id)}>
                            <div>{activity.name}</div>
                            <div>{activity.status}</div>
                            <div>{activity.items.length}</div>
                            <div>{activityTotal(activity)}</div>
                        </div>
                        <div className="buttonContainer">
                            <button className="text-red-500 text-xl mx-4 p-2" onClick={() => removeActivity(activity)}>
                                <FaTimesCircle/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default activities