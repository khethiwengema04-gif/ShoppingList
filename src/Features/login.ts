import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        email: '',
        password: ''
        
    },

    reducers: {
        getUser: state =>{
            state.email="khethiwe@gmail.com"
            state.password= "khethy"
        }
    }

})

export const { getUser } =loginSlice.actions
export default loginSlice.reducer
