"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Activity, selectActivities } from '@/store/slices/activitySlice'
import styles from "./style.module.scss"
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { call } from '@/utils/call'

import ItemForm from '@/components/ItemForm'
import ItemList from '@/components/ItemList'
import Link from 'next/link'
import fetchActivities from '@/utils/fetchActivities'
import { setCookie, getCookie } from '@/utils/cookie'
import { useRouter } from 'next/navigation'

const activityPage: React.FC = () => {

    const [activity, setActivity] = useState<Activity>()

    const dispatch = useAppDispatch()
    const activities = useAppSelector(selectActivities)
    
    const pathname = usePathname()
    const router = useRouter()

    function getActivity(){
        const pathnameArray = pathname.split("/")
        const id = pathnameArray[pathnameArray.length-1]
        const activity = activities.filter((activity) => activity.id === id)[0]

        return activity
    }

    async function startActivity(){
        if(!activity) return

        if(activity.items.length <= 0) {
            return alert("There are no items in this activity to start!")
        }

        const startedActivity = getCookie<Activity>("activeActivity")

        // If the active activity is not the same as the current activity do not start the current activity
        // since there can only be one active activity at a time.
        if(startedActivity && typeof startedActivity !== "string"){
            // Check if current activity is the active activity
            if(startedActivity.id !== activity.id) {
                return alert("You Already have an active activity!")
            }
            // Go to the activity start page since the current activity is the active activity
            router.push(pathname + "/start")
        }

        // The current activity has not been started yet
        if(!activity.startTime){
            const response = await call(`/activity/start/${activity.id}`, "POST")

            if(response.error) return alert("Activity could not be started.")

            // Set the current activity as the active activity.
            setCookie("activeActivity", JSON.stringify(activity), "30d")
        }

        router.push(pathname + "/start")
    }

    // Check if activities are in state. If not then request activities from server
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

                {activity.status !== "Finished" && 
                    <button 
                        className="bg-red-500 text-white py-1 px-3 rounded-md" 
                        onClick={() => startActivity()}
                    >
                        {activity.startTime ? "Continue" : "Start"}
                    </button>
                }

            </div>
            <section>
                {activity.status !== "Finished" && 
                    <div className='mr-4'>
                        <ItemForm activity={activity} />
                    </div>
                }
                <h2 className='mt-4'>Items</h2>
               <ItemList activity={activity} />
            </section>
        </div>
    )
}

export default activityPage