"use client"

import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { selectActivities, Activity, deleteActivity } from "@/store/slices/activitySlice"
import styles from "./style.module.scss"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FaTimesCircle, FaRegTimesCircle } from "react-icons/fa"
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
            <div className={styles.activityList}>
                <div >
                    <div >
                        <div className={styles.name}>Name</div>
                        <div className={styles.status}>Status</div>
                        <div className={styles.items}>Items</div>
                        <div>Total</div>
                    </div>
                </div>
                {activities.map((activity: Activity) => (
                    <div key={activity.id} >
                        <div onClick={() => goToActivityPage(activity.id)}>
                            <div className={styles.name}>{activity.name}</div>
                            <div className={styles.status}>{activity.status}</div>
                            <div className={styles.items}>{activity.items.length}</div>
                            <div>{activityTotal(activity)}</div>
                        </div>
                        <div>
                            <button onClick={() => removeActivity(activity)}>
                                <FaRegTimesCircle/>
                            </button>
                        </div>


                    </div>
                ))}
            </div>
        </section>
    )
}

export default activities