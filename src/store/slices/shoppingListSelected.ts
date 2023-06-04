import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import type { RootState } from "../store"
import { Item } from "./activitySlice"

const initialState: Item[] = []

export const shoppingListSelectedSlice = createSlice({
    name: "shoppingListSelected",
    initialState,
    reducers: {
        addItem: (state: Item[], action: PayloadAction<Item>) => {
            state.push(action.payload)
        },
        removeItem: (state: Item[], action: PayloadAction<Item>) => {
           return state.filter((item: Item) => item.id !== action.payload.id)
        },
        clearSelected: () => {
            return []
        }
    }
})

export const { addItem, removeItem, clearSelected } = shoppingListSelectedSlice.actions

export const selectShoppingListSelected = (state: RootState) => state.shoppingListSelected

export default shoppingListSelectedSlice.reducer