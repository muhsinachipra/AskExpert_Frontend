import { useFormik } from "formik";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { expertUpdateProfileSchema } from '../../validation/yupValidation';
import { useExpertUpdateProfileMutation } from "../../slices/api/expertApiSlice";
import { setExpertCredential } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { MyError } from "../../validation/validationTypes";
import { useState, useRef } from "react";
import { storage } from "../../app/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../../components/Spinner";

export default function ExpertProfile() {
    const { expertInfo } = useSelector((state: RootState) => state.auth);
    const [updateExpert] = useExpertUpdateProfileMutation();
    const dispatch = useDispatch();
    const [isSumbit, setSubmit] = useState(false);
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const initialValues = {
        name: expertInfo?.name,
        rate: expertInfo?.rate,
        experience: expertInfo?.experience,
    };

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: expertUpdateProfileSchema,
        onSubmit: async (values) => {
            setSubmit(true);
            try {
                const _id = expertInfo?._id;
                let profilePicUrl = expertInfo?.profilePic;

                if (profilePic) {
                    const profilePicRef = ref(storage, `expert/profilePics/${uuidv4()}-${profilePic.name}`);
                    await uploadBytes(profilePicRef, profilePic);
                    profilePicUrl = await getDownloadURL(profilePicRef);
                }

                const res = await updateExpert({ _id, ...values, profilePic: profilePicUrl }).unwrap();
                dispatch(setExpertCredential({ ...res.expert }));
                toast.success(res.message);
            } catch (err) {
                toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
            } finally {
                setSubmit(false);
            }
        },
    });

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePic(e.target.files[0]);
        }
    };

    const handleProfilePicClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <Header isExpertPage={true} />
            <div className="container mx-auto my-10 p-5 max-w-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Edit Profile</h1>
                <form onSubmit={handleSubmit} className="bg-neutral-200 p-6 rounded-lg shadow-md">
                    <div className="mb-4 text-center relative">
                        <div className="group relative w-32 h-32 mx-auto">
                            <img
                                src={profilePic ? URL.createObjectURL(profilePic) : expertInfo?.profilePic}
                                alt="Profile Picture"
                                className="w-32 h-32 rounded-full mx-auto object-cover"
                            />
                            <button
                                type="button"
                                onClick={handleProfilePicClick}
                                className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-30 text-white text-5xl font-bold rounded-full flex items-center justify-center transition-opacity duration-300"
                            >
                                +
                            </button>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePic">Change ProfilePic</label>
                            <input
                                type="file"
                                id="profilePic"
                                name="profilePic"
                                accept="image/*"
                                onChange={handleProfilePicChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            placeholder={expertInfo?.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        {errors.name && touched.name && (
                            <div className="text-red-500">{errors.name}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={expertInfo?.email}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rate">
                            Rate
                        </label>
                        <input
                            type="text"
                            id="rate"
                            name="rate"
                            value={values.rate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        {errors.rate && touched.rate && (
                            <div className="text-red-500">{errors.rate}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
                            Experience
                        </label>
                        <input
                            type="text"
                            id="experience"
                            name="experience"
                            value={values.experience}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        {errors.experience && touched.experience && (
                            <div className="text-red-500">{errors.experience}</div>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-1/3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            {isSumbit ? <Spinner /> : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}


// import { useFormik } from "formik";
// import Footer from "../../components/Footer";
// import Header from "../../components/Header";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../app/store";
// import { expertUpdateProfileSchema } from '../../validation/yupValidation';
// import { useExpertUpdateProfileMutation } from "../../slices/api/expertApiSlice";
// import { setExpertCredential } from "../../slices/authSlice";
// import { toast } from "react-toastify";
// import { MyError } from "../../validation/validationTypes";
// import { useState, useRef } from "react";
// import { storage } from "../../app/firebase/config";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";
// import Spinner from "../../components/Spinner";

// export default function ExpertProfile() {
//     const { expertInfo } = useSelector((state: RootState) => state.auth);
//     const [updateExpert] = useExpertUpdateProfileMutation();
//     const dispatch = useDispatch();
//     const [isSumbit, setSubmit] = useState(false);
//     const [profilePic, setProfilePic] = useState<File | null>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const initialValues = {
//         name: expertInfo?.name,
//         rate: expertInfo?.rate,
//         experience: expertInfo?.experience,
//     };

//     const { values, handleChange, handleSubmit, errors, touched } = useFormik({
//         initialValues: initialValues,
//         validationSchema: expertUpdateProfileSchema,
//         onSubmit: async (values) => {
//             setSubmit(true);
//             try {
//                 const _id = expertInfo?._id;
//                 let profilePicUrl = expertInfo?.profilePic;

//                 if (profilePic) {
//                     const profilePicRef = ref(storage, `expert/profilePics/${uuidv4()}-${profilePic.name}`);
//                     await uploadBytes(profilePicRef, profilePic);
//                     profilePicUrl = await getDownloadURL(profilePicRef);
//                 }

//                 const res = await updateExpert({ _id, ...values, profilePic: profilePicUrl }).unwrap();
//                 dispatch(setExpertCredential({ ...res.expert }));
//                 toast.success(res.message);
//             } catch (err) {
//                 toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
//             } finally {
//                 setSubmit(false);
//             }
//         },
//     });

//     const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             setProfilePic(e.target.files[0]);
//         }
//     };

//     const handleProfilePicClick = () => {
//         fileInputRef.current?.click();
//     };

//     return (
//         <>
//             <Header isExpertPage={true} />
//             <div className="container mx-auto my-10 p-5 max-w-lg">
//                 <h1 className="text-3xl font-bold text-center mb-6">Edit Profile</h1>
//                 <form onSubmit={handleSubmit} className="bg-neutral-200 p-6 rounded-lg shadow-md">
//                     <div className="mb-4 text-center relative">
//                         <img
//                             src={profilePic ? URL.createObjectURL(profilePic) : expertInfo?.profilePic}
//                             alt="Profile Picture"
//                             className="w-32 h-32 rounded-full mx-auto object-cover"
//                         />
//                         <button
//                             type="button"
//                             onClick={handleProfilePicClick}
//                             className="absolute bottom-16 left-44 bg-white bg-opacity-30 backdrop-blur-md text-white text-xl font-bold rounded-full p-2 flex items-center justify-center"
//                             style={{ width: '30px', height: '30px' }}
//                         >
//                             +
//                         </button>
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePic">Change Profile Picture</label>
//                         <input
//                             type="file"
//                             id="profilePic"
//                             name="profilePic"
//                             accept="image/*"
//                             onChange={handleProfilePicChange}
//                             ref={fileInputRef}
//                             className="hidden"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                             Name
//                         </label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={values.name}
//                             placeholder={expertInfo?.name}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                         />
//                         {errors.name && touched.name && (
//                             <div className="text-red-500">{errors.name}</div>
//                         )}
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={expertInfo?.email}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                             readOnly
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rate">
//                             Rate
//                         </label>
//                         <input
//                             type="text"
//                             id="rate"
//                             name="rate"
//                             value={values.rate}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                         />
//                         {errors.rate && touched.rate && (
//                             <div className="text-red-500">{errors.rate}</div>
//                         )}
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
//                             Experience
//                         </label>
//                         <input
//                             type="text"
//                             id="experience"
//                             name="experience"
//                             value={values.experience}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                         />
//                         {errors.experience && touched.experience && (
//                             <div className="text-red-500">{errors.experience}</div>
//                         )}
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <button
//                             type="submit"
//                             className="w-1/3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                             {isSumbit ? <Spinner /> : "Save Changes"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//             <Footer />
//         </>
//     );
// }


// // import { useFormik } from "formik";
// // import Footer from "../../components/Footer";
// // import Header from "../../components/Header";
// // import { useDispatch, useSelector } from "react-redux";
// // import { RootState } from "../../app/store";
// // import { expertUpdateProfileSchema } from '../../validation/yupValidation';
// // import { useExpertUpdateProfileMutation } from "../../slices/api/expertApiSlice";
// // import { setExpertCredential } from "../../slices/authSlice";
// // import { toast } from "react-toastify";
// // import { MyError } from "../../validation/validationTypes";
// // import { useState, useRef } from "react";
// // import { storage } from "../../app/firebase/config";
// // import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// // import { v4 as uuidv4 } from "uuid";
// // import Spinner from "../../components/Spinner";

// // export default function ExpertProfile() {
// //     const { expertInfo } = useSelector((state: RootState) => state.auth);
// //     const [updateExpert] = useExpertUpdateProfileMutation();
// //     const dispatch = useDispatch();
// //     const [isSumbit, setSubmit] = useState(false);
// //     const [profilePic, setProfilePic] = useState<File | null>(null);
// //     const fileInputRef = useRef<HTMLInputElement>(null);

// //     const initialValues = {
// //         name: expertInfo?.name,
// //         rate: expertInfo?.rate,
// //         experience: expertInfo?.experience,
// //     };

// //     const { values, handleChange, handleSubmit, errors, touched } = useFormik({
// //         initialValues: initialValues,
// //         validationSchema: expertUpdateProfileSchema,
// //         onSubmit: async (values) => {
// //             setSubmit(true);
// //             try {
// //                 const _id = expertInfo?._id;
// //                 let profilePicUrl = expertInfo?.profilePic;

// //                 if (profilePic) {
// //                     const profilePicRef = ref(storage, `expert/profilePics/${uuidv4()}-${profilePic.name}`);
// //                     await uploadBytes(profilePicRef, profilePic);
// //                     profilePicUrl = await getDownloadURL(profilePicRef);
// //                 }

// //                 const res = await updateExpert({ _id, ...values, profilePic: profilePicUrl }).unwrap();
// //                 dispatch(setExpertCredential({ ...res.expert }));
// //                 toast.success(res.message);
// //             } catch (err) {
// //                 toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
// //             } finally {
// //                 setSubmit(false);
// //             }
// //         },
// //     });

// //     const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         if (e.target.files && e.target.files[0]) {
// //             setProfilePic(e.target.files[0]);
// //         }
// //     };

// //     const handleProfilePicClick = () => {
// //         fileInputRef.current?.click();
// //     };

// //     return (
// //         <>
// //             <Header isExpertPage={true} />
// //             <div className="container mx-auto my-10 p-5 max-w-lg">
// //                 <h1 className="text-3xl font-bold text-center mb-6">Edit Profile</h1>
// //                 <form onSubmit={handleSubmit} className="bg-neutral-200 p-6 rounded-lg shadow-md">
// //                     <div className="mb-4 text-center relative">
// //                         <img
// //                             src={profilePic ? URL.createObjectURL(profilePic) : expertInfo?.profilePic}
// //                             alt="Profile Picture"
// //                             className="w-32 h-32 rounded-full mx-auto object-cover"
// //                         />
// //                         <button
// //                             type="button"
// //                             onClick={handleProfilePicClick}
// //                             className="absolute bottom-0 right-0 bg-indigo-500 text-white rounded-full p-2"
// //                         >
// //                             +
// //                         </button>
// //                         <input
// //                             type="file"
// //                             id="profilePic"
// //                             name="profilePic"
// //                             accept="image/*"
// //                             onChange={handleProfilePicChange}
// //                             ref={fileInputRef}
// //                             className="hidden"
// //                         />
// //                     </div>
// //                     <div className="mb-4">
// //                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
// //                             Name
// //                         </label>
// //                         <input
// //                             type="text"
// //                             id="name"
// //                             name="name"
// //                             value={values.name}
// //                             placeholder={expertInfo?.name}
// //                             onChange={handleChange}
// //                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //                         />
// //                         {errors.name && touched.name && (
// //                             <div className="text-red-500">{errors.name}</div>
// //                         )}
// //                     </div>
// //                     <div className="mb-4">
// //                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
// //                             Email
// //                         </label>
// //                         <input
// //                             type="email"
// //                             id="email"
// //                             name="email"
// //                             value={expertInfo?.email}
// //                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //                             readOnly
// //                         />
// //                     </div>
// //                     <div className="mb-4">
// //                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rate">
// //                             Rate
// //                         </label>
// //                         <input
// //                             type="text"
// //                             id="rate"
// //                             name="rate"
// //                             value={values.rate}
// //                             onChange={handleChange}
// //                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //                         />
// //                         {errors.rate && touched.rate && (
// //                             <div className="text-red-500">{errors.rate}</div>
// //                         )}
// //                     </div>
// //                     <div className="mb-4">
// //                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
// //                             Experience
// //                         </label>
// //                         <input
// //                             type="text"
// //                             id="experience"
// //                             name="experience"
// //                             value={values.experience}
// //                             onChange={handleChange}
// //                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //                         />
// //                         {errors.experience && touched.experience && (
// //                             <div className="text-red-500">{errors.experience}</div>
// //                         )}
// //                     </div>
// //                     <div className="flex items-center justify-between">
// //                         <button
// //                             type="submit"
// //                             className="w-1/3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
// //                             {isSumbit ? <Spinner /> : "Save Changes"}
// //                         </button>
// //                     </div>
// //                 </form>
// //             </div>
// //             <Footer />
// //         </>
// //     );
// // }


// // // frontend\src\pages\expert\ExpertProfile.tsx

// // import { useFormik } from "formik";
// // import Footer from "../../components/Footer";
// // import Header from "../../components/Header";
// // import { useDispatch, useSelector } from "react-redux";
// // import { RootState } from "../../app/store";
// // import { expertUpdateProfileSchema } from '../../validation/yupValidation';
// // import { useExpertUpdateProfileMutation } from "../../slices/api/expertApiSlice";
// // import { setExpertCredential } from "../../slices/authSlice";
// // import { toast } from "react-toastify";
// // import { MyError } from "../../validation/validationTypes";
// // import { useState } from "react";
// // import { storage } from "../../app/firebase/config";
// // import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// // import { v4 as uuidv4 } from "uuid";
// // import Spinner from "../../components/Spinner";

// // export default function ExpertProfile() {
// //     const { expertInfo } = useSelector((state: RootState) => state.auth);
// //     const [updateExpert] = useExpertUpdateProfileMutation();
// //     const dispatch = useDispatch();
// //     const [isSumbit, setSubmit] = useState(false)
// //     const [profilePic, setProfilePic] = useState<File | null>(null);

// //     const initialValues = {
// //         name: expertInfo?.name,
// //         rate: expertInfo?.rate,
// //         experience: expertInfo?.experience,
// //     };

// //     const { values, handleChange, handleSubmit, errors, touched } = useFormik({
// //         initialValues: initialValues,
// //         validationSchema: expertUpdateProfileSchema,
// //         onSubmit: async (values) => {
// //             setSubmit(true);
// //             try {
// //                 const _id = expertInfo?._id;
// //                 let profilePicUrl = expertInfo?.profilePic;

// //                 if (profilePic) {
// //                     const profilePicRef = ref(storage, `expert/profilePics/${uuidv4()}-${profilePic.name}`);
// //                     await uploadBytes(profilePicRef, profilePic);
// //                     profilePicUrl = await getDownloadURL(profilePicRef);
// //                 }

// //                 const res = await updateExpert({ _id, ...values, profilePic: profilePicUrl }).unwrap();
// //                 dispatch(setExpertCredential({ ...res.expert }));
// //                 toast.success(res.message);
// //             } catch (err) {
// //                 toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
// //             } finally {
// //                 setSubmit(false);
// //             }
// //         },
// //     });

// //     const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         if (e.target.files && e.target.files[0]) {
// //             setProfilePic(e.target.files[0]);
// //         }
// //     };

// //     return (
// //         <>
// //             <Header isExpertPage={true} />
// //             <div className="container mx-auto my-10 p-5 max-w-lg">
// //                 <h1 className="text-3xl font-bold text-center mb-6">Edit Profile</h1>
// //                 <form onSubmit={handleSubmit} className="bg-neutral-200 p-6 rounded-lg shadow-md">
// //                     <div className="mb-4 text-center">
// //                         <img
// //                             src={profilePic ? URL.createObjectURL(profilePic) : expertInfo?.profilePic}
// //                             alt="Profile Picture"
// //                             className="w-32 h-32 rounded-full mx-auto object-cover"
// //                         />
// //                         <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="profilePic">
// //                             Change Profile Picture
// //                         </label>
// //                         <input
// //                             type="file"
// //                             id="profilePic"
// //                             name="profilePic"
// //                             accept="image/*"
// //                             onChange={handleProfilePicChange}
// //                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //                         />
// //                     </div>
// //                     <div className="mb-4">
// //                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
// //                             Name
// //                         </label>
// //                         <input
// //                             type="text"
// //                             id="name"
// //                             name="name"
// //                             value={values.name}
// //                             placeholder={expertInfo?.name}
// //                             onChange={handleChange}
// //                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //                         />
// //                         {errors.name && touched.name && (
// //                             <div className="text-red-500">{errors.name}</div>
// //                         )}
// //                     </div>
// //                     <div className="mb-4">
// //                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
// //                             Email
// //                         </label>
// //                         <input
// //                             type="email"
// //                             id="email"
// //                             name="email"
// //                             value={expertInfo?.email}
// //                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //                             readOnly
// //                         />
// //                     </div>
// //                     <div className="mb-4">
// //                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rate">
// //                             Rate
// //                         </label>
// //                         <input
// //                             type="text"
// //                             id="rate"
// //                             name="rate"
// //                             value={values.rate}
// //                             onChange={handleChange}
// //                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //                         />
// //                         {errors.rate && touched.rate && (
// //                             <div className="text-red-500">{errors.rate}</div>
// //                         )}
// //                     </div>
// //                     <div className="mb-4">
// //                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
// //                             Experience
// //                         </label>
// //                         <input
// //                             type="text"
// //                             id="experience"
// //                             name="experience"
// //                             value={values.experience}
// //                             onChange={handleChange}
// //                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //                         />
// //                         {errors.experience && touched.experience && (
// //                             <div className="text-red-500">{errors.experience}</div>
// //                         )}
// //                     </div>
// //                     <div className="flex items-center justify-between">
// //                         <button
// //                             type="submit"
// //                             className="w-1/3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
// //                             {isSumbit ? <Spinner /> : "Save Changes"}
// //                         </button>
// //                     </div>
// //                 </form>
// //             </div>
// //             <Footer />
// //         </>
// //     );
// // }
