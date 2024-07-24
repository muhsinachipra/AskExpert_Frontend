// frontend\src\slices\api\chatApiSlice.ts

import { IConversation, IMessage } from '../../types/domain';
import { apiSlice } from './apiSlice'

const CHAT_URL = "/api/chat"

export interface GetConversationResponse {
    newConversation: IConversation[];
}

export interface GetMessageResponse {
    message: IMessage[];
}

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        createConversation: builder.mutation({
            query: (data) => ({
                url: `${CHAT_URL}/conversation`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ['Conversation', 'Message']
        }),

        getConversation: builder.query<GetConversationResponse, string>({
            query: (userId) => ({
                url: `${CHAT_URL}/conversation`,
                params: { userId },
                credentials: "include",
            }),
            providesTags: ['Conversation'],
        }),

        getMessage: builder.query<GetMessageResponse, { conversationId: string }>({
            query: ({ conversationId }) => ({
                url: `${CHAT_URL}/message`,
                params: { conversationId },
                credentials: "include",
            }),
            providesTags: ['Message'],
            keepUnusedDataFor: 0,
        }),

        // Create message
        sendMessage: builder.mutation({
            query: (data) => ({
                url: `${CHAT_URL}/message`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ['Message'],
        }),


        // get all messages
        viewMessages: builder.mutation({
            query: (data) => ({
                url: `${CHAT_URL}/viewMessages`,
                method: "PATCH",
                body: data,
                credentials: "include",
            }),
        }),

        // get all un read messages
        getUnReadMessages: builder.mutation({
            query: ({ id }) => ({
                url: `${CHAT_URL}/getUnReadMessages`,
                method: "GET",
                params: { id },
                credentials: "include",
            }),
        }),

    })
})

export const {
    useCreateConversationMutation,
    useGetConversationQuery,
    useGetMessageQuery,
    useSendMessageMutation,
    useViewMessagesMutation,
    useGetUnReadMessagesMutation,
} = chatApiSlice