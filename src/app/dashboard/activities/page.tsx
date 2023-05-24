"use client"

import { useAppSelector } from "@/store/hooks"
import { selectActivities, Activity } from "@/store/slices/activitySlice"
import styles from "./style.module.scss"
import { useRouter } from "next/navigation"



const activities = () => {

    const activities = useAppSelector(selectActivities)
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

    return (
        <section className={styles.activities}>
            <div>
                <span>Activities</span>
                <button>Add New</button>
            </div>
            <div className="activityList">
                <div className="flex justify-between my-3">
                    <div>Name</div>
                    <div>Status</div>
                    <div>Items</div>
                    <div>Total</div>
                    <div></div>
                </div>
                {activities.map((activity: Activity) => (
                    <div className="flex justify-between mb-4" key={activity.id}>
                        <div>{activity.name}</div>
                        <div>{activity.status}</div>
                        <div>{activity.items.length}</div>
                        <div>{activityTotal(activity)}</div>
                        <div><button className="bg-sky-700 text-white py-1 px-4 rounded-full" onClick={() => goToActivityPage(activity.id)}>View</button></div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default activities