"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Activity, Item, selectActivities } from '@/store/slices/activitySlice'
import styles from "./start.module.scss"
import ShopItemModal from '@/components/Modals/ShopItemModal/ShopItemModal'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import fetchActivities from '@/utils/fetchActivities'

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

    function handleComplete(event: React.ChangeEvent<HTMLInputElement>, itemIndex: number){

        setItems(prevItems => {
            prevItems[itemIndex].completed = event.target.checked
            return [...prevItems]
        })

        if(event.target.checked) {
            setCurrentItem(items[itemIndex])
            setShowItemDetails(true)
        }
    }

    function completePressed(){
        // router.push("/dashboard/activities")
        console.log(activities)
        // TODO: update the activity on the server
    }

    useEffect(() => {

        fetchActivities(activities, dispatch)
        const id = pathname.split("/")[3]
        const activity = activities.filter(activity => activity.id === id)[0]

        if(activity instanceof Object){
            // const itemList: ItemComplete[] = activity.items.map(item => ({...item, completed: false}))

            setCurrentActivity(activity)
            setItems(activity.items)
        }
        
    }, [activities])
    console.log(items)

    return (
        <section className={styles.start}>
            <ShopItemModal
                showItemDetail={showItemDetails}
                setItems={setItems}
                item={currentItem} 
                setItemDetail={setShowItemDetails}
            />
            <h1>{currentActivity?.name}</h1>
            <ul className="w-full">
                {[...items].sort((a) => a.completed ? 1 : -1).map((item, index) => (
                    <li className={`w-full flex justify-between ${item.completed ? styles.completed : ""}`} key={item.id}>
                        <span>
                            <input type="checkbox" onChange={(e) => handleComplete(e, index)} checked={item.completed}/>
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