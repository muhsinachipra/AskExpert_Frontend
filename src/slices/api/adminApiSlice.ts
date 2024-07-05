// frontend\src\slices\api\adminApiSlice.ts

import { ICategory } from "../../types/domain";
import { GetAdminDataForStateResponse, GetExpertDataResponse, GetUserDataResponse } from "../../types/response";
import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),

        adminGetExpertData: builder.query<GetExpertDataResponse, { page: number; limit: number }>({
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

        getCategoryData: builder.query<{ data: ICategory[], total: number }, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `${ADMIN_URL}/categories?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['Category'],
        }),

        adminGetUserData: builder.query<GetUserDataResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `${ADMIN_URL}/userData?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),

        toggleUserBlockedStatus: builder.mutation({
            query: ({ userId }) => ({
                url: `${ADMIN_URL}/userBlockedStatus/${userId}`,
                method: 'PATCH',
                // body: { isBlocked },
            }),
            invalidatesTags: ['User'],
        }),

        getAdminData: builder.query<GetAdminDataForStateResponse, void>({
            query: () => ({
                url: `${ADMIN_URL}/getAdminData`,
                method: 'GET',
            }),
            providesTags: ['Admin'],
        }),

    }),
})

export const {
    useAdminLoginMutation,
    useAdminGetExpertDataQuery,
    useUpdateExpertVerificationMutation,
    useAdminLogoutMutation,
    useSendVerifiedEmailMutation,
    useAddCategoryMutation,
    useEditCategoryMutation,
    useGetCategoryDataQuery,
    useAdminGetUserDataQuery,
    useToggleUserBlockedStatusMutation,
} = adminApiSlice
