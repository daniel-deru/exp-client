import { configureStore } from "@reduxjs/toolkit"
import activitySlice from "./slices/activitySlice"


export const store = configureStore({
    reducer: {
        activities: activitySlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch