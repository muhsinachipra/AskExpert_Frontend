// frontend\src\slices\authSlice.ts

import { createSlice, createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { userApiSlice } from "./api/userApiSlice";
import { expertApiSlice } from "./api/expertApiSlice";
import { adminApiSlice } from "./api/adminApiSlice";


const getUserData = userApiSlice.endpoints.getUserData.initiate()
export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await dispatch(getUserData);
            if (data) {
                return data?.data;
            } else {
                throw new Error('Data not found');
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const getExpertData = expertApiSlice.endpoints.getExpertData.initiate()
export const fetchExpertData = createAsyncThunk(
    'auth/fetchExpertData',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await dispatch(getExpertData);
            if (data) {
                return data?.data;
            } else {
                throw new Error('Data not found');
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const getAdminData = adminApiSlice.endpoints.getAdminData.initiate()
export const fetchAdminData = createAsyncThunk(
    'auth/fetchAdminData',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await dispatch(getAdminData);
            if (data) {
                return data?.data;
            } else {
                throw new Error('Data not found');
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export type AsyncThunkConfig = {
    state?: unknown
    dispatch?: Dispatch
    extra?: unknown
    rejectValue?: unknown
    serializedErrorType?: unknown
    pendingMeta?: unknown
    fulfilledMeta?: unknown
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
    wallet?: number;
    profilePic?: string;
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
    wallet?: number;
    isVerified?: boolean;
    mobile?: string;
    createdAt?: string
}

type initialState = {
    userInfo: UserInfo | null;
    userStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    adminInfo: AdminInfo | null;
    adminStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    expertInfo: ExpertInfo | null;
    expertStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    registerInfo: UserInfo | null;
    expertRegisterInfo: ExpertInfo | null;
}

const registerInfoFromLocalStorage = localStorage.getItem("registerInfo");
const expertRegisterInfoFromLocalStorage = localStorage.getItem("expertRegisterInfo");

const initialState: initialState = {
    userInfo: null,
    userStatus: 'idle',
    adminInfo: null,
    adminStatus: 'idle',
    expertInfo: null,
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
            state.userInfo = action.payload;
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
            localStorage.removeItem('isUserLoggedIn');
        },

        // expert
        setExpertCredential: (state, action) => {
            state.expertInfo = action.payload;
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
            localStorage.removeItem('isExpertLoggedIn');
        },

        // admin
        setAdminCredential: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem('isAdminLoggedIn', 'true');
            state.adminStatus = 'succeeded';
        },
        adminLogout: (state) => {
            state.adminInfo = null;
            localStorage.removeItem("isAdminLoggedIn");
        },
    },
    extraReducers: (builder) => {
        builder
            // user
            .addCase(fetchUserData.pending, (state) => {
                state.userStatus = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.userStatus = 'succeeded';
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.userStatus = 'failed';
            })
            // expert 
            .addCase(fetchExpertData.pending, (state) => {
                state.expertStatus = 'loading';
            })
            .addCase(fetchExpertData.fulfilled, (state, action) => {
                state.expertInfo = action.payload;
                state.expertStatus = 'succeeded';
            })
            .addCase(fetchExpertData.rejected, (state) => {
                state.expertStatus = 'failed';
            })
            // admin
            .addCase(fetchAdminData.pending, (state) => {
                state.adminStatus = 'loading';
            })
            .addCase(fetchAdminData.fulfilled, (state, action) => {
                state.adminInfo = action.payload;
                state.adminStatus = 'succeeded';
            })
            .addCase(fetchAdminData.rejected, (state) => {
                state.adminStatus = 'failed';
            });
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
