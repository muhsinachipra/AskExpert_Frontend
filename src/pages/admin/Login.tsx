// frontend\src\pages\user\Login.tsx
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../../slices/api/adminApiSlice";
import { useState } from "react";
import { MyError } from "../../validation/validationTypes";
import { userLoginSchema } from "../../validation/yupValidation";
import { setAdminCredential } from "../../slices/authSlice";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

export default function Login() {

    const dispatch = useDispatch();
    const [login] = useAdminLoginMutation();
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || "/admin/dashboard";
    const [isLoading, setIsLoading] = useState(false);


    const initialValues = {
        email: "",
        password: ""
    };

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: userLoginSchema,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const res = await login(values).unwrap();
                dispatch(setAdminCredential({ ...res.data }));
                // navigate('/admin/dashboard')
                navigate(from, { replace: true });
                toast.success(res.message);
            } catch (err) {
                toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <>
            <section className="bg-neutral-200 dark:bg-gray-900 min-h-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="/Ask.svg" alt="logo" />
                        AskExpert
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Admin Login
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" value={values.email} onChange={handleChange} name="email" id="email" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true} />
                                    {errors.email && touched.email && (
                                        <div className="text-red-500">{errors.email}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" value={values.password} onChange={handleChange} name="password" id="password" placeholder="••••••••" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                    {errors.password && touched.password && (
                                        <div className="text-red-500">{errors.password}</div>
                                    )}
                                </div>
                                <hr className="border-gray-300 dark:border-gray-600" />
                                <button type="submit" className="w-full text-black border border-gray-300 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:text-white  dark:border-gray-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{isLoading ? <Spinner /> : 'Login'}</button>

                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}
