// frontend\src\pages\expert\ExpertProfile.tsx

import { useFormik } from "formik";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { expertUpdateProfileSchema } from '../../validation/yupValidation'
import { useExpertUpdateProfileMutation } from "../../slices/api/expertApiSlice";
import { setExpertCredential } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { MyError } from "../../validation/validationTypes";

export default function ExpertProfile() {

    const { expertInfo } = useSelector((state: RootState) => state.auth);
    const [updateExpert] = useExpertUpdateProfileMutation()
    const dispatch = useDispatch()

    const initialValues = {
        name: expertInfo?.name,
        rate: expertInfo?.rate,
    };

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: expertUpdateProfileSchema,
        onSubmit: async (values) => {
            try {
                const _id = expertInfo?._id;
                const { name, rate } = values;
                const res = await updateExpert({ _id, name, rate }).unwrap();
                dispatch(setExpertCredential({ ...res.expert }));
                toast.success(res.message)
            } catch (err) {
                toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
            }
        },
    });

    return (
        <>
            <Header isExpertPage={true}/>
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
                            placeholder={expertInfo?.name}
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
                            value={expertInfo?.email}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                        {errors.rate && touched.rate && (
                            <div className="text-red-500">{errors.rate}</div>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}
