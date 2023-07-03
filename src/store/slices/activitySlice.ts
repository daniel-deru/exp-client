import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import type { RootState } from "../store"

export type Status = "Pending" | "Active" | "Finished" | "Cancelled"
export type ItemType = "Product" | "Service"

export interface Item {
    id: string
    price: number
    name: string
    planned: boolean
    paid: boolean
    quantity: number
    type: ItemType
    tag?: string
    description?: string
    activityId: string
    userId: string
}

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
    items: Item[]
}

const initialState: Activity[] = []


export const activitySlice = createSlice({
    name: "activities",
    initialState,
    reducers: {
        setActivities: (state: Activity[], action: PayloadAction<Activity[]>) => {
            state = action.payload

            return state
        },
        addItem: (state: Activity[], action: PayloadAction<{activityId: string, item: Item}>) => {
            return state.map((activity: Activity) => {
                if(activity.id === action.payload.activityId){
                    activity.items.push(action.payload.item)
                }
                return activity
            })
        },
        deleteActivity: (state: Activity[], action: PayloadAction<Activity>) => {
            return state.filter((activity: Activity) => {
                return activity.id !== action.payload.id
            })
        },
        editItem: (state: Activity[], action: PayloadAction<Item>) => {
            const item = action.payload

            const activityIndex = state.findIndex(activity => activity.id === item.activityId)
            const itemIndex = state[activityIndex].items.findIndex(i => i.id === item.id)

            state[activityIndex].items[itemIndex] = {...item}
        }
    }
})

export const { setActivities, addItem, deleteActivity } = activitySlice.actions

export const selectActivities = (state: RootState) => state.activities

export default activitySlice.reducer