import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/api/apiSlice";
import authReducer from '../slices/authSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    [apiSlice.reducerPath]:apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
