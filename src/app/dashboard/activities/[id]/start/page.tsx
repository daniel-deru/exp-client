"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import { Activity, Item, selectActivities } from '@/store/slices/activitySlice'
import styles from "./start.module.scss"
import ShopItemModal from '@/components/Modals/ShopItemModal/ShopItemModal'

interface ItemComplete extends Item {
    completed: boolean
}

export interface ItemDetail {
    show: boolean,
    item?: Item
}

const activityStart = () => {

    const [currentActivity, setCurrentActivity] = useState<Activity>()
    const [currentItem, setCurrentItem] = useState<Item>()
    const [items, setItems] = useState<ItemComplete[]>([])
    const [itemsLeft, setItemsLeft] = useState<number>(0)
    const [showItemDetails, setShowItemDetails] = useState<ItemDetail>({show: false})
    const [changeItems, setChangeItems] = useState<any[]>([])

    const pathname = usePathname()
    const router = useRouter()
    const activities = useAppSelector(selectActivities)

    function handleComplete(event: React.ChangeEvent<HTMLInputElement>, itemIndex: number){

        setItems(prevItems => {
            prevItems[itemIndex].completed = event.target.checked
            return [...prevItems]
        })

        if(event.target.checked) {
            setShowItemDetails({show: true, item: items[itemIndex]})
        }

        // setItemsLeft(prevItemsLeft => event.target.checked ? prevItemsLeft-1 : prevItemsLeft+1)
    }

    function completePressed(){
        router.push("/dashboard/activities")
    }

    const fetchData = useCallback(() => {
        if(activities.length <= 0) router.push('/dashboard/activities')

        const id = pathname.split("/")[3]

        const activity = activities.filter(activity => activity.id === id)

        if(activity.length <= 0) router.push('/dashboard/activities')

        
        if(activity.length > 0) {
            const itemList: ItemComplete[] = activity[0].items.map(item => ({...item, completed: false}))

            setCurrentActivity(activity[0])
            setItems(itemList)
            // setItemsLeft(itemList.length)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [pathname, fetchData])

    return (
        <section className={styles.start}>
            <ShopItemModal 
                itemDetail={showItemDetails} 
                setItemDetail={setShowItemDetails} 
                updateItems={setChangeItems}
            />
            <h1>{currentActivity?.name}</h1>
            <ul className="w-full">
                {[...items.sort((a) => a.completed ? 1 : -1)].map((item, index) => (
                    <li className={`w-full flex justify-between ${item.completed ? styles.completed : ""}`} key={item.id}>
                        <span>
                            <input type="checkbox" onChange={(e) => handleComplete(e, index)} checked={item.completed}/>
                        </span>
                        <span>{item.name}</span>
                        <span>{item.quantity}</span>
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