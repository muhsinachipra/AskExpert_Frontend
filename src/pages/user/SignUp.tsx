// frontend\src\pages\user\SignUp.tsx

import { Link, useNavigate } from "react-router-dom";
// import { FormValues } from "../../validation/validationTypes";
import { useFormik } from "formik";
import { userRegisterSchema } from "../../validation/yupValidation";
import { useDispatch } from "react-redux";
import { clearRegister, setRegister } from "../../slices/authSlice";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import { useSendOtpToEmailMutation } from "../../slices/api/userApiSlice";
import { toast } from "react-toastify";

export default function SignUp() {

    const [sendOtpToEmail] = useSendOtpToEmailMutation();
    const dispatch = useDispatch()
    const [isSumbit, setSubmit] = useState(false)
    const Navigate = useNavigate()

    const initialValues = {
        name: '',
        mobile: '',
        password: '',
        cpassword: '',
        email: ''
    }

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: userRegisterSchema,
        onSubmit: async (values) => {
            dispatch(setRegister({ ...values }))
            setSubmit(true)
            try {
                const { name, email } = values;
                const res = await sendOtpToEmail({ name, email }).unwrap();
                Navigate('/otp')
                setSubmit(false)
                toast.success(res.message)
            } catch (err) {
                dispatch(clearRegister());
                // toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
                toast.error('user already exist');
            }
        }
    });


    return (
        <section className="bg-neutral-200 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="/Ask.svg" alt="logo" />
                    AskExpert
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Registration Form
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                <input type="text" name="name" value={values.name} onChange={handleChange} id="name" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full Name" required={true} />
                                {errors.name && touched.name && (
                                    <div className="text-red-500">{errors.name}</div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" value={values.email} onChange={handleChange} id="email" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true} />
                                {errors.email && touched.email && (
                                    <div className="text-red-500">{errors.email}</div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your mobile</label>
                                <input type="tel" name="mobile" value={values.mobile} onChange={handleChange} id="mobile" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mobile Number" required={true} />
                                {errors.mobile && touched.mobile && (
                                    <div className="text-red-500">{errors.mobile}</div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" value={values.password} onChange={handleChange} id="password" placeholder="••••••••" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                {errors.password && touched.password && (
                                    <div className="text-red-500">{errors.password}</div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="password" name="cpassword" value={values.cpassword} onChange={handleChange} id="confirm-password" placeholder="••••••••" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                {errors.cpassword && touched.cpassword && (
                                    <div className="text-red-500">{errors.cpassword}</div>
                                )}
                            </div>
                            {/* <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-neutral-200 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={true}/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div> */}
                            <button type="submit" className="w-full text-black border border-gray-300 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:text-white  dark:border-gray-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{isSumbit ? <Spinner /> : "Sign Up"}</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
