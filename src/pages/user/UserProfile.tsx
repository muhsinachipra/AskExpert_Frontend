// frontend\src\pages\user\UserProfile.tsx

import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import UserHeader from "../../components/user/UserHeader";
import Spinner from "../../components/Spinner";
import { RootState } from "../../app/store";
import { userUpdateProfileSchema } from '../../validation/yupValidation';
import { useUpdateProfileMutation } from "../../slices/api/userApiSlice";
import { setCredential } from "../../slices/authSlice";
import { MyError } from "../../validation/validationTypes";
import { storage } from "../../app/firebase/config";
import { useGetUserWalletDataQuery } from "../../slices/api/userApiSlice";
import Pagination from "../../components/Pagination";

const UserProfile = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [updateUser] = useUpdateProfileMutation();
  const [isSubmit, setSubmit] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState("profile");

  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const { data, error, isLoading } = useGetUserWalletDataQuery({ page, limit });
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);
  const walletData = data?.data;

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

        const { name, mobile } = values;
        const res = await updateUser({ _id, name, mobile, profilePic: profilePicUrl }).unwrap();
        dispatch(setCredential({ ...res.user }));
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

  const handleProfilePicClick: () => void = () => {
    fileInputRef.current?.click();
  };

  const renderProfileForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 text-center relative">
        <div className="group relative w-32 h-32 mx-auto">
          <img
            src={profilePic ? URL.createObjectURL(profilePic) : userInfo?.profilePic}
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
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
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
          className="w-1/3 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isSubmit ? <Spinner /> : "Save Changes"}
        </button>
      </div>
    </form>
  );

  const renderWallet = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Wallet</h2>
      {error ? (
        <span className="font-bold text-2xl text-gray-500 mt-4 mb-6 block">Error fetching wallet data</span>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-2xl font-semibold mb-4">Current Balance: ₹{userInfo?.wallet || 0}</p>
            <h3 className="text-xl font-semibold mb-2">Wallet History:</h3>
            <ul className="space-y-2">
              {walletData?.filter(transaction => transaction.paymentId.startsWith("wa_")).map((transaction, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{transaction.appointmentStatus === 'cancelled' ? 'Refund' : 'Purchase'}</span>
                  <span className={transaction.appointmentStatus === 'cancelled' ? 'text-green-500' : 'text-red-500'}>
                    {transaction.appointmentStatus === 'cancelled' ? '+' : '-'}₹{transaction.price}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <UserHeader />
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        <aside className="md:w-1/4 bg-gray-800 text-white p-4 rounded-lg mb-4 md:mr-4 md:h-[calc(100vh-100px)]">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-2 overflow-hidden">
              <img
                src={profilePic ? URL.createObjectURL(profilePic) : userInfo?.profilePic}
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold">{userInfo?.name}</h2>
          </div>
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => setActivePage("profile")}
              className={`w-full py-2 px-4 rounded-md text-left transition-colors duration-200 ${activePage === "profile" ? "bg-teal-500" : "hover:bg-teal-400"
                }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActivePage("wallet")}
              className={`w-full py-2 px-4 rounded-md text-left transition-colors duration-200 ${activePage === "wallet" ? "bg-teal-500" : "hover:bg-teal-400"
                }`}
            >
              Wallet
            </button>
          </nav>
        </aside>
        <main className="md:w-3/4 bg-white p-6 rounded-lg shadow-md">
          {activePage === "profile" ? renderProfileForm() : renderWallet()}
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
