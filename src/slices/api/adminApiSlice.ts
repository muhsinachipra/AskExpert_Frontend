// frontend\src\slices\api\adminApiSlice.ts

import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/api/admin";

export interface ExpertData {
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
    data: ExpertData[];
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
        
        getExpertData: builder.query<GetExpertDataResponse, void>({
            query: () => ({
                url: `${ADMIN_URL}/expertData`,
                method: 'GET',
            }),
            providesTags:['admin'],
        }),

        updateExpertVerification: builder.mutation({
            query: ({ expertId, isVerified }) => ({
                url: `${ADMIN_URL}/verifyExpert/${expertId}`,
                method: 'PATCH',
                body: { isVerified },
            }),
            invalidatesTags: ['admin'],
        }),

        adminLogout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: "POST",
            }),
        }),

        sendVerifiedEmail: builder.mutation({
            query: ({ expertId }) => ({
                url: `${ADMIN_URL}/sendVerifiedEmail/${expertId}`,
                method: 'POST',
            }),
        }),
    }),
})

export const {
    useAdminLoginMutation,
    useGetExpertDataQuery,
    useUpdateExpertVerificationMutation,
    useAdminLogoutMutation,
    useSendVerifiedEmailMutation,
} = adminApiSlice
