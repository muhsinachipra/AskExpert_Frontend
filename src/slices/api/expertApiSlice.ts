// frontend\src\slices\api\expertApiSlice.ts

import { IAppointment, ICategory } from "../../types/domain";
import { GetAppointmentDataResponse, GetExpertDataForStateResponse } from "../../types/response";
import { apiSlice } from "./apiSlice";

const EXPERT_URL = "/api/expert";

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

        // Schedules.......................

        getSchedules: builder.query<GetAppointmentDataResponse, void>({
            query: () => `${EXPERT_URL}/schedules`,
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

        getAppointmentsData: builder.query<GetAppointmentDataResponse, void>({
            query: () => ({
                url: `${EXPERT_URL}/getAppointmentsData`,
                method: 'GET',
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

        getWalletData: builder.query<GetAppointmentDataResponse, void>({
            query: () => ({
                url: `${EXPERT_URL}/getWalletData`,
                method: 'GET',
            }),
            providesTags: ['Appointment'],
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
} = expertApiSlice;
