import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ItemList {
    id?: string
    name: string
    quantity: number
    optionalNote: string
}

interface ItemlistState extends ItemList {
    itemList: ItemList[];
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
    'ItemList/ItemListThunk',
    async (newItemList: Omit<ItemList, 'id'>) => {
        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItemList),
        });
        if (!response.ok) throw new Error('Item was not added');
        return (await response.json()) as ItemList

        const data = await response.json();
        console.log(data)
        return data;
    }
);

export const getItemListThunk = createAsyncThunk(
    'ItemList/ItemListThunk',
    async () => {
        const response = await fetch('', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        });

        if (!response.ok) throw new Error('Item was not added');
        return (await response.json()) as ItemList

        const data = await response.json();
        console.log(data)
        return data;
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
        AddItemList: (state, action: PayloadAction<[]>) => {
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
    },
})

export const { AddName, AddQuantity, AddOptionalnote, AddItemList } = ItemListSlice.actions
export default ItemListSlice.reducer