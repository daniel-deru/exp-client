import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import type { RootState } from "../store"

export type Status = "Pending" | "Active" | "Finished" | "Cancelled"

export interface Activity {
    id: string
    name: string
    createdAt: string
    status: Status
    venue?: string
    datePlanned?: string
    description?: string
    location?: string
    startTime?: string
    endTime?: string
    tag?: string
    userId: string
}

const initialState: Activity[] = []


export const activitySlice = createSlice({
    name: "activities",
    initialState,
    reducers: {
        setActivities: (state: Activity[], action: PayloadAction<Activity[]>) => {
            state = action.payload

            return state
        }
    }
})

export const { setActivities } = activitySlice.actions

export const selectActivities = (state: RootState) => state.activities

export default activitySlice.reducer