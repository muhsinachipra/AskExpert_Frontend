// frontend\src\slices\api\adminApiSlice.ts

import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/api/admin";

export interface ExpertData {
    _id: string;
    name: string;
    email: string;
    password: string;
    category: string;
    experience: number;
    profilePic: string;
    resume: string;
    rate: number;
    rating: number;
    wallet: number;
    isVerified: boolean;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CategoryData {
    _id: string;
    categoryName: string;
    categoryDescription: string;
}

interface GetExpertDataResponse {
    success: boolean;
    data: ExpertData[];
    total?: number;
    message: string;
}

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),

        getExpertData: builder.query<GetExpertDataResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `${ADMIN_URL}/expertData?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['Expert'],
        }),

        updateExpertVerification: builder.mutation({
            query: ({ expertId, isVerified }) => ({
                url: `${ADMIN_URL}/verifyExpert/${expertId}`,
                method: 'PATCH',
                body: { isVerified },
            }),
            invalidatesTags: ['Expert'],
        }),

        adminLogout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: "POST",
            }),
        }),

        sendVerifiedEmail: builder.mutation({
            query: ({ expertId }) => ({
                url: `${ADMIN_URL}/sendVerifiedEmail/${expertId}`,
                method: 'POST',
            }),
        }),

        addCategory: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/addCategory`,
                method: "POST",
                body: data,
            }),
            // transformResponse: (response) => response.data, // 'response' is of type 'unknown'.ts(18046)
            // transformErrorResponse: (response) => response.error, // Property 'error' does not exist on type 'FetchBaseQueryError'. Property 'error' does not exist on type '{ status: number; data: unknown; }'.ts(2339)
            invalidatesTags: ['Category'],
        }),

        editCategory: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/editCategory`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['Category'],
        }),

        getCategoryData: builder.query<{ data: CategoryData[], total: number }, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `${ADMIN_URL}/categories?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['Category'],
        }),

    }),
})

export const {
    useAdminLoginMutation,
    useGetExpertDataQuery,
    useUpdateExpertVerificationMutation,
    useAdminLogoutMutation,
    useSendVerifiedEmailMutation,
    useAddCategoryMutation,
    useEditCategoryMutation,
    useGetCategoryDataQuery,
} = adminApiSlice
