"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import { Activity, Item, selectActivities } from '@/store/slices/activitySlice'
import styles from "./style.module.scss"

import ItemForm from '@/components/ItemForm'
import ItemList from '@/components/ItemList'
import Link from 'next/link'

const activityPage: React.FC = () => {

    const [activity, setActivity] = useState<Activity>()
    const [items, setItems] = useState<Item[]>([])
    const pathname = usePathname()
    const activities = useAppSelector(selectActivities)


    useEffect(() => {

        const pathnameArray = pathname.split("/")

        const id = pathnameArray[pathnameArray.length-1]

        const activity = activities.filter((activity) => activity.id === id)

        setActivity(activity[0])
        setItems(activity[0]?.items || [])

    }, [activities, activity])

    return (
        <div className={styles.activity}>
            <h1 className='text-2xl my-4'>{activity?.name}</h1>
            <p>{activity?.description}</p>
            <div className='flex justify-around my-4'>
                <div><b>Status: </b>{activity?.status}</div>
                <div><b>Venue: </b>{activity?.venue}</div>
            </div>
            <div>
                <button className="bg-red-500 text-white py-1 px-3 rounded-md"><Link href={`${pathname}/start`}>Start</Link></button>
            </div>
            <section>
                <div className='mr-4'>
                    <ItemForm activity={activity} setItems={setItems}/>
                </div>
                <h2 className='mt-4'>Items</h2>
               <ItemList items={items} setItems={setItems}/>
            </section>
        </div>
    )
}

export default activityPage