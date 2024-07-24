// frontend\src\pages\expert\Register.tsx

import { useFormik } from "formik";
import { useSendOtpToEmailMutation } from "../../../slices/api/userApiSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { expertRegisterSchema } from "../../../validation/yupValidation";
import { clearExpertRegister, setExpertRegister } from "../../../slices/authSlice";
import Spinner from "../../../components/Spinner";
import { MyError } from "../../../validation/validationTypes";
import { storage } from "../../../app/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"
import { Link } from "react-router-dom";
import { useExpertGetCategoryDataQuery } from "../../../slices/api/expertApiSlice";

export default function Register() {

    const [sendOtpToEmail] = useSendOtpToEmailMutation();
    const dispatch = useDispatch()
    const [isSumbit, setSubmit] = useState(false)
    const navigate = useNavigate()
    const { data: categoryData } = useExpertGetCategoryDataQuery({ page: 1, limit: 100 });
    const categories = categoryData?.data || [];


    const [profilePicture, setProfilePic] = useState<File | null>(null);
    const [resumee, setResume] = useState<File | null>(null);
    const [fileErrors, setFileErrors] = useState({ profilePicture: '', resumee: '' });

    const initialValues = {
        name: '',
        password: '',
        cpassword: '',
        email: '',
        category: '',
        mobile: '',
        experience: ''
    }

    const validateFiles = () => {
        let valid = true;
        const errors = { profilePicture: '', resumee: '' };

        if (profilePicture) {
            if (!['image/jpeg', 'image/png'].includes(profilePicture.type)) {
                errors.profilePicture = 'Unsupported file format for profile picture';
                valid = false;
            }
            if (profilePicture.size > 2000000) { // 2MB
                errors.profilePicture = 'Profile picture file size is too large';
                valid = false;
            }
        }

        if (resumee) {
            if (resumee.type !== 'application/pdf') {
                errors.resumee = 'Unsupported file format for resume';
                valid = false;
            }
            if (resumee.size > 5000000) { // 5MB
                errors.resumee = 'Resume file size is too large';
                valid = false;
            }
        }

        setFileErrors(errors);
        return valid;
    };



    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: expertRegisterSchema,
        onSubmit: async (values) => {
            if (!validateFiles()) {
                return;
            }
            setSubmit(true);

            try {
                // Upload profile picture and resume to Firebase Storage
                const profilePicRef = ref(storage, `expert/profilePics/${uuidv4()}-${profilePicture?.name}`);
                const resumeRef = ref(storage, `expert/resumes/${uuidv4()}-${resumee?.name}`);

                const [profilePicSnapshot, resumeSnapshot] = await Promise.all([
                    profilePicture && uploadBytes(profilePicRef, profilePicture),
                    resumee && uploadBytes(resumeRef, resumee),
                ]);

                const profilePic = profilePicSnapshot ? await getDownloadURL(profilePicRef) : null;
                const resume = resumeSnapshot ? await getDownloadURL(resumeRef) : null;

                // console.log('expert register values :',{ ...values, profilePic, resume })
                dispatch(setExpertRegister({ ...values, profilePic, resume }));

                const { name, email } = values;
                const res = await sendOtpToEmail({ name, email }).unwrap();
                navigate('/expert/otp');
                toast.success(res.message);
            } catch (err) {
                dispatch(clearExpertRegister());
                toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
            } finally {
                setSubmit(false);
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
                            Expert Register
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input type="text" name="name" value={values.name} onChange={handleChange} id="name" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Full Name" required={true} />
                                    {errors.name && touched.name && (
                                        <div className="text-red-500">{errors.name}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                                    <input type="email" name="email" value={values.email} onChange={handleChange} id="email" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true} />
                                    {errors.email && touched.email && (
                                        <div className="text-red-500">{errors.email}</div>
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
                                    <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input type="password" name="cpassword" value={values.cpassword} onChange={handleChange} id="cpassword" placeholder="••••••••" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                    {errors.cpassword && touched.cpassword && (
                                        <div className="text-red-500">{errors.cpassword}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Field of Expertise</label>
                                    <select name="category" value={values.category} onChange={handleChange} id="category" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true}>
                                      
                                        <option value="">Select Field of Expertise</option>
                                        {categories.map((category) => (
                                            <option key={category._id} value={category.categoryName}>
                                                {category.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && touched.category && (
                                        <div className="text-red-500">{errors.category}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year of Experience</label>
                                    <input type="number" name="experience" value={values.experience} onChange={handleChange} id="experience" placeholder="Number of years" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                    {errors.experience && touched.experience && (
                                        <div className="text-red-500">{errors.experience}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
                                    <input type="tel" name="mobile" value={values.mobile} onChange={handleChange} id="mobile" placeholder="Enter a Mobile Number" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                    {errors.mobile && touched.mobile && (
                                        <div className="text-red-500">{errors.mobile}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="profilePicture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Profile Picture</label>
                                    <input type="file" name="profilePicture" id="profilePicture" onChange={(event) => {
                                        const files = event.currentTarget.files;
                                        if (files && files.length > 0) {
                                            setProfilePic(files[0]);
                                        }
                                    }} className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                    {fileErrors.profilePicture && (
                                        <div className="text-red-500">{fileErrors.profilePicture}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="resume" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Resume</label>
                                    <input type="file" name="resume" id="resume" onChange={(event) => {
                                        const files = event.currentTarget.files;
                                        if (files && files.length > 0) {
                                            setResume(files[0]);
                                        }
                                    }} className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                    {fileErrors.resumee && (
                                        <div className="text-red-500">{fileErrors.resumee}</div>
                                    )}
                                </div>
                            </div>
                            <hr className="border-gray-300 dark:border-gray-600" />
                            <button type="submit" className="w-full text-black border border-gray-300 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:text-white  dark:border-gray-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{isSumbit ? <Spinner /> : "Register"}</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to={'/expert/login'} className="cursor-pointer font-medium text-addressrimary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
