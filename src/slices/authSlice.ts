// frontend\src\slices\authSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userApiSlice } from "./api/userApiSlice";


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

export type AdminInfo = {
    _id?: string;
    email: string;
    name: string;
    password: string;
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
    // profilePicUrl?: string;
    resume?: string;
    isVerified?: boolean;
    rate?: number;
    createdAt?: string
}

type initialState = {
    userInfo: UserInfo | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    adminInfo: AdminInfo | null;
    expertInfo: ExpertInfo | null;
    registerInfo: UserInfo | null;
    expertRegisterInfo: ExpertInfo | null;
}

const adminInfoFromLocalStorage = localStorage.getItem('adminInfo');
const expertInfoFromLocalStorage = localStorage.getItem('expertInfo');
const registerInfoFromLocalStorage = localStorage.getItem("registerInfo");
const expertRegisterInfoFromLocalStorage = localStorage.getItem("expertRegisterInfo");

const initialState: initialState = {
    userInfo: null,
    status: 'idle',
    adminInfo: adminInfoFromLocalStorage ? JSON.parse(adminInfoFromLocalStorage) : null,
    expertInfo: expertInfoFromLocalStorage ? JSON.parse(expertInfoFromLocalStorage) : null,
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
            // sessionStorage.setItem("userInfo", JSON.stringify(action.payload));
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
            sessionStorage.removeItem("userInfo");
        },

        // expert
        setExpertCredential: (state, action) => {
            state.expertInfo = action.payload;
            localStorage.setItem("expertInfo", JSON.stringify(action.payload));
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
            localStorage.removeItem("expertInfo");
        },

        // admin
        setAdminCredential: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem("adminInfo", JSON.stringify(action.payload));
        },
        adminLogout: (state) => {
            state.adminInfo = null;
            localStorage.removeItem("adminInfo");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                console.log('refetched user data from server')
                // sessionStorage.setItem("userInfo", JSON.stringify(action.payload));
                state.status = 'succeeded';
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.status = 'failed';
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