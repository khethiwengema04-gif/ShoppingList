
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import loginReducer from "../src/Features/login";
import registerReducer from "./Features/register";
import Category from "./Features/category";
import List from "./Features/List";
import profile from "./Features/profile";

const rootReducer = combineReducers({
	login: loginReducer,
	register: registerReducer,
	category: Category,
	list: List,
	profile: profile,
});

const loadSavedData = () => {
	try {
		const savedData = localStorage.getItem("shoppingAppData");

		if (savedData) {
			const parsedData = JSON.parse(savedData);

			return {
				category: parsedData.category,
				list: parsedData.list,
			};
		}
	} catch (error) {
		console.error("Could not load saved data:", error);
	}

	return undefined;
};

export const store = configureStore({
	reducer: rootReducer,
	preloadedState: loadSavedData(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
	try {
		const state = store.getState();

		localStorage.setItem(
			"shoppingAppData",
			JSON.stringify({
				category: state.category,
				list: state.list,
			})
		);
	} catch (error) {
		console.error("Could not save data:", error);
	}
});
