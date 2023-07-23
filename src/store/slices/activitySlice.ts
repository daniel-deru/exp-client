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
    completed: boolean
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
        // addItem: (state: Activity[], action: PayloadAction<{activityId: string, item: Item}>) => {

        //     return state.map((activity: Activity) => {
        //         if(activity.id === action.payload.activityId){
        //             if(activity.items) {
        //                 activity.items = [...activity.items, action.payload.item]
        //             } else {
        //                 activity.items = [action.payload.item]
        //             }
        //         }
        //         return activity
        //     })
        // },

        addItems: (state: Activity[], action: PayloadAction<{activityId: string, items: Item[]}>) => {
            const { activityId, items } = action.payload
            
            const activity = state.filter(activity => activity.id === activityId)[0]
            const activityCopy = { ...activity }
            const itemsCopy = [...activity.items, ...items ]

            activityCopy.items = itemsCopy
            
            const activityIndex = state.indexOf(activity)

            state.splice(activityIndex, 1)
            return [...state, activityCopy]
        },

        deleteActivity: (state: Activity[], action: PayloadAction<Activity>) => {
            return state.filter((activity: Activity) => {
                return activity.id !== action.payload.id
            })
        },

        addItemToActivity: (state: Activity[], action: PayloadAction<Item>) => {
            const activity = state.find(activity => activity.id === action.payload.activityId)
            
            if(!activity) return state
            
            activity.items.push(action.payload)
        },
        updateItem: (state: Activity[], action: PayloadAction<Item>) => {
            const activity = state.find(activity => activity.id === action.payload.activityId)
            
            if(!activity) return state

            let item = activity.items.find(item => item.id === action.payload.id)

            if(!item) return state

            item = action.payload
        },

        updateActivity: (state: Activity[], action: PayloadAction<Activity>) => {
            let activityIndex = state.findIndex(activity => activity.id === action.payload.id)

            if(activityIndex === -1) return state

            state[activityIndex] = { ...state[activityIndex], ...action.payload }

            return state
        }
    }
})

export const { 
    setActivities, 
    addItemToActivity, 
    deleteActivity, 
    addActivity, 
    addItems, 
    updateItem,
    updateActivity 
} = activitySlice.actions

export const selectActivities = (state: RootState) => state.activities

export default activitySlice.reducer