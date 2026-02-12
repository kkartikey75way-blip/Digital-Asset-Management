import { api } from "./api";

export interface MonthlyCost {
    month: string;
    total: number;
}

export interface AnalyticsResponse {
    totalAssets: number;
    totalCost: number;
    monthlyCosts: MonthlyCost[];
}

interface AnalyticsApiEnvelope {
    success: boolean;
    message: string;
    data: AnalyticsResponse;
}

export const analyticsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnalytics: builder.query<AnalyticsResponse, void>({
            query: () => "/analytics",
            transformResponse: (response: AnalyticsApiEnvelope) =>
                response.data,
            providesTags: ["Analytics"],
        }),
    }),
});

export const { useGetAnalyticsQuery } = analyticsApi;
