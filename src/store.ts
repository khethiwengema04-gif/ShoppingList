import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../src/Features/login'

export default configureStore({
	reducer: {
		login: loginReducer,
	},
})

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch