import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface User {
    id?: string
    fullnames: string,
    lastname: string,
    emailadress: string,
    cellphone: string,
    password: string,
    verifypassword: string

}

export interface RegisterState extends User {
    isloading: boolean
    error: string | null
}

const initialState: RegisterState = {
    fullnames: '',
    lastname: '',
    emailadress: '',
    cellphone: '',
    password: '',
    verifypassword: '',
    isloading: false,
    error: null,
}

//thunk
export const registerThunk = createAsyncThunk(
    'auth/registerUser',
    async (userInfo: Omit<User, 'id'>, api) => {
        try {
            const results = await axios.post('http://localhost:3000/users', userInfo)
            return results.data
        }
        catch (error: any) {
            return api.rejectWithValue(error.message || 'error ocurred')

        }
    }

)



export const registerSlice = createSlice({
    name: 'register',
    initialState,

    reducers: {

        setfullNames: (state, action: PayloadAction<string>) => {
            state.fullnames = action.payload
        },
        setLastName: (state, action: PayloadAction<string>) => {
            state.lastname = action.payload
        },
        setemailadress: (state, action: PayloadAction<string>) => {
            state.emailadress = action.payload
        },
        setcellphone: (state, action: PayloadAction<string>) => {
            state.cellphone = action.payload
        },

        setpassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },

        setverifypassword: (state, action: PayloadAction<string>) => {
            state.verifypassword = action.payload
        },

    },

    extraReducers: (build) => {
        build
            .addCase(registerThunk.pending, (state) => {
                state.isloading = true
                state.error = null
            })

            .addCase(registerThunk.fulfilled, (state) => {
                state.isloading = false
            })


            .addCase(registerThunk.rejected, (state, action) => {
                state.isloading = false
                state.error = action.payload as string
            })



    }


})

export const { setfullNames, setLastName, setemailadress, setcellphone, setpassword, setverifypassword } = registerSlice.actions
export default registerSlice.reducer