import { useState, useEffect, useCallback } from "react"
import { call } from "@/utils/call"
import { Activity, selectActivities, setActivities } from "@/store/slices/activitySlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

export default function useActivities(){
    const [localActivities, setLocalActivities] = useState<Activity[]>([])

    const activities = useAppSelector(selectActivities)
    const dispatch = useAppDispatch()

    const fetchActivities = useCallback(async () => {
        const response = await call<Activity[]>("/activity/all?includeItems=true", "GET")

        if(response.error) {
            alert(response.message)
            return []
        }

        dispatch(setActivities(response.data))
        setLocalActivities(response.data)
    }, [])

    useEffect(() => {
       
        if(activities.length <= 0){
            fetchActivities()
        }
        else {
            setLocalActivities(activities)
        }
    }, [fetchActivities])

    return localActivities
}