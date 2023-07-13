"use client"

import { useEffect, useState } from "react"
import styles from "./tiles.module.scss"
import useActivities from "@/hooks/activities"

const Tiles = () => {

    const activities = useActivities()

    function avgItemPerActivity(){
        let itemCount = 0
        let activityCount = 0

        for(let activity of activities){
            activityCount++
            for(let item of activity.items){
                itemCount++
            }
        }

        return (itemCount/activityCount).toFixed(0)
    }

    function totalSpent(){
        let total = 0

        for(let activity of activities){
            for(let item of activity.items){
                total += (item.price * item.quantity)
            }
        }

        return total
    }

    return (
        <div className={styles.tiles}>
            <div className="spent">
                <div>Total Spent</div>
                <div className={styles.data}>{totalSpent()}</div>
            </div>
            <div className="activities">
                <div>Total Activities</div>
                <div className={styles.data}>{activities.length}</div>
            </div>
            <div className="items-p-activity">
                <div>Avg Items</div>
                <div className={styles.data}>{avgItemPerActivity()}</div>
            </div>
            <div className="spent-p-activity">
                <div>Avg Spent</div>
                <div className={styles.data}>{(totalSpent()/activities.length).toFixed(0)}</div>
            </div>
        </div>
    )
}

export default Tiles