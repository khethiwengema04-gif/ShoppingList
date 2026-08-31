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
    isLoading: boolean;
    error: string | null;
}

const initialState: ItemlistState = {
    itemList: [],
    name: "",
    quantity: 0,
    optionalNote: "",
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

    }

})

export const { AddName, AddQuantity, AddOptionalnote, AddItemList } = ItemListSlice.actions
export default ItemListSlice.reducer