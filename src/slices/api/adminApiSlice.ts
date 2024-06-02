// frontend\src\slices\api\adminApiSlice.ts

import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/api/admin";

interface Expert {
    _id: string;
    name: string;
    email: string;
    password: string;
    category: string;
    experience: number;
    profilePic: string;
    resume: string;
    rate: number;
    rating: number;
    wallet: number;
    isVerified: boolean;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface GetExpertDataResponse {
    success: boolean;
    data: {
        success: boolean;
        data: Expert[];
        message: string;
        status: number;
    };
    message: string;
}


export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),
        // getExpertData: builder.mutation({
        //     query: () => ({
        //         url: `${ADMIN_URL}/login`,
        //         method: "GET",
        //         // body: data,
        //     }),
        // }),
        getExpertData: builder.query<GetExpertDataResponse[], void>({
            query: () => ({
                url: `${ADMIN_URL}/expertData`,
                method: "GET",
            }),
        }),
        updateExpertVerification: builder.mutation({
            query: ({ expertId, isVerified }) => ({
                url: `${ADMIN_URL}/verifyExpert/${expertId}`,
                method: 'PATCH',
                body: { isVerified },
            }),
        }),
    }),
})

export const {
    useAdminLoginMutation,
    useGetExpertDataQuery,
    useUpdateExpertVerificationMutation,
} = adminApiSlice