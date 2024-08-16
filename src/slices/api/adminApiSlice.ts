// frontend\src\slices\api\adminApiSlice.ts

import { ICategory } from "../../types/domain";
import { GetAdminDataForStateResponse, GetAppointmentDataResponse, GetExpertDataResponse, GetUserDataResponse, GetReportDataResponse, GetDashboardDataResponse, GetExpertsByCategoryDataResponse, GetUserCountDataResponse } from "../../types/response";
import { apiSlice } from "./apiSlice";

const ADMIN_URL = `${import.meta.env.VITE_BASE_URL}api/admin`;

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

        toggleExpertBlockedStatus: builder.mutation({
            query: ({ expertId }) => ({
                url: `${ADMIN_URL}/expertBlockedStatus/${expertId}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Expert'],
        }),

        adminGetAppointmentData: builder.query<GetAppointmentDataResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `${ADMIN_URL}/appointmentData?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['Appointment'],
        }),

        getReportsByExpertId: builder.query<GetReportDataResponse, { expertId: string, page: number; limit: number }>({
            query: ({ expertId, page, limit }) => ({
                url: `${ADMIN_URL}/report/${expertId}?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['Report'],
        }),

        adminGetExpertDataSortByReport: builder.query<GetExpertDataResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `${ADMIN_URL}/expertDataReport?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['Expert'],
        }),

        dashboardData: builder.query<GetDashboardDataResponse, void>({
            query: () => ({
                url: `${ADMIN_URL}/dashboard`,
            }),
        }),

        expertsByCategoryData: builder.query<GetExpertsByCategoryDataResponse, void>({
            query: () => ({
                url: `${ADMIN_URL}/expertsByCategory`,
            }),
        }),

        userCountFilter: builder.query<GetUserCountDataResponse, void>({
            query: () => ({
                url: `${ADMIN_URL}/userCount`,
            }),
        }),

    }),
})

export const {
    useAdminLoginMutation,
    useAdminGetExpertDataQuery,
    useAdminGetExpertDataSortByReportQuery,
    useUpdateExpertVerificationMutation,
    useAdminLogoutMutation,
    useSendVerifiedEmailMutation,
    useAddCategoryMutation,
    useEditCategoryMutation,
    useGetCategoryDataQuery,
    useAdminGetUserDataQuery,
    useToggleUserBlockedStatusMutation,
    useToggleExpertBlockedStatusMutation,
    useAdminGetAppointmentDataQuery,
    useGetReportsByExpertIdQuery,
    useGetAdminDataQuery,
    useDashboardDataQuery,
    useExpertsByCategoryDataQuery,
    useUserCountFilterQuery,
} = adminApiSlice
