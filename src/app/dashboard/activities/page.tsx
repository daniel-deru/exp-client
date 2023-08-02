"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Activity, selectActivities } from "@/store/slices/activitySlice"
import styles from "./style.module.scss"
import Link from "next/link"
import fetchActivities from "@/utils/fetchActivities"
import { useEffect } from "react"
import ActivityPageListItem from "@/components/ActivityPageListItem/ActivityPageListItem"

const statusOrder = {
    "Active": 0,
    "Pending": 1,
    "Finished": 2,
    "Cancelled": 3
}

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

const monthOrder: {[key: string]: number} = {
    "January": 0, 
    "February": 1, 
    "March": 2, 
    "April": 3, 
    "May": 4, 
    "June": 5,
    "July": 6, 
    "August": 7, 
    "September": 8, 
    "October": 9, 
    "November": 10, 
    "December": 11
}

const activities = () => {

    const activities = useAppSelector(selectActivities)
    const dispatch = useAppDispatch()

    function arrangeActivities(a: Activity, b: Activity): number{
        return statusOrder[a.status] - statusOrder[b.status]
    }

    function sortByDate(activities: Activity[]): [string, Activity[]][] {
        const activityDisplayList: { [key: string]: Activity[] } = {}
        const currentYear = new Date().getFullYear()

        const filteredActivities = activities.filter(activity => {
            const activityYear = new Date(activity.createdAt).getFullYear()
            return activityYear === currentYear
        })

        for(let activity of filteredActivities) {
            const dateString = activity.endTime ? activity.endTime : activity.createdAt

            const monthIndex = new Date(dateString).getMonth()
            const month = monthNames[monthIndex]

            if(month in activityDisplayList) {
                activityDisplayList[month].push(activity)
            } 
            else {
                activityDisplayList[month] = [activity]
            }
        }

        const sortByMonth = (a: [string, Activity[]], b: [string, Activity[]]) => monthOrder[a[0]] - monthOrder[b[0]]

        return Object.entries(activityDisplayList).sort(sortByMonth)
    }

    useEffect(() => {
        fetchActivities(activities, dispatch)
    }, [])

    return (
        <section className={styles.activities}>
            <div>
                <span>Activities</span>
                <button className="ml-2 bg-amber-500 text-white py-1 px-3 rounded-md"><Link href={"/dashboard/activities/new-activity"}>Add New</Link></button>
            </div>
            <div >
                {sortByDate(activities).map((displayList) => (
                   <div key={displayList[0]}>
                        <div className="mt-2 border-b-2 border-solid border-black mr-5">{displayList[0]}</div>
                        <div className={styles.activityList}>
                            {[...displayList[1]].sort(arrangeActivities).map(activity => (
                                <ActivityPageListItem activity={activity} key={activity.id}/>
                            ))}
                        </div>
                   </div>
                ))}
            </div>
        </section>
    )
}

export default activities