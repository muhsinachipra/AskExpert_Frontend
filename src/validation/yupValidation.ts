// frontend\src\validation\yupValidation.ts

import * as Yup from 'yup';

export const userRegisterSchema = Yup.object({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name must be at most 30 characters")
        .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
        .required("Please enter name"),
    mobile: Yup.string()
        .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")
        .required("Please enter mobile"),
    email: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter email"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/^[^\s]+$/, "Password cannot contain spaces")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
        .required("Please enter password"),
    cpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please enter confirm password"),
});

export const userUpdateProfileSchema = Yup.object({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name must be at most 30 characters")
        .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
        .required("Please enter name"),
    mobile: Yup.string()
        .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")
        .required("Please enter mobile"),
});

export const expertRegisterSchema = Yup.object({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name must be at most 30 characters")
        .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
        .required("Please enter name"),
    email: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter email"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/^[^\s]+$/, "Password cannot contain spaces")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
        .required("Please enter password"),
    cpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please enter confirm password"),
    category: Yup.string()
        .required("Please select a category"),
    rate: Yup.number()
        .min(500, "Rate per session must be at least 500")
        .max(2000, "Rate per session cannot exceed 2000")
        .required("Please enter rate per session"),
    experience: Yup.number()
        .min(0, "Experience must be a positive number")
        .required("Please enter years of experience"),
});

export const expertUpdateProfileSchema = Yup.object({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name must be at most 30 characters")
        .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
        .required("Please enter name"),
    rate: Yup.number()
        .min(500, "Rate per session must be at least 500")
        .max(2000, "Rate per session cannot exceed 2000")
        .required("Please enter rate per session"),
});

export const userLoginSchema = Yup.object({
    email: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter email"),
    password: Yup.string().required("Please enter password"),
});

export const resetPasswordSchema = Yup.object({
    newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/^[^\s]+$/, "Password cannot contain spaces")
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
        )
        .required("Please enter a new password"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords do not match")
        .required("Please confirm your new password")
});

export const addCategorySchema = Yup.object({
    categoryName: Yup.string()
        .min(3, "Category name must be at least 3 characters")
        .max(30, "Category name must be at most 30 characters")
        .required("Please enter category name"),
    categoryDescription: Yup.string()
        .min(10, "Category description must be at least 10 characters")
        .max(100, "Category description must be at most 100 characters")
        .required("Please enter category description"),
});
