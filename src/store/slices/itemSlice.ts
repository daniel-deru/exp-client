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

const initialState: Item[] = []


export const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        setItems: (state: Item[], action: PayloadAction<Item[]>) => action.payload
    }
})

export const { setItems } = itemSlice.actions

export const selectItems = (state: RootState) => state.items

export default itemSlice.reducer