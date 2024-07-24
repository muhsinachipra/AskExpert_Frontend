// frontend\src\pages\user\UserProfile.tsx

import { useFormik } from "formik";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { userUpdateProfileSchema } from '../../validation/yupValidation'
import { useUpdateProfileMutation } from "../../slices/api/userApiSlice";
import { setCredential } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { MyError } from "../../validation/validationTypes";
import Spinner from "../../components/Spinner";
import { useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../app/firebase/config";
import { v4 as uuidv4 } from "uuid";

export default function UserProfile() {

    const { userInfo } = useSelector((state: RootState) => state.auth);
    // console.log('userInfo : ', userInfo)
    const [updateUser] = useUpdateProfileMutation()
    const [isSumbit, setSubmit] = useState(false)
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch()

    const initialValues = {
        name: userInfo?.name,
        mobile: userInfo?.mobile,
    };

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: userUpdateProfileSchema,
        onSubmit: async (values) => {
            setSubmit(true);
            try {
                const _id = userInfo?._id;

                let profilePicUrl = userInfo?.profilePic;

                if (profilePic) {
                    const profilePicRef = ref(storage, `user/profilePics/${uuidv4()}-${profilePic.name}`);
                    await uploadBytes(profilePicRef, profilePic);
                    profilePicUrl = await getDownloadURL(profilePicRef);
                }

                const { name, mobile } = values; // Destructure values
                const res = await updateUser({ _id, name, mobile, profilePic: profilePicUrl }).unwrap();
                console.log('res.user data from updataProfile', res.user)
                dispatch(setCredential({ ...res.user }));
                toast.success(res.message)
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
            <Header />
            <div className="container mx-auto my-10 p-5 max-w-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Edit Profile</h1>
                <form onSubmit={handleSubmit} className="bg-neutral-200 p-6 rounded-lg shadow-md">
                    <div className="mb-4 text-center relative">
                        <div className="group relative w-32 h-32 mx-auto">
                            <img
                                src={profilePic ? URL.createObjectURL(profilePic) : userInfo?.profilePic}
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
                            placeholder={userInfo?.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
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
                            value={userInfo?.email}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
                            Mobile
                        </label>
                        <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={values.mobile}
                            placeholder={userInfo?.mobile}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                        {errors.mobile && touched.mobile && (
                            <div className="text-red-500">{errors.mobile}</div>
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
