import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import type { RootState } from "../store"

interface Error {
    error: boolean,
    message?: string
}

const initialState: Error = {error: false}


export const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError: (state: Error, action: PayloadAction<string>) => {
            if(action.payload) return { error: true, message: action.payload }
            return { error: false }
        }
    }
})

export const { setError } = errorSlice.actions

export const selectError = (state: RootState) => state.error

export default errorSlice.reducer