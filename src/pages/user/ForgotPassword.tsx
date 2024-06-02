// frontend\src\pages\user\ForgotPassword.tsx

import { useState } from "react";
import { useForgotPasswordMutation } from "../../slices/api/userApiSlice";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { MyError } from "../../validation/validationTypes";
import ForgotPasswordComponent from "../../components/ForgotPassword";

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



// // frontend\src\pages\user\ForgotPassword.tsx
// // import Header from "../../components/Header";

// import { useState } from "react";
// import { useForgotPasswordMutation } from "../../slices/api/userApiSlice";
// import { useFormik } from "formik";
// import * as Yup from 'yup';
// import { toast } from "react-toastify";
// import { MyError } from "../../validation/validationTypes";
// import Spinner from "../../components/Spinner";
// import { Link } from "react-router-dom";

// export default function ForgotPassword() {

//     const [forgotPassword] = useForgotPasswordMutation();
//     const [isSumbit, setSubmit] = useState(false)

//     const { values, handleChange, handleSubmit, errors, touched } = useFormik({
//         initialValues: {
//             email: "",
//         },
//         validationSchema: Yup.object({
//             email: Yup.string()
//                 .email("Please enter a valid email")
//                 .required("Please enter your email"),
//         }),
//         onSubmit: async (values) => {
//             setSubmit(true)
//             try {
//                 const { email } = values;
//                 const name = email.split("@")[0]; // Extract the part before the @ symbol as the name
//                 const res = await forgotPassword({ name, email }).unwrap();
//                 setSubmit(false)
//                 toast.success(res.message)
//             } catch (err) {
//                 toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
//             }
//         },
//     });

//     return (
//         <>
//             {/* <Header /> */}
//             <section className="bg-neutral-200 dark:bg-gray-900">
//                 <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                     <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//                         <img className="w-8 h-8 mr-2" src="/Ask.svg" alt="logo" />
//                         AskExpert
//                     </a>
//                     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                                 Enter Your Email
//                             </h1>
//                             <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//                                 <div>
//                                     <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
//                                     <input type="email" value={values.email} onChange={handleChange} name="email" id="email" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Email" required={true} />
//                                     {errors.email && touched.email && (
//                                         <div className="text-red-500">{errors.email}</div>
//                                     )}
//                                 </div>
//                                 <hr className="border-gray-300 dark:border-gray-600" />
//                                 <button type="submit" className="w-full text-black border border-gray-300 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:text-white  dark:border-gray-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> {isSumbit ? <Spinner /> : "Reset Password"} </button>

//                                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                                     Don't have an account? <Link to={'/register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</Link>
//                                 </p>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// }
