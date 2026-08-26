import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface List {
    list: string
}

const initialState: List = {
    list: '',
}


export const listSlice = createSlice({
    name: 'list',
    initialState,

    reducers: {

        setlist: (state, action: PayloadAction<string>) => {
            state.list = action.payload
        },
    },

    extraReducers: (build) => {
        // build
        //     .addCase(linkThunk.pending, (state) => {

        //     })

    }
})

// Action creators are generated for each case reducer function
export const { setlist } = listSlice.actions
export default listSlice.reducer