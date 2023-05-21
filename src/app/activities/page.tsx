"use client"

import { useAppSelector } from "@/store/hooks"
import { selectActivities, Activity } from "@/store/slices/activitySlice"
import styles from "./style.module.scss"



const activities = () => {

    const activities = useAppSelector(selectActivities)
    console.log(activities)

    function activityTotal(activity: Activity){
        let total = 0

        for(let item of activity.items){
            total += (item.price * item.quantity)
        }

        return total
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
                    <div>Date Created</div>
                    <div>Status</div>
                    <div>Items</div>
                    <div>Total</div>
                </div>
                {activities.map((activity: Activity) => (
                    <div className="flex justify-between" key={activity.id}>
                        <div>{activity.name}</div>
                        <div>{new Date(activity.createdAt).toLocaleString()}</div>
                        <div>{activity.status}</div>
                        <div>{activity.items.length}</div>
                        <div>{activityTotal(activity)}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default activities