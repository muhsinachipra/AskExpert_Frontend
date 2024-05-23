import { apiSlice } from "./apiSlice";

const USER_URL = "/api/user";

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
                url: `${USER_URL}/sendEmail`,
                method: "POST",
                body: data,
            }),
        }),

        otpVerification: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/verifyEmail`,
                method: "POST",
                body: data,
            }),
        }),

        sendOTPforgotPassword: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/sendOTPforgotPassword`,
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

    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useOtpVerificationMutation,
    useSendOtpToEmailMutation,
    useGoogleAuthMutation,
    useSendOTPforgotPasswordMutation,
    useForgotPasswordMutation,
} = userApiSlice;
