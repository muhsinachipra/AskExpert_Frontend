// frontend\src\slices\api\userApiSlice.ts

import { UserInfo } from "../authSlice";
import { apiSlice } from "./apiSlice";

const USER_URL = "/api/user";

// export interface UserData {
//     _id: string;
//     name: string;
//     email: string;
//     password: string;
//     mobile: string;
//     isBlocked: boolean;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
// }

interface GetUserDataResponse {
    success: boolean;
    data: UserInfo;
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
} = userApiSlice;
