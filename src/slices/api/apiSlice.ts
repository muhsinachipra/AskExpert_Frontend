// frontend\src\slices\api\apiSlice.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: '', credentials: 'include' })

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Category', 'Expert', 'Schedule', 'Admin', 'Appointment', 'Conversation', 'Message', 'Review', 'Report'],
    endpoints: () => ({})
})