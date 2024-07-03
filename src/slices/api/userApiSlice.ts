// frontend\src\slices\api\userApiSlice.ts

import { IAppointment, IUser } from "../../types/domain";
import { GetExpertDataResponse } from "./adminApiSlice";
import { apiSlice } from "./apiSlice";

const USER_URL = "/api/user";

interface GetUserDataResponse {
    success: boolean;
    data: IUser;
    message: string;
}

export interface GetExpertSlotsResponse {
    success: boolean;
    data: IAppointment[];
    message: string;
}

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
        }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/updateProfile`,
                method: "PATCH",
                body: data,
            }),
        }),

        getUserData: builder.query<GetUserDataResponse, void>({
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

        getExpertSlots: builder.query<GetExpertSlotsResponse, string>({
            query: (expertId) => ({
                url: `${USER_URL}/getExpertSlots/${expertId}`,
                method: 'GET',
            }),
            providesTags: ['Expert'],
        }),

        payment: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/payment`,
                method: 'POST',
                body: data
            })
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
} = userApiSlice;
