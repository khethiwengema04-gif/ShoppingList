import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../src/Features/login'
import registerReducer from './Features/register'
import Category from './Features/category'

export const store = configureStore({
	reducer: {
		login: loginReducer,
		register: registerReducer,
		category: Category
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
