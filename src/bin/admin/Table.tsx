// // frontend\src\components\admin\Table.tsx

// import { useDispatch } from "react-redux";
// import { useGetExpertDataQuery, useSendVerifiedEmailMutation, useUpdateExpertVerificationMutation } from "../../slices/api/adminApiSlice";
// import Spinner from "../Spinner";
// import { Link } from "react-router-dom";
// import { setExpertCredential } from "../../slices/authSlice";

// const getStatusClassName = (isVerified: boolean): string => {
//     return isVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
// };

// export default function AdminTable() {
//     const { data, error, isLoading } = useGetExpertDataQuery();
//     const [sendVerifiedEmail] = useSendVerifiedEmailMutation();
//     const experts = data?.data ?? [];
//     const [updateExpertVerification] = useUpdateExpertVerificationMutation();
//     const dispatch = useDispatch();

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

//     if (isLoading) return <Spinner />;
//     if (error) return <div>Error loading experts</div>;

//     return (
//         <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
//             <strong className="text-gray-700 font-medium">Expert List</strong>
//             <div className="overflow-x-auto mt-3">
//                 <table className="w-full text-left text-gray-700">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             <th className="p-2">Name</th>
//                             <th className="p-2">Email</th>
//                             <th className="p-2">Resume</th>
//                             <th className="p-2">Category</th>
//                             <th className="p-2">Experience</th>
//                             <th className="p-2">Rating</th>
//                             <th className="p-2">Verified</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {experts.length > 0 ? (
//                             experts.map((expert) => (
//                                 <tr key={expert._id} className="border-b hover:bg-gray-50">
//                                     <td className="p-2">{expert.name}</td>
//                                     <td className="p-2">{expert.email}</td>
//                                     <td className="p-2 max-w-xs truncate">
//                                         <Link to={`${expert.resume}`} className="text-blue-600 hover:underline ellipsis">
//                                             {expert.resume}
//                                         </Link>
//                                     </td>
//                                     <td className="p-2">{expert.category}</td>
//                                     <td className="p-2">{expert.experience} years</td>
//                                     <td className="p-2">{expert.rating}</td>
//                                     <td className="p-2">
//                                         <button
//                                             className={`inline-block px-2 py-1 rounded ${getStatusClassName(expert.isVerified)}`}
//                                             onClick={() => handleVerificationToggle(expert._id, expert.isVerified)}
//                                         >
//                                             {expert.isVerified ? 'Yes' : 'No'}
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={7} className="p-2 text-center">No experts found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }
