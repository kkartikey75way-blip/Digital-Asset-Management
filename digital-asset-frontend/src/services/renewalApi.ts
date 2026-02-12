import { api } from "./api";

export interface Renewal {
    _id: string;
    asset: string;
    cost: number;
    renewedAt: string;
}

interface RenewalResponse {
    data: Renewal[];
}

interface CreateRenewalRequest {
    assetId: string;
    cost: number;
}

export const renewalApi = api.injectEndpoints({
    endpoints: (builder) => ({
        renewAsset: builder.mutation<void, CreateRenewalRequest>({
            query: ({ assetId, cost }) => ({
                url: `/renewals/${assetId}`,
                method: "POST",
                body: { cost },
            }),
            invalidatesTags: ["Asset", "Analytics"],
        }),

        getRenewals: builder.query<RenewalResponse, string>({
            query: (assetId) => `/renewals/${assetId}`,
            providesTags: ["Asset"],
        }),
    }),
});

export const {
    useRenewAssetMutation,
    useGetRenewalsQuery,
} = renewalApi;
