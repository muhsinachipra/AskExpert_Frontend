// frontend\src\slices\authSlice.ts

import { createSlice, Dispatch } from "@reduxjs/toolkit";

export type AsyncThunkConfig = {
    /** return type for `thunkApi.getState` */
    state?: unknown
    /** type for `thunkApi.dispatch` */
    dispatch?: Dispatch
    /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
    extra?: unknown
    /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
    rejectValue?: unknown
    /** return type of the `serializeError` option callback */
    serializedErrorType?: unknown
    /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
    pendingMeta?: unknown
    /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
    fulfilledMeta?: unknown
    /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
    rejectedMeta?: unknown
}

export type AdminInfo = {
    _id?: string;
    email: string;
    name: string;
    password?: string;
}

export type UserInfo = {
    _id?: string;
    email: string;
    name: string;
    mobile?: string;
    password?: string;
    createdAt?: string
}

export type ExpertInfo = {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    category?: string;
    experience?: number;
    profilePic?: string;
    resume?: string;
    isVerified?: boolean;
    rate?: number;
    createdAt?: string
}

type InitialState = {
    userInfo: UserInfo | null;
    userToken: string | null;
    userStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    adminInfo: AdminInfo | null;
    adminToken: string | null;
    adminStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    expertInfo: ExpertInfo | null;
    expertToken: string | null;
    expertStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    registerInfo: UserInfo | null;
    expertRegisterInfo: ExpertInfo | null;
}

const registerInfoFromLocalStorage = localStorage.getItem("registerInfo");
const expertRegisterInfoFromLocalStorage = localStorage.getItem("expertRegisterInfo");

const initialState: InitialState = {
    userInfo: null,
    userToken: null,
    userStatus: 'idle',
    adminInfo: null,
    adminToken: null,
    adminStatus: 'idle',
    expertInfo: null,
    expertToken: null,
    expertStatus: 'idle',
    registerInfo: registerInfoFromLocalStorage ? JSON.parse(registerInfoFromLocalStorage) : null,
    expertRegisterInfo: expertRegisterInfoFromLocalStorage ? JSON.parse(expertRegisterInfoFromLocalStorage) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // user
        setCredential: (state, action) => {
            const { accessToken, ...userInfo } = action.payload
            console.log('action.payload from setCredential : ', action.payload)
            state.userInfo = userInfo;
            console.log('state.userInfo from setCredential : ', state.userInfo);
            state.userToken = accessToken;
            localStorage.setItem('isUserLoggedIn', 'true');
            state.userStatus = 'succeeded';
        },
        setRegister: (state, action) => {
            state.registerInfo = action.payload;
            localStorage.setItem("registerInfo", JSON.stringify(action.payload));
        },
        clearRegister: (state) => {
            state.registerInfo = null;
            localStorage.removeItem("registerInfo");
        },
        userLogout: (state) => {
            state.userInfo = null;
            state.userToken = null
            localStorage.removeItem('isUserLoggedIn');
        },

        // expert
        setExpertCredential: (state, action) => {
            const { accessToken, ...expertInfo } = action.payload
            state.expertInfo = expertInfo;
            state.expertToken = accessToken;
            localStorage.setItem('isExpertLoggedIn', 'true');
            state.expertStatus = 'succeeded';
        },
        setExpertRegister: (state, action) => {
            state.expertRegisterInfo = action.payload;
            localStorage.setItem("expertRegisterInfo", JSON.stringify(action.payload));
        },
        clearExpertRegister: (state) => {
            state.expertRegisterInfo = null;
            localStorage.removeItem("expertRegisterInfo");
        },
        expertLogout: (state) => {
            state.expertInfo = null;
            state.expertToken = null;
            localStorage.removeItem('isExpertLoggedIn');
        },

        // admin
        setAdminCredential: (state, action) => {
            const { accessToken, ...adminInfo } = action.payload
            state.adminInfo = adminInfo;
            state.adminToken = accessToken
            localStorage.setItem('isAdminLoggedIn', 'true');
            state.adminStatus = 'succeeded';
        },
        adminLogout: (state) => {
            state.adminInfo = null;
            state.adminToken = null;
            localStorage.removeItem("isAdminLoggedIn");
        },
    },
    extraReducers: (builder) => {
        builder
    },
})

export const {
    // user
    setCredential,
    setRegister,
    clearRegister,
    userLogout,

    // expert
    setExpertCredential,
    setExpertRegister,
    clearExpertRegister,
    expertLogout,

    // admin
    setAdminCredential,
    adminLogout,
} = authSlice.actions;

export default authSlice.reducer


export const selectCurrentUser = (state: { auth: InitialState }) => state.auth.userInfo;
export const selectCurrentUserToken = (state: { auth: InitialState }) => state.auth.userToken;

export const selectCurrentExpert = (state: { auth: InitialState }) => state.auth.expertInfo;
export const selectCurrentExpertToken = (state: { auth: InitialState }) => state.auth.expertToken;

export const selectCurrentAdmin = (state: { auth: InitialState }) => state.auth.adminInfo;
export const selectCurrentAdminToken = (state: { auth: InitialState }) => state.auth.adminToken;