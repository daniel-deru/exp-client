"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import { Activity, selectActivities } from '@/store/slices/activitySlice'

import ItemForm from '@/components/ItemForm'
import ItemList from '@/components/ItemList'

const activityPage: React.FC = () => {

    const [activity, setActivity] = useState<Activity>()
    const pathname = usePathname()
    const activities = useAppSelector(selectActivities)


    useEffect(() => {

        const pathnameArray = pathname.split("/")

        const id = pathnameArray[pathnameArray.length-1]

        const activity = activities.filter((activity) => activity.id === id)

        setActivity(activity[0])

    }, [activities, activity])

    return (
        <div style={{width: "85vw"}}>
            <h1 className='text-2xl my-4'>{activity?.name}</h1>
            <p>{activity?.description}</p>
            <div className='flex justify-around my-4'>
                <div><b>Status: </b>{activity?.status}</div>
                <div><b>Venue: </b>{activity?.venue}</div>
            </div>
            <section>
                <div className='mr-4'>
                    <ItemForm activity={activity}/>
                </div>
                <h2 className='mt-4'>Items</h2>
               <ItemList items={activity?.items || []}/>
            </section>
        </div>
    )
}

export default activityPage