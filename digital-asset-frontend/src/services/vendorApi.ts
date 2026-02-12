import { api } from "./api";

export interface Vendor {
    _id: string;
    name: string;
    contactEmail: string;
    phone?: string;
    website?: string;
}

interface VendorsResponse {
    data: Vendor[];
}

export interface CreateVendorRequest {
    name: string;
    contactEmail: string;
    phone?: string;
    website?: string;
}

export const vendorApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getVendors: builder.query<VendorsResponse, void>({
            query: () => "/vendors",
            providesTags: ["Vendor"],
        }),
        createVendor: builder.mutation<void, CreateVendorRequest>({
            query: (body) => ({
                url: "/vendors",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Vendor"],
        }),
        deleteVendor: builder.mutation<void, string>({
            query: (id) => ({
                url: `/vendors/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Vendor"],
        }),
    }),
});

export const {
    useGetVendorsQuery,
    useCreateVendorMutation,
    useDeleteVendorMutation,
} = vendorApi;
