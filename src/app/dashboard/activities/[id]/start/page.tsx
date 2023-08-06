"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Activity, Item, selectActivities, updateActivity } from '@/store/slices/activitySlice'
import styles from "./start.module.scss"
import ShopItemModal from '@/components/Modals/ShopItemModal/ShopItemModal'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import fetchActivities from '@/utils/fetchActivities'
import { getCookie, setCookie, deleteCookie } from '@/utils/cookie'
import { call } from '@/utils/call'


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
    async function completePressed(){

        const updatedActivity = getCookie<Activity>("activeActivity")

        if(!updatedActivity || typeof updatedActivity === "string") {
            return alert("There is no updated activity in the cookies")
        }

        // There is no current activity in the redux store
        if(!currentActivity) return alert("There is no current activity!")

        const finishResponse = await call<Activity>(`/activity/finish/${currentActivity.id}`, "POST")
        
        if(finishResponse.error) return alert(finishResponse.message)

        updatedActivity.items.forEach( async (item) => {
            const { completed, price, quantity } = item
            const response = await call<Item>(`item/edit/${item.id}`, "PATCH", { completed, price, quantity })
            if(response.error) alert(response.message)
        })

        // Create a copy of the updated activity and set the newly
        const finishedActivity = finishResponse.data
        finishedActivity.items = updatedActivity.items

        // Update the state so you don't need to refresh the browser
        dispatch(updateActivity(finishedActivity))

        
        // Things to update: The items and the activity so two calls
        deleteCookie("activeActivity")
        router.push(`/dashboard/activities/${finishedActivity.id}`)
    }

    useEffect(() => {
        const id = pathname.split("/")[3]
        const activityCookie = getCookie<Activity>("activeActivity")

        if(activities.length <= 0) {
            fetchActivities(activities, dispatch)
        }

        if(!activityCookie || typeof activityCookie === "string" || activityCookie.id !== id) {
            router.push(`/dashboard/activities/`)
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
            <div>
                <button onClick={() => completePressed()}>Complete</button>
            </div>
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

        </section>
    )
}

export default activityStart