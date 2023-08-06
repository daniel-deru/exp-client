"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Activity, selectActivities } from '@/store/slices/activitySlice'
import styles from "./style.module.scss"
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import sumItems from '@/utils/calc/sum'
import startActivity from '@/shared/startActivity'
import ItemForm from '@/components/ItemForm'
import ItemList from '@/components/ItemList'
import fetchActivities from '@/utils/fetchActivities'
import { useRouter } from 'next/navigation'

const activityPage: React.FC = () => {

    const [activity, setActivity] = useState<Activity>()

    const dispatch = useAppDispatch()
    const activities = useAppSelector(selectActivities)
    
    const pathname = usePathname()
    const router = useRouter()

    // Get the active activity from the id in the URL
    function getActivity(){
        const pathnameArray = pathname.split("/")
        const id = pathnameArray[pathnameArray.length-1]
        const activity = activities.filter((activity) => activity.id === id)[0]

        return activity
    }

    async function startActivityCallback(activity: Activity | undefined){
        if(!activity) return alert("There is no activity")
        if(activity.status === "Finished") return alert("This activity has already been finished")
    
        // Make the necessary API Calls and validation checks
        await startActivity(activity, dispatch)
    
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
            <h1 className='text-2xl my-4 text-center'>{activity?.name}</h1>
            <p>{activity?.description}</p>
            <div className='flex justify-around my-4'>
                <div><b>Status: </b>{activity?.status}</div>
                <div><b>Total: </b>{sumItems(activity.items)}</div>
            </div>
            <div>

                {activity.status !== "Finished" && 
                    <button 
                        className="text-white py-1 px-3 rounded-md" 
                        onClick={() => startActivityCallback(activity)}
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