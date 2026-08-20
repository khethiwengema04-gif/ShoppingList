import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface RegisterState {
    fullnames: string,
    lastname: string,
    emailadress: string,
    cellphone: string,
    password: string,
    verifypassword: string
}

const initialState: RegisterState = {
    fullnames: '',
    lastname: '',
    emailadress: '',
    cellphone: '',
    password: '',
    verifypassword: '',
}

//thunk

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


})

export const { setfullNames, setLastName, setemailadress, setcellphone, setpassword, setverifypassword } = registerSlice.actions
export default registerSlice.reducer