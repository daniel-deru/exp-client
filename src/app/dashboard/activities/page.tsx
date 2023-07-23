"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Activity, deleteActivity, selectActivities, updateActivity } from "@/store/slices/activitySlice"
import styles from "./style.module.scss"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { FaRegPlayCircle, FaRegTimesCircle } from "react-icons/fa"
import { call } from "@/utils/call"
import fetchActivities from "@/utils/fetchActivities"
import { useEffect } from "react"
import validStartActivity from "@/utils/startActivityCheck"
import { getCookie, setCookie } from "@/utils/cookie"


const activities = () => {

    const activities = useAppSelector(selectActivities)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const pathname = usePathname()

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
        if(activity.startTime && !activity.endTime) {
            return alert("This activity is still active. Please complete the activity before you can delete it.")
        }

        const confirmDelete = confirm("Are You sure")

        if(!confirmDelete) return

        const response = await call(`activity/delete/${activity.id}`, "DELETE")

        if(!response.error){
            dispatch(deleteActivity(activity))
        }
    }

    async function startActivity(activity: Activity | undefined){
        const startedActivity = getCookie<Activity>("activeActivity")

        if(!activity) return alert("No activity Found!")

        const validActivity = validStartActivity(activity, startedActivity)

        if(validActivity.error) return alert(validActivity.message)

        // // The current activity has not been started yet - call the API to start activity
        if(!activity.startTime){
            const response = await call<Activity>(`/activity/start/${activity.id}`, "POST")

            if(response.error) return alert("Activity could not be started.")
            // Set the current activity as the active activity.
            setCookie("activeActivity", JSON.stringify(activity), "30d")
            dispatch(updateActivity(response.data))
        }

        router.push(`${pathname}/${activity.id}/start`)
    }

    useEffect(() => {
        console.log("FETCHING ACTIVITIES")
        fetchActivities(activities, dispatch)
    }, [])

    return (
        <section className={styles.activities}>
            <div>
                <span>Activities</span>
                <button className="ml-2 bg-amber-500 text-white py-1 px-3 rounded-md"><Link href={"/dashboard/activities/new-activity"}>Add New</Link></button>
            </div>

            <div className={styles.activityListHeader}>
                <div className={styles.name}>Name</div>
                <div className={styles.status}>Status</div>
                <div className={styles.items}>Items</div>
                <div>Total</div>
            </div>
            <div className={styles.activityList}>
                {activities.map((activity: Activity) => (
                    <div key={activity.id}  className={`border-slate-300 border-solid border-2 rounded-md cursor-pointer hover:border-sky-700`}>
                        <div onClick={() => goToActivityPage(activity.id)}>
                            <div className={styles.name}>{activity.name}</div>
                            <div className={styles.status}>{activity.status}</div>
                            <div className={styles.items}>{activity.items?.length || 0}</div>
                            <div>{activityTotal(activity)}</div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button className="text-sky-700" onClick={() => startActivity(activity)}>
                                <span className="bg-sky-700 text-white py-1 px-3 rounded-md">
                                    {activity.startTime && !activity.endTime ? "Continue" : "Start"}
                                </span>
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