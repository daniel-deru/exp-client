import { Activity } from "@/store/slices/activitySlice"

type TValidate = { error: boolean, message: string }

function validStartActivity( currActivity: Activity | undefined, activeActivity: Activity | string ): TValidate {
    // There is no current Activity cannot validate further.
    if(!currActivity) return { error: true, message: "There is no current activity!" }

    // The current activity has no items to shop for
    if(currActivity.items.length <= 0) {
        return { error: true, message: "There are no items in this activity to start!" }
    }

    // There is no active activity so the current activity will become the active activity
    if(!activeActivity) {
        return { error: false, message: "All good"}
    }

    // Check if active activity is the valid data type
    // Check if current activity is also the started acivity (incase of incomplete activity)
    const isValidStartedActivity =  typeof activeActivity !== "string" && activeActivity.id === currActivity.id

    // If the active activity is not the same as the current activity do not start the current activity
    // since there can only be one active activity at a time.
    if(!isValidStartedActivity){
        return {error: true, message: "You already have an active activity!"}
    }

    return { error: false, message: "All good" }
}

export default validStartActivity