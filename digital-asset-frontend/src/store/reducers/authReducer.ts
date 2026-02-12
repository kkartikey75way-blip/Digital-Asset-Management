import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "admin" | "manager" | "viewer";

interface AuthState {
    accessToken: string | null;
    role: UserRole | null;
    isInitialized: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    role: null,
    isInitialized: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                accessToken: string;
                role: UserRole;
            }>
        ) => {
            state.accessToken = action.payload.accessToken;
            state.role = action.payload.role;
            state.isInitialized = true;
        },
        logout: (state) => {
            state.accessToken = null;
            state.role = null;
            state.isInitialized = true;
        },
        setInitialized: (state) => {
            state.isInitialized = true;
        },
    },
});

export const { setCredentials, logout, setInitialized } =
    authSlice.actions;
export default authSlice.reducer;
