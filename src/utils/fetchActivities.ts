import { Activity, setActivities } from "@/store/slices/activitySlice"
import { call } from "./call"
import { useAppDispatch } from "@/store/hooks"
import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit"
import { Item } from "@/store/slices/shoppingItemSlice"

type dispatchType = ThunkDispatch<{
    activities: Activity[];
    shoppingListSelected: Item[];
    error: Error;
    nav: boolean;
    items: Item[];
}, undefined, AnyAction>

export default async function fetchActivities(activities: Activity[], dispatch: dispatchType){

    if(activities.length > 0) return
    
    const response = await call<Activity[]>("/activity/all?includeItems=true", "GET")

    if(response.error) {
        alert(response.message)
        return []
    }

    dispatch(setActivities(response.data))
}