import { createSlice } from '@reduxjs/toolkit'

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        fullnames: '',
        lastname: '',
        emailadress: '',
        cellphone: '',
        password: '',
        verifypassword: ''
        
        
    },

    reducers: {
        getUser: state =>{
            state. fullnames= "khethiwe amanda"
            state.lastname= "ngema"
            state.emailadress="khethiwe@gmail.com"
            state.password= "khethy"
            state.verifypassword= "khethy"
           
        }
    }

})

export const { getUser } =registerSlice.actions
export default registerSlice.reducer