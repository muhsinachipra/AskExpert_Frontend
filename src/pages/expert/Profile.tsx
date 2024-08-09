// frontend\src\pages\expert\Profile.tsx

import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { expertUpdateProfileSchema } from '../../validation/yupValidation';
import { useExpertUpdateProfileMutation } from '../../slices/api/expertApiSlice';
import { setExpertCredential } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import { storage } from '../../app/firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../../components/Spinner';
import { MyError } from '../../validation/validationTypes';

export default function Profile() {
    const { expertInfo } = useSelector((state: RootState) => state.auth);
    const [updateExpert] = useExpertUpdateProfileMutation();
    const dispatch = useDispatch();
    const [isSubmit, setSubmit] = useState(false);
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const initialValues = {
        name: expertInfo?.name || '',
        email: expertInfo?.email || '',
        mobile: expertInfo?.mobile || '',
        experience: expertInfo?.experience || '',
    };

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues,
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
        <div className="bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h2>
                <div className="flex justify-center mb-6">

                    <div className="group relative w-32 h-32 mx-auto">
                        <img
                            src={profilePic ? URL.createObjectURL(profilePic) : expertInfo?.profilePic}
                            alt="Profile Picture"
                            className="w-32 h-32 rounded-full mx-auto object-cover"
                        />
                        <button
                            type="button"
                            onClick={handleProfilePicClick}
                            className="absolute inset-0 bg-gray-800 bg-opacity-50 text-white text-xl font-bold rounded-full flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        >
                            Change
                        </button>
                        <input
                            type="file"
                            id="profilePic"
                            name="profilePic"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                            ref={fileInputRef}
                            className="hidden"
                            placeholder="change your profile pic"
                        />
                    </div>

                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                name="name"
                                type="text"
                                value={values.name}
                                onChange={handleChange}
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
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
                                Mobile
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="mobile"
                                name="mobile"
                                type="text"
                                value={values.mobile}
                                onChange={handleChange}
                            />
                            {errors.mobile && touched.mobile && (
                                <div className="text-red-500">{errors.mobile}</div>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
                                Experience
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="experience"
                                name="experience"
                                type="text"
                                value={values.experience}
                                onChange={handleChange}
                            />
                            {errors.experience && touched.experience && (
                                <div className="text-red-500">{errors.experience}</div>
                            )}
                        </div>

                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="min-w-36 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {isSubmit ? <Spinner /> : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
