// frontend\src\slices\api\expertApiSlice.ts

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

        // // expert forgot password
        // forgotPassword: builder.mutation({
        //     query: (data) => ({
        //         url: `${EXPERT_URL}/forgotPassword`,
        //         method: "POST",
        //         body: data,
        //     }),
        // }),

        // resetPassword: builder.mutation({
        //     query: (data) => ({
        //         url: `${EXPERT_URL}/resetPassword`,
        //         method: "POST",
        //         body: data,
        //     }),
        // }),

        // validateAccesssToken: builder.mutation({
        //     query: (data) => ({
        //         url: `${EXPERT_URL}/validateAccessToken`,
        //         method: "POST",
        //         body: data,
        //     }),
        // }),

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
    }),
});

export const {
    useExpertLoginMutation,
    useExpertRegisterMutation,
    // useForgotPasswordMutation,
    // useResetPasswordMutation,
    // useValidateAccesssTokenMutation,
    useExpertLogoutMutation,
    useExpertUpdateProfileMutation,
} = expertApiSlice;
