// frontend\src\slices\api\expertApiSlice.ts

import { IAppointment, ICategory } from "../../types/domain";
import { GetAppointmentDataResponse, GetExpertDataForStateResponse, GetReviewDataResponse, GetSingleUserDataResponse } from "../../types/response";
import { apiSlice } from "./apiSlice";

const EXPERT_URL = `${import.meta.env.VITE_BASE_URL}api/expert`;


export const expertApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        expertRegister: builder.mutation({
            query: (data) => ({
                url: `${EXPERT_URL}/register`,
                method: "POST",
                body: data,
            }),
        }),

        expertLogin: builder.mutation({
            query: (data) => ({
                url: `${EXPERT_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),

        expertForgotPassword: builder.mutation({
            query: (data) => ({
                url: `${EXPERT_URL}/forgotPassword`,
                method: "POST",
                body: data,
            }),
        }),

        expertResetPassword: builder.mutation({
            query: (data) => ({
                url: `${EXPERT_URL}/resetPassword`,
                method: "POST",
                body: data,
            }),
        }),

        expertValidateAccesssToken: builder.mutation({
            query: (data) => ({
                url: `${EXPERT_URL}/validateAccessToken`,
                method: "POST",
                body: data,
            }),
        }),

        expertLogout: builder.mutation({
            query: () => ({
                url: `${EXPERT_URL}/logout`,
                method: "POST",
            }),
            invalidatesTags: ['Schedule', 'Expert', 'Appointment'],
        }),

        expertUpdateProfile: builder.mutation({
            query: (data) => ({
                url: `${EXPERT_URL}/updateProfile`,
                method: "PATCH",
                body: data,
            }),
        }),

        getSchedules: builder.query<GetAppointmentDataResponse, { page: number, limit: number }>({
            query: ({ page, limit }) => ({
                url: `${EXPERT_URL}/schedules/${page}/${limit}`,
            }),
            providesTags: ['Schedule'],
        }),

        addSchedule: builder.mutation<IAppointment, Partial<IAppointment>>({
            query: (newSchedule) => ({
                url: `${EXPERT_URL}/schedules`,
                method: 'POST',
                body: newSchedule,
            }),
            invalidatesTags: ['Schedule'],
        }),

        cancelSchedule: builder.mutation<void, string>({
            query: (_id) => ({
                url: `${EXPERT_URL}/schedules/${_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Schedule'],
        }),

        getExpertData: builder.query<GetExpertDataForStateResponse, void>({
            query: () => ({
                url: `${EXPERT_URL}/getExpertData`,
                method: 'GET',
            }),
            providesTags: ['Expert'],
        }),

        getAppointmentsData: builder.query<GetAppointmentDataResponse, { page: number, limit: number }>({
            query: ({ page, limit }) => ({
                url: `${EXPERT_URL}/getAppointmentsData/${page}/${limit}`,
            }),
            providesTags: ['Appointment'],
        }),

        expertGetCategoryData: builder.query<{ data: ICategory[], total: number }, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `${EXPERT_URL}/categories?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['Category'],
        }),

        getWalletData: builder.query<GetAppointmentDataResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `${EXPERT_URL}/getWalletData/${page}/${limit}`,
            }),
            providesTags: ['Appointment'],
        }),

        expertGetUserData: builder.query<GetSingleUserDataResponse, string>({
            query: (userId) => ({
                url: `${EXPERT_URL}/getUserData/${userId}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),

        expertUpdateAppointmentStatus: builder.mutation({
            query: ({ appointmentId, status }) => ({
                url: `${EXPERT_URL}/updateAppointmentStatus/${appointmentId}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Appointment', 'Schedule','Review'],
        }),

        expertGetReviews: builder.query<GetReviewDataResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `${EXPERT_URL}/review?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['Review'],
        }),

    }),
});

export const {
    useExpertLoginMutation,
    useExpertRegisterMutation,
    useExpertForgotPasswordMutation,
    useExpertResetPasswordMutation,
    useExpertValidateAccesssTokenMutation,
    useExpertLogoutMutation,
    useExpertUpdateProfileMutation,
    useGetSchedulesQuery,
    useAddScheduleMutation,
    useCancelScheduleMutation,
    useGetAppointmentsDataQuery,
    useExpertGetCategoryDataQuery,
    useGetWalletDataQuery,
    useExpertGetUserDataQuery,
    useExpertUpdateAppointmentStatusMutation,
    useExpertGetReviewsQuery,
} = expertApiSlice;
