import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Category {
    id: string,
    userId: string,
    name: string,
}

interface CategoryState {
    category: Category[],
    isSucess: boolean,
    isLoading: boolean,
    error: string | null,
}

const initialState: CategoryState = {
    category: [],
    isSucess: false,
    isLoading: false,
    error: null,
}


//thunk
export const categoryThunk = createAsyncThunk(
    "category/categoryThunk",
    async (newCategory: Omit<Category, "id">, api) => {
        try {
            const response = await fetch(`http://localhost:3000/lists`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(newCategory),
            })
            if (!response.ok) {
                throw new Error('Category not added to the server')
            }
            const data = await response.json();
            return data;
        }
        catch (error: any) {
            return api.rejectWithValue(error.message || 'Something is wrong');
        }
    }
);


export const categorySlice = createSlice({
    name: 'category',
    initialState,

    reducers: {

        // setcategory: (state, action: PayloadAction<string>) => {
        //     state.category = action.payload
        // },
    },

    extraReducers: (builder) => {
        builder
            .addCase(categoryThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(categoryThunk.fulfilled, (state, action: PayloadAction<Category>) => {
                state.isLoading = false;
                state.isSucess = true;
                state.category.push(action.payload)
            })
            .addCase(categoryThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});



// Action creators are generated for each case reducer function
export const { } = categorySlice.actions
export default categorySlice.reducer