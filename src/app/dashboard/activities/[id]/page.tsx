"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Activity, selectActivities } from '@/store/slices/activitySlice'
import styles from "./style.module.scss"
import { useAppDispatch, useAppSelector } from '@/store/hooks'

import ItemForm from '@/components/ItemForm'
import ItemList from '@/components/ItemList'
import Link from 'next/link'
import fetchActivities from '@/utils/fetchActivities'

const activityPage: React.FC = () => {

    const [activity, setActivity] = useState<Activity>()
    const pathname = usePathname()
    const dispatch = useAppDispatch()
    const activities = useAppSelector(selectActivities)

    function getActivity(){
        const pathnameArray = pathname.split("/")

        const id = pathnameArray[pathnameArray.length-1]

        const activity = activities.filter((activity) => activity.id === id)[0]

        return activity
    }

    useEffect(() => {
        fetchActivities(activities, dispatch)
        const activity = getActivity()
        setActivity(activity)

    }, [activities, activity])

    if(!activity) return <h1>Loading...</h1>

    return (
        <div className={styles.activity}>
            <h1 className='text-2xl my-4'>{activity?.name}</h1>
            <p>{activity?.description}</p>
            <div className='flex justify-around my-4'>
                <div><b>Status: </b>{activity?.status}</div>
                <div><b>Venue: </b>{activity?.venue}</div>
            </div>
            <div>
                <button className="bg-red-500 text-white py-1 px-3 rounded-md">
                    <Link href={`${pathname}/start`}>Start</Link>
                </button>
            </div>
            <section>
                <div className='mr-4'>
                    <ItemForm activity={activity} />
                </div>
                <h2 className='mt-4'>Items</h2>
               <ItemList activity={activity} />
            </section>
        </div>
    )
}

export default activityPage