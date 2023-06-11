"use client"

import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { selectActivities, Activity, deleteActivity } from "@/store/slices/activitySlice"
import styles from "./style.module.scss"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FaRegPlayCircle, FaRegTimesCircle } from "react-icons/fa"
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
                <button className="ml-2 bg-sky-700 text-white py-1 px-3 rounded-md"><Link href={"/dashboard/activities/new-activity"}>Add New</Link></button>
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
                    <div key={activity.id}  className="border-slate-300 border-solid border-2 rounded-md cursor-pointer hover:border-sky-700">
                        <div onClick={() => goToActivityPage(activity.id)}>
                            <div className={styles.name}>{activity.name}</div>
                            <div className={styles.status}>{activity.status}</div>
                            <div className={styles.items}>{activity.items.length}</div>
                            <div>{activityTotal(activity)}</div>
                        </div>
                        <div>
                            <button className="text-sky-700">
                                <Link href={`/dashboard/activities/${activity.id}/start`}>
                                    {/* <FaRegPlayCircle /> */}
                                    <span className="bg-sky-700 text-white py-1 px-3 rounded-md">Start</span>
                                </Link>
                            </button>
                            <button className="text-red-500" onClick={() => removeActivity(activity)}>
                                {/* <FaRegTimesCircle /> */}
                                <span className="bg-slate-500 text-white py-1 px-3 rounded-md">Delete</span>
                            </button>
                        </div>


                    </div>
                ))}
            </div>
        </section>
    )
}

export default activities