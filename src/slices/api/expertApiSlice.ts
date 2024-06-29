// frontend\src\slices\api\expertApiSlice.ts

import { ISchedule } from "../../types/domain";
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
        }),

        expertUpdateProfile: builder.mutation({
            query: (data) => ({
                url: `${EXPERT_URL}/updateProfile`,
                method: "PATCH",
                body: data,
            }),
        }),

        // Schedules.......................

        getSchedules: builder.query<ISchedule[], void>({
            query: () => `${EXPERT_URL}/schedules`,
            providesTags: ['Schedule'],
        }),

        addSchedule: builder.mutation<ISchedule, Partial<ISchedule>>({
            query: (newSchedule) => ({
                url: `${EXPERT_URL}/schedules`,
                method: 'POST',
                body: newSchedule,
            }),
            invalidatesTags: ['Schedule'],
        }),
        editSchedule: builder.mutation<ISchedule, Partial<ISchedule>>({
            query: ({ _id, ...patch }) => ({
                url: `${EXPERT_URL}/schedules/${_id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ['Schedule'],
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
    useEditScheduleMutation,
} = expertApiSlice;
