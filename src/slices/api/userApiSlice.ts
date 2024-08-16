// frontend\src\slices\api\userApiSlice.ts

import { ICategory } from "../../types/domain";
import { GetAppointmentDataResponse, GetAppointmentsCountResponse, GetExpertDataResponse, GetSingleAppointmentDataResponse, GetSingleExpertDataResponse, GetUserDataForStateResponse } from "../../types/response";
import { apiSlice } from "./apiSlice";

const USER_URL = `${import.meta.env.VITE_BASE_URL}/api/user`;

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/signup`,
                method: "POST",
                body: data,
            }),
        }),

        googleAuth: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/googleAuth`,
                method: "POST",
                body: data,
            }),
        }),

        sendOtpToEmail: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/sendOTP`,
                method: "POST",
                body: data,
            }),
        }),

        otpVerification: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/verifyOTP`,
                method: "POST",
                body: data,
            }),
        }),

        // user forgot password
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/forgotPassword`,
                method: "POST",
                body: data,
            }),
        }),

        resetPassword: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/resetPassword`,
                method: "POST",
                body: data,
            }),
        }),

        validateAccesssToken: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/validateAccessToken`,
                method: "POST",
                body: data,
            }),
        }),

        userLogout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: "POST",
            }),
            invalidatesTags: ['Schedule', 'User', 'Appointment', 'Expert'],
        }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/updateProfile`,
                method: "PATCH",
                body: data,
            }),
        }),

        getUserData: builder.query<GetUserDataForStateResponse, void>({
            query: () => ({
                url: `${USER_URL}/getUserData`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),

        getExpertsByCategory: builder.query<GetExpertDataResponse, string>({
            query: (categoryName) => ({
                url: `${USER_URL}/getExpertsByCategory/${categoryName}`,
                method: 'GET',
            }),
            providesTags: ['Expert'],
        }),

        getExpertSlots: builder.query<GetAppointmentDataResponse, { expertId: string, page: number, limit: number }>({
            query: ({ expertId, page, limit }) => ({
                url: `${USER_URL}/getExpertSlots/${expertId}/${page}/${limit}`,
                method: 'GET',
            }),
            providesTags: ['Schedule'],
        }),

        payment: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/payment`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Appointment', 'Schedule'],
        }),

        getUserAppointments: builder.query<GetAppointmentDataResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `${USER_URL}/getUserAppointments?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['Appointment'],
        }),

        getUserAppointmentsHistory: builder.query<GetAppointmentDataResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `${USER_URL}/getUserAppointmentsHistory?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['Appointment'],
        }),

        userGetExpertData: builder.query<GetSingleExpertDataResponse, string>({
            query: (expertId) => ({
                url: `${USER_URL}/getExpertData/${expertId}`,
                method: 'GET',
            }),
            providesTags: ['Expert'],
        }),

        userGetCategoryData: builder.query<{ data: ICategory[], total: number }, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `${USER_URL}/categories?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['Category'],
        }),

        cancelAppointment: builder.mutation({
            query: (appointmentId) => ({
                url: `${USER_URL}/cancelAppointment/${appointmentId}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Appointment', 'Schedule', 'User'],
        }),

        walletPayment: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/walletPayment`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Appointment', 'Schedule', 'User'],
        }),

        updateAppointmentStatus: builder.mutation({
            query: ({ appointmentId, status }) => ({
                url: `${USER_URL}/updateAppointmentStatus/${appointmentId}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Appointment', 'Schedule'],
        }),

        getAppointmentsCount: builder.query<GetAppointmentsCountResponse, void>({
            query: () => ({
                url: `${USER_URL}/getAppointmentsCount`,
            }),
            providesTags: ['Appointment'],
        }),

        getSingleAppointmentData: builder.query<GetSingleAppointmentDataResponse, string>({
            query: (appointmentId) => ({
                url: `${USER_URL}/getSingleAppointment/${appointmentId}`,
                method: 'GET',
            }),
            providesTags: ['Appointment'],
        }),

        review: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/review`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Review'],
        }),

        report: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/report`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Report'],
        }),

        getUserWalletData: builder.query<GetAppointmentDataResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `${USER_URL}/getWalletData/${page}/${limit}`,
            }),
            providesTags: ['Appointment'],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useOtpVerificationMutation,
    useSendOtpToEmailMutation,
    useGoogleAuthMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useValidateAccesssTokenMutation,
    useUserLogoutMutation,
    useUpdateProfileMutation,
    useGetUserDataQuery,
    useGetExpertsByCategoryQuery,
    useGetExpertSlotsQuery,
    usePaymentMutation,
    useGetUserAppointmentsQuery,
    useUserGetExpertDataQuery,
    useUserGetCategoryDataQuery,
    useCancelAppointmentMutation,
    useWalletPaymentMutation,
    useUpdateAppointmentStatusMutation,
    useGetAppointmentsCountQuery,
    useGetSingleAppointmentDataQuery,
    useReviewMutation,
    useReportMutation,
    useGetUserWalletDataQuery,
    useGetUserAppointmentsHistoryQuery
} = userApiSlice;
