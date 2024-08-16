// frontend\src\slices\api\chatApiSlice.ts

import { GetConversationResponse, GetFileUrlResponse, GetMessageResponse } from '../../types/response'
import { apiSlice } from './apiSlice'

const CHAT_URL = `${import.meta.env.VITE_BASE_URL}api/chat`;

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        createConversation: builder.mutation({
            query: (data) => ({
                url: `${CHAT_URL}/conversation`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Conversation', 'Message']
        }),

        getConversation: builder.query<GetConversationResponse, string>({
            query: (userId) => ({
                url: `${CHAT_URL}/conversation`,
                params: { userId },
            }),
            providesTags: ['Conversation'],
        }),

        getMessage: builder.query<GetMessageResponse, { conversationId: string }>({
            query: ({ conversationId }) => ({
                url: `${CHAT_URL}/message`,
                params: { conversationId },
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
            }),
            invalidatesTags: ['Message'],
        }),


        // get all messages
        viewMessages: builder.mutation({
            query: (data) => ({
                url: `${CHAT_URL}/viewMessages`,
                method: "PATCH",
                body: data,
            }),
        }),

        // get all un read messages
        getUnReadMessages: builder.mutation({
            query: ({ id }) => ({
                url: `${CHAT_URL}/getUnReadMessages`,
                method: "GET",
                params: { id },
            }),
        }),

        uploadFile: builder.mutation({
            query: (formData) => ({
                url: `${CHAT_URL}/uploadFile`,
                method: 'POST',
                body: formData,
            }),
        }),

        getFileUrl: builder.query<GetFileUrlResponse, string>({
            query: (key: string) => ({
                url: `${CHAT_URL}/getFileUrl/${key}`,
            })
        })

    })
})

export const {
    useCreateConversationMutation,
    useGetConversationQuery,
    useGetMessageQuery,
    useSendMessageMutation,
    useViewMessagesMutation,
    useGetUnReadMessagesMutation,
    useUploadFileMutation,
    useGetFileUrlQuery,
} = chatApiSlice
