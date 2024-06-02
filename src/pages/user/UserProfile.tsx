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

export default function UserProfile() {

    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [updateUser] = useUpdateProfileMutation()
    const dispatch = useDispatch()

    const initialValues = {
        name: userInfo?.name,
        mobile: userInfo?.mobile,
    };

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: userUpdateProfileSchema,
        onSubmit: async (values) => {
            try {
                const _id = userInfo?._id;
                const { name, mobile } = values; // Destructure values
                const res = await updateUser({ _id, name, mobile }).unwrap();
                dispatch(setCredential({ ...res.user }));
                toast.success(res.message)
            } catch (err) {
                toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
            }
        },
    });

    return (
        <>
            <Header />
            <div className="container mx-auto my-10 p-5 max-w-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Edit Profile</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
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
                            className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}
