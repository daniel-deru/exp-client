import { Activity, Item, updateActivity } from "@/store/slices/activitySlice"
import { call } from "@/utils/call"
import { getCookie, setCookie } from "@/utils/cookie"
import validStartActivity from "@/utils/startActivityCheck"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"

type dispatchType = ThunkDispatch<{
    activities: Activity[];
    shoppingListSelected: Item[];
    error: Error;
    nav: boolean;
    items: Item[];
}, undefined, AnyAction>


export default async function startActivity(activity: Activity | undefined, dispatch: dispatchType){
    const startedActivity = getCookie<Activity>("activeActivity")

    if(!activity) return alert("No activity Found!")

    if(activity.status === "Finished") return alert("This activity has already been finished")

    if(!startedActivity) {
      setCookie("activeActivity", JSON.stringify(activity), "30d")
    } 
    else {
      return alert("You can only have one active Activity at a time.")
    }

    const validActivity = validStartActivity(activity, startedActivity)

    if(validActivity.error) return alert(validActivity.message)

    // // The current activity has not been started yet - call the API to start activity
    if(!activity.startTime){
        const response = await call<Activity>(`/activity/start/${activity.id}`, "POST")

        if(response.error) return alert("Activity could not be started.")
        // Set the current activity as the active activity.
        setCookie("activeActivity", JSON.stringify(activity), "30d")
        dispatch(updateActivity(response.data))
    }


}