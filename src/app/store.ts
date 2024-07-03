// frontend\src\app\store.ts

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from '../slices/authSlice'
import redirectMiddleware from '../middleware/redirectMiddleware';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(apiSlice.middleware, redirectMiddleware),
  devTools: true
});

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch












// // frontend\src\app\store.ts

// import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "../slices/api/apiSlice";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import authReducer from '../slices/authSlice'
// import redirectMiddleware from '../middleware/redirectMiddleware';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware, redirectMiddleware),
//   devTools: true
// });

// setupListeners(store.dispatch)

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
