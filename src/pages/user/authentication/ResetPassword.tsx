// frontend\src\pages\user\ResetPassword.tsx

import { useEffect, useState } from "react";
import { useResetPasswordMutation, useValidateAccesssTokenMutation } from "../../../slices/api/userApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ResetPasswordComponent from "../../../components/ResetPassword";

export default function ResetPassword() {
    const [userId, setUserId] = useState<string>("");
    const [resetPassword] = useResetPasswordMutation();
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [validateToken] = useValidateAccesssTokenMutation();

    useEffect(() => {
        const fetchTokenValidation = async () => {
            if (params.token) {
                try {
                    const response = await validateToken({ token: params.token }).unwrap();
                    if (response.success) {
                        setUserId(response.user);
                    } else {
                        toast.error(response.message);
                        navigate('/login');
                    }
                } catch (error) {
                    toast.error('Token validation failed');
                    navigate('/login');
                }
            }
        };

        fetchTokenValidation();
    }, [dispatch, navigate, params.token, validateToken]);

    async function handleResetPassword(userId: string, newPassword: string) {
        try {
            const response = await resetPassword({ id: userId, password: newPassword }).unwrap();
            if (response.success) {
                toast.success('Password reset successful!');
                navigate('/login');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Failed to reset password');
        }
    }

    return (
        <ResetPasswordComponent
            userId={userId}
            handleResetPassword={handleResetPassword}
        />
    );
}




// // frontend\src\pages\user\ResetPassword.tsx
// // import Header from "../../components/Header";

// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { useEffect, useState } from "react";
// import { useResetPasswordMutation, useValidateAccesssTokenMutation } from "../../slices/api/userApiSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { resetPasswordSchema } from '../../validation/yupValidation';


// export default function ResetPassword() {

//     const [userId, setUserId] = useState<string>("")
//     const [resetPassword] = useResetPasswordMutation();
//     const dispatch = useDispatch();
//     const params = useParams();
//     const navigate = useNavigate();
//     const [validateToken] = useValidateAccesssTokenMutation()

//     useEffect(() => {
//         const fetchTokenValidation = async () => {
//             console.log(params.token)
//             if (params.token) {
//                 try {
//                     const response = await validateToken({ token: params.token }).unwrap();
//                     console.log(response)
//                     if (response.success) {
//                         console.log(response.success)
//                         setUserId(response.user);
//                     } else {
//                         toast.error(response.message);
//                         navigate('/login'); // Redirect to the forgot password page
//                     }
//                 } catch (error) {
//                     toast.error('Token validation failed');
//                     navigate('/login'); // Redirect to the forgot password page
//                 }
//             }
//         };

//         fetchTokenValidation();
//     }, [dispatch, navigate, params.token, validateToken]);

//     async function handleResetPassword(userId: string, newPassword: string) {
//         try {
//             const response = await resetPassword({ id: userId, password: newPassword }).unwrap();
//             if (response.success) {
//                 toast.success('Password reset successful!');
//                 navigate('/login');
//             } else {
//                 toast.error(response.message);
//             }
//         } catch (error) {
//             toast.error('Failed to reset password');
//         }
//     }

//     return (
//         <>
//             {/* <Header /> */}
//             <section className="bg-neutral-200 dark:bg-gray-900">

//                 {userId ? (
//                     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                         <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//                             <img className="w-8 h-8 mr-2" src="/Ask.svg" alt="logo" />
//                             AskExpert
//                         </a>
//                         <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                                 <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                                     Enter New Password
//                                 </h1>

//                                 <Formik
//                                     initialValues={{ newPassword: '', confirmPassword: '' }}
//                                     validationSchema={resetPasswordSchema}
//                                     onSubmit={(values, { setSubmitting }) => {
//                                         handleResetPassword(userId, values.newPassword);
//                                         setSubmitting(false);
//                                     }}
//                                 >
//                                     {({ isSubmitting }) => (
//                                         <Form className="space-y-4 md:space-y-6" action="#">
//                                             <div>
//                                                 <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
//                                                 <Field type="password" name="newPassword" id="newPassword" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter New Password" required={true} />
//                                                 {/* <Field type="password" name="newPassword" className="w-full h-14 rounded-lg px-5 outline-none" /> */}
//                                                 <ErrorMessage name="newPassword" component="div" className="error text-red-600 text-sm" />
//                                             </div>
//                                             <div>
//                                                 <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
//                                                 <Field type="password" name="confirmPassword" id="confirmPassword" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm New Password" required={true} />
//                                                 {/* <Field type="password" name="confirmPassword" className="w-full h-14 rounded-lg px-5 outline-none" /> */}
//                                                 <ErrorMessage name="confirmPassword" component="div" className="error text-red-600 text-sm" />
//                                             </div>
//                                             <hr className="border-gray-300 dark:border-gray-600" />
//                                             <button type="submit" disabled={isSubmitting} className="w-full text-black border border-gray-300 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:text-white  dark:border-gray-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{isSubmitting ? 'Resetting...' : 'Reset'}</button>

//                                             {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                                                 Don't have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</a>
//                                             </p> */}
//                                         </Form>
//                                     )}
//                                 </Formik>

//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     <div>
//                         {/* <img src="/src/assets/images/404.png" alt="" height={"500px"} width={"500px"} /> */}
//                         <p className='text-2xl font-semibold text-center bg-black text-black'>Sorry! Link has expired</p>
//                     </div>
//                 )}

//             </section>
//         </>
//     );
// }
