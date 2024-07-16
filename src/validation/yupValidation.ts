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
    mobile: Yup.string()
        .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")
        .required("Please enter mobile"),
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
    mobile: Yup.string()
        .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")
        .required("Please enter mobile"),
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

// export const addScheduleSchema = Yup.object({
//     startTime: Yup.string().required('Time is required'),
//     date: Yup.string().required('Date is required'),
// });

export const addScheduleSchema = Yup.object({
    startTime: Yup.string().required('Time is required'),
    // endTime: Yup.string().required('End time is required'),
    endTime: Yup.string()
        .required('End time is required')
        // .test('is-greater', 'End time must be at least 30 minutes after start time', function (value) {
        //     const { startTime } = this.parent;
        //     if (!startTime || !value) return true; // skip validation if start time or end time is not set
        //     const start = new Date(`1970-01-01T${startTime}Z`).getTime();
        //     const end = new Date(`1970-01-01T${value}Z`).getTime();
        //     return end - start >= 30 * 60 * 1000; // 30 minutes in milliseconds // why am i getting this error in here The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.ts(2363), and this one : The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.ts(2362)
        // }),
        .test('is-greater', 'End time must be greater than start time', function (value) {
            const { startTime } = this.parent;
            if (!startTime || !value) return true; // skip validation if start time or end time is not set
            const start = new Date(`1970-01-01T${startTime}Z`).getTime();
            const end = new Date(`1970-01-01T${value}Z`).getTime();
            return end > start; // end time must be strictly greater than start time
        })
        .test('is-at-least-30-minutes', 'End time must be at least 30 minutes after start time', function (value) {
            const { startTime } = this.parent;
            if (!startTime || !value) return true; // skip validation if start time or end time is not set
            const start = new Date(`1970-01-01T${startTime}Z`).getTime();
            const end = new Date(`1970-01-01T${value}Z`).getTime();
            return end - start >= 30 * 60 * 1000; // 30 minutes in milliseconds
        }),
    price: Yup.number()
        .min(500, "Price per session must be at least 500")
        .max(2000, "Price per session cannot exceed 2000")
        .required("Please enter price per session"),
    date: Yup.string().required('Date is required'),
    recurrence: Yup.string().required('Recurrence is required'),
});
