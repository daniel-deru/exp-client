import { configureStore } from "@reduxjs/toolkit"
import activitySlice from "./slices/activitySlice"
import shoppingListSelectedSlice  from "./slices/shoppingListSelected"
import errorSlice from "./slices/errorSlice"
import navSlice from "./slices/navSlice"
import itemSlice from "./slices/shoppingItemSlice"


export const store = configureStore({
    reducer: {
        activities: activitySlice,
        shoppingListSelected: shoppingListSelectedSlice,
        error: errorSlice,
        nav: navSlice,
        items: itemSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch