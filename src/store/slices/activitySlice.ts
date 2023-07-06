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
           return action.payload
        },
        addActivity: (state: Activity[], action: PayloadAction<Activity>) => {
           return [...state, action.payload]
        },
        addItem: (state: Activity[], action: PayloadAction<{activityId: string, item: Item}>) => {

            return state.map((activity: Activity) => {
                if(activity.id === action.payload.activityId){
                    if(activity.items) {
                        activity.items = [...activity.items, action.payload.item]
                    } else {
                        activity.items = [action.payload.item]
                    }
                }
                return activity
            })
        },

        addItems: (state: Activity[], action: PayloadAction<{activityId: string, items: Item[]}>) => {

            const newActivities = state.map((activity: Activity) => {
                if(activity.id === action.payload.activityId){
                    if(activity.items) {
                        activity.items = [...activity.items, ...action.payload.items]
                    } else {
                        activity.items = [...action.payload.items]
                    }
                }
                return activity
            })

            return [...newActivities]
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

export const { setActivities, addItem, deleteActivity, addActivity, addItems } = activitySlice.actions

export const selectActivities = (state: RootState) => state.activities

export default activitySlice.reducer