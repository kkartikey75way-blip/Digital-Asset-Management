import {
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/store";
import { setCredentials, logout } from "../store/reducers/authReducer";
import { showError } from "../utils/toast";
import type { AuthApiResponse } from "./authApi";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshResult = await rawBaseQuery(
            {
                url: "/auth/refresh",
                method: "POST",
            },
            api,
            extraOptions
        );

        if (refreshResult.data) {
            const { data } =
                refreshResult.data as AuthApiResponse;
            const accessToken = data.accessToken;
            const role = data.role;

            api.dispatch(
                setCredentials({
                    accessToken,
                    role,
                })
            );

            result = await rawBaseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
            showError("Session expired. Please login again.");
        }
    }

    return result;
};
