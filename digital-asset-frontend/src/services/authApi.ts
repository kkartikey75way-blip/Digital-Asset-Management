import { api } from "./api";

interface LoginRequest {
    email: string;
    password: string;
}

// Matches backend sendResponse shape:
// { success: boolean; message: string; data: { accessToken: string } }
// { success: boolean; message: string; data: { accessToken: string, role: string } }
export interface AuthResponseData {
    accessToken: string;
    role: "admin" | "manager" | "viewer";
}

export interface VerifyResponseData {
    email: string;
    role: "admin" | "manager" | "viewer";
}

export interface AuthApiResponse<T = AuthResponseData> {
    success: boolean;
    message: string;
    data: T;
}

interface RegisterRequest {
    email: string;
    password: string;
    role: "admin" | "manager" | "viewer";
}

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthApiResponse, LoginRequest>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),

        register: builder.mutation<void, RegisterRequest>({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            }),
        }),

        refresh: builder.mutation<AuthApiResponse, void>({
            query: () => ({
                url: "/auth/refresh",
                method: "POST",
            }),
        }),

        verify: builder.query<AuthApiResponse<VerifyResponseData>, string>({
            query: (token) => ({
                url: `/auth/verify?token=${token}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshMutation,
    useVerifyQuery,
} = authApi;
