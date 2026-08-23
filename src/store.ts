import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../src/Features/login'
import registerReducer from './Features/register'

export const store = configureStore({
	reducer: {
		login: loginReducer,
		register: registerReducer
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
