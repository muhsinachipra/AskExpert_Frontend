// // frontend/src/pages/admin/expert/verifyExperts/page.tsx

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useGetExpertDataQuery, useSendVerifiedEmailMutation, useUpdateExpertVerificationMutation, ExpertData } from "../../../../slices/api/adminApiSlice";
// import { setExpertCredential } from "../../../../slices/authSlice";
// import AdminTable from "../../../../components/admin/Table";
// import { Link } from "react-router-dom";

// const getStatusClassName = (isVerified: boolean): string => {
//   return isVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
// };

// const VerifyExperts = () => {
//     const [page, setPage] = useState(1);
//     const [limit] = useState(6);
//     const { data, error, isLoading } = useGetExpertDataQuery({ page, limit });
//     const [sendVerifiedEmail] = useSendVerifiedEmailMutation();
//     const [updateExpertVerification] = useUpdateExpertVerificationMutation();
//     const dispatch = useDispatch();
//     const experts = data?.data ?? [];
//     const total = data?.total ?? 0;

//     const handleVerificationToggle = async (expertId: string, isVerified: boolean) => {
//         try {
//             const res = await updateExpertVerification({ expertId, isVerified: !isVerified });
//             if (!isVerified) {
//                 await sendVerifiedEmail({ expertId });
//                 const newres = res.data?.data;
//                 dispatch(setExpertCredential({ ...newres }));
//             }
//         } catch (error) {
//             console.error("Failed to update expert verification status", error);
//         }
//     };

//     const handleNextPage = () => {
//         if (page * limit < total) {
//             setPage(page + 1);
//         }
//     };

//     const handlePreviousPage = () => {
//         if (page > 1) {
//             setPage(page - 1);
//         }
//     };

//     const tableHeaders = ["Name", "Email", "Resume", "Category", "Experience", "Rate", "Verified"];

//     const renderRow = (expert: ExpertData, handleVerificationToggle: (expertId: string, isVerified: boolean) => void) => (
//         <>
//             <td className="p-2">{expert.name}</td>
//             <td className="p-2">{expert.email}</td>
//             <td className="p-2 max-w-xs truncate">
//                 <Link to={`${expert.resume}`} target="_blank" className="text-blue-600 hover:underline ellipsis">
//                     Link
//                 </Link>
//             </td>
//             <td className="p-2">{expert.category}</td>
//             <td className="p-2">{expert.experience} years</td>
//             <td className="p-2">{expert.mobile}</td>
//             <td className="p-2">
//                 <button
//                     onClick={() => handleVerificationToggle(expert._id, expert.isVerified)}
//                     className={`${getStatusClassName(expert.isVerified)} py-1 px-2 rounded-full text-sm`}
//                 >
//                     {expert.isVerified ? "Verified" : "Unverified"}
//                 </button>
//             </td>
//         </>
//     );

//     return (
//         <>
//             <span className="font-bold text-4xl">Verify Experts</span>
//             <AdminTable<ExpertData>
//                 data={experts}
//                 isLoading={isLoading}
//                 error={error}
//                 handleVerificationToggle={handleVerificationToggle}
//                 tableHeaders={tableHeaders}
//                 renderRow={renderRow}
//             />
//             <div className="flex justify-between items-center mt-4">
//                 <button onClick={handlePreviousPage} disabled={page === 1} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Previous</button>
//                 <span>Page {page}</span>
//                 <button onClick={handleNextPage} disabled={page * limit >= total} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Next</button>
//             </div>
//         </>
//     );
// };

// export default VerifyExperts;


// // // frontend/src/pages/admin/expert/verifyExperts/page.tsx

// // import { useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { useGetExpertDataQuery, useSendVerifiedEmailMutation, useUpdateExpertVerificationMutation, ExpertData } from "../../../../slices/api/adminApiSlice";
// // import { setExpertCredential } from "../../../../slices/authSlice";
// // import AdminTable from "../../../../components/admin/Table";
// // import { Link } from "react-router-dom";

// // const getStatusClassName = (isVerified: boolean): string => {
// //   return isVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
// // };

// // const VerifyExperts = () => {
// //     const [page, setPage] = useState(1);
// //     const [limit] = useState(6);
// //     const { data, error, isLoading } = useGetExpertDataQuery({ page, limit });
// //     const [sendVerifiedEmail] = useSendVerifiedEmailMutation();
// //     const [updateExpertVerification] = useUpdateExpertVerificationMutation();
// //     const dispatch = useDispatch();
// //     const experts = data?.data ?? [];
// //     const total = data?.total ?? 0;

// //     const handleVerificationToggle = async (expertId: string, isVerified: boolean) => {
// //         try {
// //             const res = await updateExpertVerification({ expertId, isVerified: !isVerified });
// //             if (!isVerified) {
// //                 await sendVerifiedEmail({ expertId });
// //                 const newres = res.data?.data;
// //                 dispatch(setExpertCredential({ ...newres }));
// //             }
// //         } catch (error) {
// //             console.error("Failed to update expert verification status", error);
// //         }
// //     };

// //     const handleNextPage = () => {
// //         if (page * limit < total) {
// //             setPage(page + 1);
// //         }
// //     };

// //     const handlePreviousPage = () => {
// //         if (page > 1) {
// //             setPage(page - 1);
// //         }
// //     };

// //     const tableHeaders = ["Name", "Email", "Resume", "Category", "Experience", "Rate", "Verified"];

// //     const renderRow = (expert: ExpertData, handleVerificationToggle: (expertId: string, isVerified: boolean) => void) => (
// //         <>
// //             <td className="p-2">{expert.name}</td>
// //             <td className="p-2">{expert.email}</td>
// //             <td className="p-2 max-w-xs truncate">
// //                 <Link to={`${expert.resume}`} target="_blank" className="text-blue-600 hover:underline ellipsis">
// //                     Link
// //                 </Link>
// //             </td>
// //             <td className="p-2">{expert.category}</td>
// //             <td className="p-2">{expert.experience} years</td>
// //             <td className="p-2">{expert.mobile}</td>
// //             <td className="p-2">
// //                 <button
// //                     onClick={() => handleVerificationToggle(expert._id, expert.isVerified)}
// //                     className={`${getStatusClassName(expert.isVerified)} py-1 px-2 rounded-full text-sm`}
// //                 >
// //                     {expert.isVerified ? "Verified" : "Unverified"}
// //                 </button>
// //             </td>
// //         </>
// //     );

// //     return (
// //         <>
// //             <span className="font-bold text-4xl">Verify Experts</span>
// //             <AdminTable<ExpertData>
// //                 data={experts}
// //                 isLoading={isLoading}
// //                 error={error}
// //                 handleVerificationToggle={handleVerificationToggle}
// //                 tableHeaders={tableHeaders}
// //                 renderRow={renderRow}
// //             />
// //             <div className="flex justify-between items-center mt-4">
// //                 <button onClick={handlePreviousPage} disabled={page === 1} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Previous</button>
// //                 <span>Page {page}</span>
// //                 <button onClick={handleNextPage} disabled={page * limit >= total} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Next</button>
// //             </div>
// //         </>
// //     );
// // };

// // export default VerifyExperts;


// // // frontend\src\pages\admin\expert\verifyExperts\page.tsx

// // import { useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { useGetExpertDataQuery, useSendVerifiedEmailMutation, useUpdateExpertVerificationMutation } from "../../../../slices/api/adminApiSlice";
// // import { setExpertCredential } from "../../../../slices/authSlice";
// // import AdminTable from "../../../../components/admin/Table";
// // import { ExpertData } from "../../../../slices/api/adminApiSlice";
// // import { Link } from "react-router-dom";

// // const getStatusClassName = (isVerified: boolean): string => {
// //   return isVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
// // };

// // const VerifyExperts = () => {
// //     const [page, setPage] = useState(1);
// //     const [limit] = useState(6);
// //     const { data, error, isLoading } = useGetExpertDataQuery({ page, limit });
// //     const [sendVerifiedEmail] = useSendVerifiedEmailMutation();
// //     const [updateExpertVerification] = useUpdateExpertVerificationMutation();
// //     const dispatch = useDispatch();
// //     const experts = data?.data ?? [];
// //     const total = data?.total ?? 0;

// //     const handleVerificationToggle = async (expertId: string, isVerified: boolean) => {
// //         try {
// //             const res = await updateExpertVerification({ expertId, isVerified: !isVerified });
// //             if (!isVerified) {
// //                 await sendVerifiedEmail({ expertId });
// //                 const newres = res.data?.data;
// //                 dispatch(setExpertCredential({ ...newres }));
// //             }
// //         } catch (error) {
// //             console.error("Failed to update expert verification status", error);
// //         }
// //     };

// //     const handleNextPage = () => {
// //         if (page * limit < total) {
// //             setPage(page + 1);
// //         }
// //     };

// //     const handlePreviousPage = () => {
// //         if (page > 1) {
// //             setPage(page - 1);
// //         }
// //     };

// //     const tableHeaders = ["Name", "Email", "Resume", "Category", "Experience", "Rate", "Verified"];

// //     const renderRow = (expert: ExpertData, handleVerificationToggle: (expertId: string, isVerified: boolean) => void) => (
// //         <>
// //             <td className="p-2">{expert.name}</td>
// //             <td className="p-2">{expert.email}</td>
// //             <td className="p-2 max-w-xs truncate">
// //                 <Link to={`${expert.resume}`} target="_blank" className="text-blue-600 hover:underline ellipsis">
// //                     Link
// //                 </Link>
// //             </td>
// //             <td className="p-2">{expert.category}</td>
// //             <td className="p-2">{expert.experience} years</td>
// //             <td className="p-2">{expert.mobile}</td>
// //             <td className="p-2">
// //                 <button
// //                     onClick={() => handleVerificationToggle(expert._id, expert.isVerified)}
// //                     className={`${getStatusClassName(expert.isVerified)} py-1 px-2 rounded-full text-sm`}
// //                 >
// //                     {expert.isVerified ? "Verified" : "Unverified"}
// //                 </button>
// //             </td>
// //         </>
// //     );

// //     return (
// //         <>
// //             <span className="font-bold text-4xl">Verify Experts</span>
// //             <AdminTable
// //                 data={experts}
// //                 isLoading={isLoading}
// //                 error={error}
// //                 handleVerificationToggle={handleVerificationToggle}
// //                 tableHeaders={tableHeaders}
// //                 renderRow={renderRow}
// //             />
// //             <div className="flex justify-between items-center mt-4">
// //                 <button onClick={handlePreviousPage} disabled={page === 1} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Previous</button>
// //                 <span>Page {page}</span>
// //                 <button onClick={handleNextPage} disabled={page * limit >= total} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Next</button>
// //             </div>
// //         </>
// //     );
// // };

// // export default VerifyExperts;



// // // frontend\src\pages\admin\expert\verifyExperts\page.tsx

// // import { useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { useGetExpertDataQuery, useSendVerifiedEmailMutation, useUpdateExpertVerificationMutation } from "../../../../slices/api/adminApiSlice";
// // import { setExpertCredential } from "../../../../slices/authSlice";
// // import AdminTable from "../../../../components/admin/Table";

// // const VerifyExperts = () => {
// //     const [page, setPage] = useState(1);
// //     const [limit] = useState(6);
// //     const { data, error, isLoading } = useGetExpertDataQuery({ page, limit });
// //     const [sendVerifiedEmail] = useSendVerifiedEmailMutation();
// //     const [updateExpertVerification] = useUpdateExpertVerificationMutation();
// //     const dispatch = useDispatch();
// //     const experts = data?.data ?? [];
// //     const total = data?.total ?? 0;

// //     const handleVerificationToggle = async (expertId: string, isVerified: boolean) => {
// //         try {
// //             const res = await updateExpertVerification({ expertId, isVerified: !isVerified });
// //             if (!isVerified) {
// //                 await sendVerifiedEmail({ expertId });
// //                 const newres = res.data?.data;
// //                 dispatch(setExpertCredential({ ...newres }));
// //             }
// //         } catch (error) {
// //             console.error("Failed to update expert verification status", error);
// //         }
// //     };

// //     const handleNextPage = () => {
// //         if (page * limit < total) {
// //             setPage(page + 1);
// //         }
// //     };

// //     const handlePreviousPage = () => {
// //         if (page > 1) {
// //             setPage(page - 1);
// //         }
// //     };

// //     return (
// //         <>
// //             <span className="font-bold text-4xl">Verify Experts</span>
// //             <AdminTable
// //                 experts={experts}
// //                 isLoading={isLoading}
// //                 error={error}
// //                 handleVerificationToggle={handleVerificationToggle}
// //             />
// //             <div className="flex justify-between items-center mt-4">
// //                 <button onClick={handlePreviousPage} disabled={page === 1} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Previous</button>
// //                 <span>Page {page}</span>
// //                 <button onClick={handleNextPage} disabled={page * limit >= total} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Next</button>
// //             </div>
// //         </>
// //     );
// // };

// // export default VerifyExperts;



// // // frontend\src\pages\admin\expert\verifyExperts\page.tsx

// // import AdminTable from "../../../../components/admin/Table";

// // const VerifyExperts = () => {
// //   return (
// //     <>
// //       <span className="font-bold text-4xl">Verify Experts</span>
// //       <AdminTable />
// //     </>
// //   );
// // };

// // export default VerifyExperts;
