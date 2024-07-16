// import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
// import { RootState } from '../../app/store';
// import { setCredential, setExpertCredential, setAdminCredential, userLogout, expertLogout, adminLogout } from '../authSlice';

// const baseQuery = fetchBaseQuery({
//     baseUrl: '',
//     credentials: 'include',
//     prepareHeaders: (headers, { getState }) => {
//         const state = getState() as RootState;
//         const userToken = state.auth.userToken;
//         const expertToken = state.auth.expertToken;
//         const adminToken = state.auth.adminToken;
        
//         if (userToken) {
//             headers.set('authorization', `Bearer ${userToken}`);
//         } else if (expertToken) {
//             headers.set('authorization', `Bearer ${expertToken}`);
//         } else if (adminToken) {
//             headers.set('authorization', `Bearer ${adminToken}`);
//         }
        
//         return headers;
//     },
// })

// const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions);
//     if (result?.error?.status === 403) {
//         console.log('sending refresh token');
        
//         const state = api.getState() as RootState;
//         const user = state.auth.userInfo;
//         const expert = state.auth.expertInfo;
//         const admin = state.auth.adminInfo;
//         let refreshEndpoint = '';
        
//         if (user) {
//             refreshEndpoint = 'http://localhost:3000/api/user/refresh';
//         } else if (expert) {
//             refreshEndpoint = 'http://localhost:3000/api/expert/refresh';
//         } else if (admin) {
//             refreshEndpoint = 'http://localhost:3000/api/admin/refresh';
//         }
        
//         if (refreshEndpoint) {
//             const refreshResult = await baseQuery(refreshEndpoint, api, extraOptions);
//             console.log('refreshResult : ', refreshResult);
//             if (refreshResult?.data) {
//                 if (user) {
//                     api.dispatch(setCredential({ ...refreshResult.data, user }));
//                 } else if (expert) {
//                     api.dispatch(setExpertCredential({ ...refreshResult.data, expert }));
//                 } else if (admin) {
//                     api.dispatch(setAdminCredential({ ...refreshResult.data, admin }));
//                 }
//                 result = await baseQuery(args, api, extraOptions);
//             } else {
//                 if (user) {
//                     api.dispatch(userLogout());
//                 } else if (expert) {
//                     api.dispatch(expertLogout());
//                 } else if (admin) {
//                     api.dispatch(adminLogout());
//                 }
//             }
//         }
//     }
//     return result;
// }

// export const apiSlice = createApi({
//     baseQuery: baseQueryWithReauth,
//     tagTypes: ['User', 'Category', 'Expert', 'Schedule', 'Admin', 'Appointment'],
//     endpoints: () => ({})
// })



// frontend\src\slices\api\apiSlice.ts

import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../app/store';
import { setCredential, userLogout } from '../authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: '',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.userToken;
        if (token) {
            console.log('inside prepareHeaders token: ',token)
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        console.log('sending refresh token')
        // send refresh token to get new access token
        const refreshResult = await baseQuery('http://localhost:3000/api/user/refresh', api, extraOptions);
        console.log('refreshResult : ', refreshResult)
        if (refreshResult?.data) {
            const user = (api.getState() as RootState).auth.userInfo;
            // store the new token
            api.dispatch(setCredential({ ...refreshResult.data, user }));
            // retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(userLogout());
        }
    }
    return result;
}



export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Category', 'Expert', 'Schedule', 'Admin', 'Appointment'],
    // endpoints: builder => ({})
    endpoints: () => ({})
})