import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from './register';
import type { RootState } from '../store';

export interface ProfileState {
    id?: number | string;
    fullname: string;   // Was: name
    lastname: string;   // Was: surname
    email: string;
    cellphone: string;  // Was: cellNumber
    password: string;
    isLoading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    fullname: '',
    lastname: '',
    email: '',
    cellphone: '',
    password: '',
    isLoading: false,
    error: null,
};

const BASE_API_URL = 'http://localhost:3001/users';

// Fixed the fallback state lookups
const getAuthenticatedUserId = (state: RootState): string | null | number => {
    // Corrected to look into the unified login slice state path
    const loginSlice = (state as any).login;
    if (loginSlice?.user?.id) {
        return loginSlice.user.id;
    }

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        return parsedUser.id || null;
    }
    return null;
};

// READ: Fetch current data
export const fetchProfileData = createAsyncThunk<any, void, { state: RootState; rejectValue: string }>(
    'profile/fetchProfileData',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const userId = getAuthenticatedUserId(state);

            if (!userId) throw new Error('No authenticated user session found.');

            const response = await fetch(`${BASE_API_URL}/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch profile data.');

            return await response.json();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// UPDATE: Save profile and credential data 
export const updateProfileData = createAsyncThunk<any, Omit<ProfileState, 'isLoading' | 'error'>, { state: RootState; rejectValue: string }>(
    'profile/updateProfileData',
    async (formData, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const userId = getAuthenticatedUserId(state);

            if (!userId) throw new Error('Authentication session expired.');

            const response = await fetch(`${BASE_API_URL}/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, id: userId }),
            });

            if (!response.ok) throw new Error('Failed to update profile records.');
            return await response.json();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearProfileStore: () => initialState
    },
    extraReducers: (builder) => {
        builder
            // FETCH CASES
            .addCase(fetchProfileData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.id = action.payload.id;
                // Safeguard keys to target the corrected variable names
                state.fullname = action.payload.fullname || action.payload.name || '';
                state.lastname = action.payload.lastname || action.payload.surname || '';
                state.email = action.payload.email || '';
                state.cellphone = action.payload.cellphone || action.payload.cellNumber || '';
                state.password = action.payload.password || '';
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // UPDATE CASES
            .addCase(updateProfileData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.fullname = action.payload.fullname;
                state.lastname = action.payload.lastname;
                state.email = action.payload.email;
                state.cellphone = action.payload.cellphone;
                state.password = action.payload.password;
                alert('Profile saved successfully!');
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                alert(`Error: ${action.payload}`);
            });
    },
});

export const { clearProfileStore } = profileSlice.actions;
export default profileSlice.reducer;
