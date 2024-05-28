// frontend\src\slices\authSlice.ts

import { createSlice } from "@reduxjs/toolkit";

export type AdminInfo = {
    _id?: string;
    email: string;
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

type initialState = {
    userInfo: UserInfo | null;
    adminInfo: AdminInfo | null;
    registerInfo: UserInfo | null;
    forgotEmailInfo: string | null;
}

const userInfoFromLocalStorage = localStorage.getItem('userInfo');
const adminInfoFromLocalStorage = localStorage.getItem('adminInfo');
const registerInfoFromLocalStorage = localStorage.getItem("registerInfo");
const forgotEmailInfoFromLocalStorage = localStorage.getItem("forgotEmailInfo");

const initialState: initialState = {
    userInfo: userInfoFromLocalStorage ? JSON.parse(userInfoFromLocalStorage) : null,
    adminInfo: adminInfoFromLocalStorage ? JSON.parse(adminInfoFromLocalStorage) : null,
    registerInfo: registerInfoFromLocalStorage ? JSON.parse(registerInfoFromLocalStorage) : null,
    forgotEmailInfo: forgotEmailInfoFromLocalStorage ? JSON.parse(forgotEmailInfoFromLocalStorage) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
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
        setAdminCredential: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem("adminInfo", JSON.stringify(action.payload));
        },
    }
})

export const {
    setCredential,
    setRegister,
    clearRegister,
    setForgotEmail,
    clearForgotEmail,
    userLogout,
    setAdminCredential,
} = authSlice.actions;

export default authSlice.reducer