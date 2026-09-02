import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ItemList {
    id?: string;
    name: string;
    quantity: number;
    optionalNote: string;

}

interface ItemlistState extends ItemList {
    itemList: ItemList[];
    name: string;
    quantity: number;
    optionalNote: string;
    editingItemId: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ItemlistState = {
    itemList: [],
    name: "",
    quantity: 0,
    optionalNote: "",
    editingItemId: null,
    isLoading: false,
    error: null,
}

export const ItemListThunk = createAsyncThunk(
    'ItemList/addItemThunk',
    async (newItemList: Omit<ItemList, 'id'>) => {

        const response = await fetch('http://localhost:3000/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItemList),
        })

        if (!response.ok) {
            throw new Error('Item was not added')
        }

        const data = await response.json()

        return data as ItemList
    }
)


export const getItemListThunk = createAsyncThunk(
    'ItemList/getItemListThunk',
    async (ListId: string, api) => { // Added type string for ListId
        try {
            // Fix: Changed &{listId} to ${ListId} and wrapped in backticks (`)
            const response = await fetch(`http://localhost:3000/items/${ListId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            // Fix: Updated error message to match a GET request failure
            if (!response.ok) throw new Error('Could not fetch items');

            const data = await response.json();
            return data as ItemList[];
        } catch (error: any) {
            return api.rejectWithValue(error.message || 'Failed to load items');
        }
    },
);


//DELETE THUNK
export const deleteItemList = createAsyncThunk(
    "ItemList/deleteItemList",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/items/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error("Failed to delete Item");
            return id;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    },
);

//EDIT THUNK
export const editList = createAsyncThunk(
    "List/editList",
    async (editList: ItemList, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `http://localhost:3000/items/${editList.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editList),
                },
            );
            if (!response.ok) throw new Error("Failed to update item");
            return (await response.json()) as ItemList;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    },
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
            state.name = action.payload.name
            state.quantity = action.payload.quantity
            state.optionalNote = action.payload.optionalNote;
        },
        clearEditingItem: (state) => {
            state.editingItemId = null;
            state.name = '';
            state.quantity = 0;
            state.optionalNote = '';
        }

    },

    extraReducers: (builder) => {
        builder
            .addCase(ItemListThunk.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(ItemListThunk.fulfilled, (state, action: PayloadAction<ItemList>) => {
                state.isLoading = false
                state.itemList.push(action.payload)
            })
            .addCase(ItemListThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || 'Failed'
            })


            // GET - Get items
            .addCase(getItemListThunk.pending, (state) => {
                state.isLoading = true
                state.error = null
            })

            .addCase(
                getItemListThunk.fulfilled,
                (state, action: PayloadAction<ItemList[]>) => {
                    state.isLoading = false
                    state.itemList = action.payload
                }
            )

            .addCase(getItemListThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || 'Failed to load items'
            })

            .addCase(deleteItemList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteItemList.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.itemList = state.itemList.filter((list) => list.id !== action.payload);
            })
            .addCase(deleteItemList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Failed to delete item';
            })

            .addCase(editList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editList.fulfilled, (state, action: PayloadAction<ItemList>) => {
                state.isLoading = false;
                state.itemList = state.itemList.map((item) =>
                    item.id === action.payload.id ? action.payload : item,
                );
                state.editingItemId = null;
                state.name = '';
                state.quantity = 0;
                state.optionalNote = '';
            })
            .addCase(editList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }

})

export const { AddName, AddQuantity, AddOptionalnote, AddItemList, setEditingItem, clearEditingItem } = ItemListSlice.actions
export default ItemListSlice.reducer