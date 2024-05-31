// frontend\src\slices\authSlice.ts

import { createSlice } from "@reduxjs/toolkit";

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
    profilePicUrl?: string;
    resumeUrl?: string;
    rate?: number;
    createdAt?: string
}

type initialState = {
    userInfo: UserInfo | null;
    adminInfo: AdminInfo | null;
    expertInfo: ExpertInfo | null;
    registerInfo: UserInfo | null;
    expertRegisterInfo: ExpertInfo | null;
    forgotEmailInfo: string | null;
}

const userInfoFromLocalStorage = localStorage.getItem('userInfo');
const adminInfoFromLocalStorage = localStorage.getItem('adminInfo');
const expertInfoFromLocalStorage = localStorage.getItem('expertInfo');
const registerInfoFromLocalStorage = localStorage.getItem("registerInfo");
const expertRegisterInfoFromLocalStorage = localStorage.getItem("expertRegisterInfo");
const forgotEmailInfoFromLocalStorage = localStorage.getItem("forgotEmailInfo");

const initialState: initialState = {
    userInfo: userInfoFromLocalStorage ? JSON.parse(userInfoFromLocalStorage) : null,
    adminInfo: adminInfoFromLocalStorage ? JSON.parse(adminInfoFromLocalStorage) : null,
    expertInfo: expertInfoFromLocalStorage ? JSON.parse(expertInfoFromLocalStorage) : null,
    registerInfo: registerInfoFromLocalStorage ? JSON.parse(registerInfoFromLocalStorage) : null,
    expertRegisterInfo: expertRegisterInfoFromLocalStorage ? JSON.parse(expertRegisterInfoFromLocalStorage) : null,
    forgotEmailInfo: forgotEmailInfoFromLocalStorage ? JSON.parse(forgotEmailInfoFromLocalStorage) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // user
        setCredential: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        setRegister: (state, action) => {
            state.registerInfo = action.payload;
            localStorage.setItem("registerInfo", JSON.stringify(action.payload));
        },
        clearRegister: (state) => {
            state.registerInfo = null;
            localStorage.removeItem("registerInfo");
        },
        setForgotEmail: (state, action) => {
            state.forgotEmailInfo = action.payload;
            localStorage.setItem("forgotEmailInfo", JSON.stringify(action.payload));
        },
        clearForgotEmail: (state) => {
            state.forgotEmailInfo = null;
            localStorage.removeItem("forgotEmailInfo");
        },
        userLogout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
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
    }
})

export const {
    // user
    setCredential,
    setRegister,
    clearRegister,
    setForgotEmail,
    clearForgotEmail,
    userLogout,

    // expert
    setExpertCredential,
    setExpertRegister,
    clearExpertRegister,
    expertLogout,

    // admin
    setAdminCredential,
} = authSlice.actions;

export default authSlice.reducer