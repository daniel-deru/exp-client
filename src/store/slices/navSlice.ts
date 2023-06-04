import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import type { RootState } from "../store"

const initialState: boolean = false

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        toggleNav: (state: boolean) => !state
    }
})

export const { toggleNav } = navSlice.actions

export const selectNavState = (state: RootState) => state.nav

export default navSlice.reducer