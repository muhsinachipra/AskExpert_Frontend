// frontend\src\pages\user\ForgotPassword.tsx

import { useState } from "react";
import { useForgotPasswordMutation } from "../../../slices/api/userApiSlice";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { MyError } from "../../../validation/validationTypes";
import ForgotPasswordComponent from "../../../components/ForgotPassword";

export default function ForgotPassword() {
    const [forgotPassword] = useForgotPasswordMutation();
    const [isSubmit, setSubmit] = useState(false);

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Please enter a valid email")
                .required("Please enter your email"),
        }),
        onSubmit: async (values) => {
            setSubmit(true);
            try {
                const { email } = values;
                const name = email.split("@")[0]; // Extract the part before the @ symbol as the name
                const res = await forgotPassword({ name, email }).unwrap();
                setSubmit(false);
                toast.success(res.message);
            } catch (err) {
                toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
                setSubmit(false);
            }
        },
    });

    return (
        <ForgotPasswordComponent
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={errors}
            touched={touched}
            isSubmit={isSubmit}
            registerLink={'/register'}
        />
    );
}
