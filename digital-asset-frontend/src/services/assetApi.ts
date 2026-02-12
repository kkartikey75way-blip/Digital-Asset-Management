import { api } from "./api";

export type AssetCategory =
    | "software"
    | "domain"
    | "cloud"
    | "hardware";

export interface Asset {
    _id: string;
    name: string;
    category: AssetCategory;
    cost: number;
    licenseKey: string;
    expiryDate: string;
    createdAt: string;
}

interface GetAssetsParams {
    page?: number;
    limit?: number;
    search?: string;
}

export interface PaginatedAssetsResponse {
    data: Asset[];
    total: number;
    page: number;
    limit: number;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export const assetApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAssets: builder.query<
            PaginatedAssetsResponse,
            GetAssetsParams
        >({
            query: ({
                page = 1,
                limit = 5,
                search = "",
            }) => ({
                url: "/assets",
                params: { page, limit, search },
            }),
            transformResponse: (
                response: ApiResponse<PaginatedAssetsResponse>
            ) => response.data,
            providesTags: ["Asset"],
        }),

        createAsset: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: "/assets",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Asset", "Analytics"],
        }),

        deleteAsset: builder.mutation<void, string>({
            query: (id) => ({
                url: `/assets/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Asset", "Analytics"],
        }),

        exportAssetsCSV: builder.query<Blob, void>({
            query: () => ({
                url: "/reports/assets/csv",
                responseHandler: (response) =>
                    response.blob(),
            }),
        }),

        exportAssetsPDF: builder.query<Blob, void>({
            query: () => ({
                url: "/reports/assets/pdf",
                responseHandler: (response) =>
                    response.blob(),
            }),
        }),
    }),
});

export const {
    useGetAssetsQuery,
    useCreateAssetMutation,
    useDeleteAssetMutation,
    useLazyExportAssetsCSVQuery,
    useLazyExportAssetsPDFQuery,
} = assetApi;
