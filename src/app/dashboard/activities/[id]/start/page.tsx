"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Activity, Item, selectActivities } from '@/store/slices/activitySlice'
import styles from "./start.module.scss"
import ShopItemModal from '@/components/Modals/ShopItemModal/ShopItemModal'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import fetchActivities from '@/utils/fetchActivities'
import { getCookie, setCookie, deleteCookie } from '@/utils/cookie'

export interface ItemComplete extends Item {
    completed: boolean
}

export interface ItemDetail {
    show: boolean,
    item?: Item
}

const activityStart = () => {

    const [currentActivity, setCurrentActivity] = useState<Activity>()
    const [currentItem, setCurrentItem] = useState<Item>()
    const [items, setItems] = useState<Item[]>([])
    const [showItemDetails, setShowItemDetails] = useState<boolean>(false)

    const pathname = usePathname()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const activities = useAppSelector(selectActivities)

    // Callback for when an item gets checked or unchecked
    function handleComplete(event: React.ChangeEvent<HTMLInputElement>, item: Item){
        if(!currentActivity) return alert("Current Activity Not Set")

        const itemIndex = items.findIndex(i => i.id === item.id)
        const activity: Activity = { ...currentActivity }

        if(event.target.checked) {
            setShowItemDetails(true)
            activity.items[itemIndex].completed = true
        }
        else {
            activity.items[itemIndex].completed = false
        }
        
        setCurrentItem(items[itemIndex])
        setCookie("activeActivity", JSON.stringify(activity), "30d")
    }

    // When complete button is pressed
    function completePressed(){
        // router.push("/dashboard/activities")
        // TODO: call API to update data
        // Things to update: The items and the activity so two calls
        deleteCookie("activeActivity")
    }

    useEffect(() => {
        const id = pathname.split("/")[3]
        const activityCookie = getCookie<Activity>("activeActivity")
        const noActivity = !activityCookie || typeof activityCookie === "string"

        if(activities.length <= 0) {
            fetchActivities(activities, dispatch)
        }

        if(noActivity|| activityCookie.id !== id) {
            router.push(`/dashboard/activities/${id}`)
        }
        else {
            setCurrentActivity(activityCookie)
            setItems(activityCookie.items)
        }

    }, [activities])

    return (
        <section className={styles.start}>
            <ShopItemModal
                showModal={showItemDetails}
                setShowModal={setShowItemDetails}
                item={currentItem}
            />
            <h1>{currentActivity?.name}</h1>
            <ul className="w-full">
                {[...items].sort((a) => a.completed ? 1 : -1).map((item) => (
                    <li className={`w-full flex justify-between ${item.completed ? styles.completed : ""}`} key={item.id}>
                        <span>
                            <input type="checkbox" onChange={(e) => handleComplete(e, item)} id={item.id} checked={item.completed}/>
                        </span>
                        <span>{item.name}</span>
                        <span>{item.quantity}</span>
                        <span>{item.price}</span>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={() => completePressed()}>Complete</button>
            </div>
        </section>
    )
}

export default activityStart