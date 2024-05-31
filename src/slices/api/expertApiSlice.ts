// frontend\src\slices\api\expertApiSlice.ts

import { apiSlice } from "./apiSlice";

const EXPERT_URL = "/api/expert";
// const USER_URL = "/api/user";

export const expertApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // login: builder.mutation({
        //     query: (data) => ({
        //         url: `${EXPERT_URL}/login`,
        //         method: "POST",
        //         body: data,
        //     }),
        // }),

        expertRegister: builder.mutation({
            query: (data) => ({
                url: `${EXPERT_URL}/register`,
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

        // expertLogout: builder.mutation({
        //     query: () => ({
        //         url: `${EXPERT_URL}/logout`,
        //         method: "POST",
        //     }),
        // }),

    }),
});

export const {
    // useLoginMutation,
    useExpertRegisterMutation,
    // useForgotPasswordMutation,
    // useResetPasswordMutation,
    // useValidateAccesssTokenMutation,
    // useExpertLogoutMutation,
} = expertApiSlice;
