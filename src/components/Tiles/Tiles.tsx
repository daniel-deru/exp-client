"use client"

import { useEffect } from "react"
import styles from "./tiles.module.scss"
import { useAppSelector } from "@/store/hooks"
import { selectActivities } from "@/store/slices/activitySlice"

const Tiles = () => {

    const activities = useAppSelector(selectActivities)

    useEffect(() => {
        console.log(activities)
    }, [activities])

    return (
        <div className={styles.tiles}>
            <div className="spent">
                <div>Total Spent</div>
                <div className="data">1</div>
            </div>
            <div className="activities">
                <div>Total Activities</div>
                <div className="data">{activities.length}</div>
            </div>
            <div className="items-p-activity">
                <div>Average Items Per Activity</div>
                <div className="data">1</div>
            </div>
            <div className="spent-p-activity">
                <div>Average Spent Per Activity</div>
                <div className="data">1</div>
            </div>
        </div>
    )
}

export default Tiles