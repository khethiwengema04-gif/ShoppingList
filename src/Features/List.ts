
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ItemList {
    id?: string;
    name: string;
    userId: string;
    listId: string;
    quantity: number;
    optionalNote: string;
}

interface ItemlistState extends ItemList {
    itemList: ItemList[];
    allUserItems: ItemList[];
    name: string;
    quantity: number;
    optionalNote: string;
    editingItemId: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ItemlistState = {
    itemList: [],
    allUserItems: [],
    name: "",
    quantity: 0,
    optionalNote: "",
    userId: "",
    listId: "",
    editingItemId: null,
    isLoading: false,
    error: null,
}

// ADD ITEM
export const ItemListThunk = createAsyncThunk(
    'ItemList/addItemThunk',
    async (newItemList: Omit<ItemList, 'id'>) => {
        const response = await fetch('http://localhost:3001/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItemList),
        });

        if (!response.ok) {
            throw new Error('Item was not added');
        }

        return await response.json() as ItemList;
    }
);

// GET ITEMS FOR ONE CATEGORY
export const getItemListThunk = createAsyncThunk(
    'ItemList/getItemListThunk',
    async (details: { userId: string; listId: string }, api) => {
        try {
            const response = await fetch(
                `http://localhost:3001/items?userId=${encodeURIComponent(details.userId)}&listId=${encodeURIComponent(details.listId)}`
            );

            if (!response.ok) {
                throw new Error('Could not fetch items');
            }

            return await response.json() as ItemList[];
        } catch (error) {
            return api.rejectWithValue(
                (error as Error).message || 'Failed to load items'
            );
        }
    }
);

// GET ALL ITEMS FOR ONE USER
export const getAllUserItemsThunk = createAsyncThunk(
    'ItemList/getAllUserItemsThunk',
    async (userId: string, api) => {
        try {
            const response = await fetch(
                `http://localhost:3001/items?userId=${encodeURIComponent(userId)}`
            );

            if (!response.ok) {
                throw new Error('Could not fetch user items');
            }

            return await response.json() as ItemList[];
        } catch (error) {
            return api.rejectWithValue(
                (error as Error).message || 'Failed to load user items'
            );
        }
    }
);

// DELETE ITEM
export const deleteItemList = createAsyncThunk(
    "ItemList/deleteItemList",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `http://localhost:3001/items/${id}`,
                { method: "DELETE" }
            );

            if (!response.ok) {
                throw new Error("Failed to delete item");
            }

            return id;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// EDIT ITEM
export const editList = createAsyncThunk(
    "List/editList",
    async (editItem: ItemList, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `http://localhost:3001/items/${editItem.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editItem),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update item");
            }

            return await response.json() as ItemList;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const ItemListSlice = createSlice({
    name: 'AddItem',
    initialState,

    reducers: {
        AddName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },

        AddQuantity: (state, action: PayloadAction<number>) => {
            state.quantity = action.payload;
        },

        AddOptionalnote: (state, action: PayloadAction<string>) => {
            state.optionalNote = action.payload;
        },

        AddItemList: (state, action: PayloadAction<ItemList[]>) => {
            state.itemList = action.payload;
        },

        setEditingItem: (state, action: PayloadAction<ItemList>) => {
            state.editingItemId = action.payload.id || null;
            state.name = action.payload.name;
            state.quantity = action.payload.quantity;
            state.optionalNote = action.payload.optionalNote;
            state.userId = action.payload.userId;
            state.listId = action.payload.listId;
        },

        clearEditingItem: (state) => {
            state.editingItemId = null;
            state.name = '';
            state.quantity = 0;
            state.optionalNote = '';
            state.userId = '';
            state.listId = '';
        }
    },

    extraReducers: (builder) => {
        builder

            // ADD ITEM
            .addCase(ItemListThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(ItemListThunk.fulfilled, (state, action: PayloadAction<ItemList>) => {
                state.isLoading = false;
                state.itemList.push(action.payload);
                state.allUserItems.push(action.payload);
            })
            .addCase(ItemListThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to add item';
            })

            // GET ITEMS BY CATEGORY
            .addCase(getItemListThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getItemListThunk.fulfilled, (state, action: PayloadAction<ItemList[]>) => {
                state.isLoading = false;
                state.itemList = action.payload;
            })
            .addCase(getItemListThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Failed to load items';
            })

            // GET ALL USER ITEMS
            .addCase(getAllUserItemsThunk.pending, (state) => {
                state.error = null;
            })
            .addCase(getAllUserItemsThunk.fulfilled, (state, action: PayloadAction<ItemList[]>) => {
                state.allUserItems = action.payload;
            })
            .addCase(getAllUserItemsThunk.rejected, (state, action) => {
                state.error = action.payload as string || 'Failed to load user items';
            })

            // DELETE ITEM
            .addCase(deleteItemList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteItemList.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;

                state.itemList = state.itemList.filter(
                    item => item.id !== action.payload
                );

                state.allUserItems = state.allUserItems.filter(
                    item => item.id !== action.payload
                );
            })
            .addCase(deleteItemList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Failed to delete item';
            })

            // EDIT ITEM
            .addCase(editList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editList.fulfilled, (state, action: PayloadAction<ItemList>) => {
                state.isLoading = false;

                const index = state.itemList.findIndex(
                    item => item.id === action.payload.id
                );

                if (index !== -1) {
                    state.itemList[index] = action.payload;
                }

                const allItemsIndex = state.allUserItems.findIndex(
                    item => item.id === action.payload.id
                );

                if (allItemsIndex !== -1) {
                    state.allUserItems[allItemsIndex] = action.payload;
                }

                state.editingItemId = null;
                state.name = '';
                state.quantity = 0;
                state.optionalNote = '';
            })
            .addCase(editList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Failed to update item';
            });
    }
});

export const {
    AddName,
    AddQuantity,
    AddOptionalnote,
    AddItemList,
    setEditingItem,
    clearEditingItem
} = ItemListSlice.actions;

export default ItemListSlice.reducer;
