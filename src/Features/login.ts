import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'


export interface User {
    email: string
    password: string,
}
export interface loginState extends User {
    isloading: boolean
    error: string | null
}

const initialState: loginState = {
    email: '',
    password: '',
    isloading: false,
    error: null,
}
//thunk

export const loginThunk = createAsyncThunk(
    'auth/loginUser',
    async (userDetail: User, api) => {
        try {
            const results = await axios.get('http://localhost:3000/users', {
                params: userDetail,
            })
            return results.data
        }
        catch (error: any) {
            return api.rejectWithValue(error.message || 'error ocurred')
        }
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState,

    reducers: {

        setemail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setpassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },

    },

    extraReducers: (build) => {
        build
            .addCase(loginThunk.pending, (state) => {
                state.isloading = true
                state.error = null
            })

            .addCase(loginThunk.fulfilled, (state) => {
                state.isloading = false
            })


            .addCase(loginThunk.rejected, (state, action) => {
                state.isloading = false
                state.error = action.payload as string
            })
    }


})

export const { setemail, setpassword } = loginSlice.actions
export default loginSlice.reducer
