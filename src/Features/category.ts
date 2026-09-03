import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Category {
    id: string;
    userId: string;
    name: string;
}

interface CategoryState {
    category: Category[];
    isSucess: boolean;
    editingCategoryId: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    category: [],
    isSucess: false,
    isLoading: false,
    error: null,
    editingCategoryId: null,
}


export const categoryThunk = createAsyncThunk<
    Category,
    Omit<Category, "id">,
    { rejectValue: string }
>(
    "category/categoryThunk",
    async (newCategory, api) => {
        try {
            const response = await fetch(`http://localhost:3000/lists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCategory),
            })
            if (!response.ok) {
                throw new Error('Category not added to the server')
            }
            const data = await response.json();
            return data as Category;
        }
        catch (error: any) {
            return api.rejectWithValue(error.message || 'Something is wrong');
        }
    }
);



//DELETE THUNK
export const deleteCategory = createAsyncThunk(
    "Category/deleteCategory",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/lists/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error("Failed to delete Category item");
            return id;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    },
);




//EDIT THUNK
export const editCategory = createAsyncThunk(
    "Category/editCategory",
    async (editCategory: Category, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `http://localhost:3000/lists/${editCategory.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editCategory),
                },
            );
            if (!response.ok) throw new Error("Failed to update category");
            return (await response.json()) as Category;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    },
);


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
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
                // action.payload is now safely recognized as a string
                state.error = action.payload ?? 'Something went wrong';
            })

            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.category = state.category.filter((list) => list.id !== action.payload);
            })
            .addCase(editCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                state.isLoading = false;
                state.category = state.category.map((list) =>
                    list.id === action.payload.id ? action.payload : list,
                );
                state.editingCategoryId = null;
            });

    }
});

export default categorySlice.reducer
