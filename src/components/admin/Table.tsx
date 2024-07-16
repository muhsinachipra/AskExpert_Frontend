// frontend/src/components/admin/Table.tsx

import Spinner from "../Spinner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface Identifiable {
    _id: string;
}

interface AdminTableProps<T extends Identifiable> {
    data: T[];
    isLoading?: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
    handleButtonClick: (id: string, isVerified: boolean) => void;
    tableHeaders: string[];
    renderRow: (datum: T, handleButtonClick: (id: string, isVerified: boolean) => void) => React.ReactNode;
}

export default function AdminTable<T extends Identifiable>({ data, isLoading, error, handleButtonClick, tableHeaders, renderRow }: AdminTableProps<T>) {
    if (isLoading) return <Spinner />;
    if (error) return <div>Error loading data</div>;

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200">
            <div className="overflow-x-auto mt-3">
                <table className="w-full text-left text-gray-700">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            {tableHeaders.map((header, index) => (
                                <th key={index} className="p-2">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((datum) => (
                                <tr key={datum._id} className="border-b hover:bg-gray-50">
                                    {renderRow(datum, handleButtonClick)}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={tableHeaders.length} className="text-center p-2">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


// // frontend/src/components/admin/Table.tsx

// import Spinner from "../Spinner";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import { SerializedError } from "@reduxjs/toolkit";

// interface AdminTableProps<T> {
//     data: T[];
//     isLoading: boolean;
//     error: FetchBaseQueryError | SerializedError | undefined;
//     handleVerificationToggle: (id: string, isVerified: boolean) => void;
//     tableHeaders: string[];
//     renderRow: (datum: T, handleVerificationToggle: (id: string, isVerified: boolean) => void) => React.ReactNode;
// }

// export default function AdminTable<T>({ data, isLoading, error, handleVerificationToggle, tableHeaders, renderRow }: AdminTableProps<T>) {
//     if (isLoading) return <Spinner />;
//     if (error) return <div>Error loading data</div>;

//     return (
//         <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200">
//             <div className="overflow-x-auto mt-3">
//                 <table className="w-full text-left text-gray-700">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             {tableHeaders.map((header, index) => (
//                                 <th key={index} className="p-2">{header}</th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.length > 0 ? (
//                             data.map((datum) => (
//                                 <tr key={datum._id} className="border-b hover:bg-gray-50">
//                                     {renderRow(datum, handleVerificationToggle)}
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={tableHeaders.length} className="text-center p-2">No data found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }



// // frontend\src\components\admin\Table.tsx

// import Spinner from "../Spinner";
// import { CategoryData, ExpertData } from "../../slices/api/adminApiSlice";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import { SerializedError } from "@reduxjs/toolkit";

// interface AdminTableProps {
//     data: ExpertData[] | CategoryData[];
//     isLoading: boolean;
//     error: FetchBaseQueryError | SerializedError | undefined;
//     handleVerificationToggle: (expertId: string, isVerified: boolean) => void;
//     tableHeaders: string[];
//     renderRow: (datum: ExpertData | CategoryData, handleVerificationToggle: (expertId: string, isVerified: boolean) => void) => React.ReactNode;
//     // renderRow: (datum: ExpertData, handleVerificationToggle: (expertId: string, isVerified: boolean) => void) => React.ReactNode;
// }

// export default function AdminTable({ data, isLoading, error, handleVerificationToggle, tableHeaders, renderRow }: AdminTableProps) {
//     if (isLoading) return <Spinner />;
//     if (error) return <div>Error loading data</div>;

//     return (
//         <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200">
//             <div className="overflow-x-auto mt-3">
//                 <table className="w-full text-left text-gray-700">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             {tableHeaders.map((header, index) => (
//                                 <th key={index} className="p-2">{header}</th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.length > 0 ? (
//                             data.map((datum) => (
//                                 <tr key={datum._id} className="border-b hover:bg-gray-50">
//                                     {renderRow(datum, handleVerificationToggle)}
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={tableHeaders.length} className="text-center p-2">No data found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }



// // frontend\src\components\admin\Table.tsx

// import { Link } from "react-router-dom";
// import Spinner from "../Spinner";
// import { ExpertData } from "../../slices/api/adminApiSlice";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import { SerializedError } from "@reduxjs/toolkit";

// const getStatusClassName = (isVerified: boolean): string => {
//     return isVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
// };

// interface AdminTableProps {
//     experts: ExpertData[];
//     isLoading: boolean;
//     error: FetchBaseQueryError | SerializedError | undefined;
//     handleVerificationToggle: (expertId: string, isVerified: boolean) => void;
// }

// export default function AdminTable({ experts, isLoading, error, handleVerificationToggle }: AdminTableProps) {
//     if (isLoading) return <Spinner />;
//     if (error) return <div>Error loading experts</div>;

//     return (
//         <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200">
//             <div className="overflow-x-auto mt-3">
//                 <table className="w-full text-left text-gray-700">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             <th className="p-2">Name</th>
//                             <th className="p-2">Email</th>
//                             <th className="p-2">Resume</th>
//                             <th className="p-2">Category</th>
//                             <th className="p-2">Experience</th>
//                             <th className="p-2">Rate</th>
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
//                                         <Link to={`${expert.resume}`} target="_blank" className="text-blue-600 hover:underline ellipsis">
//                                             Link
//                                         </Link>
//                                     </td>
//                                     <td className="p-2">{expert.category}</td>
//                                     <td className="p-2">{expert.experience} years</td>
//                                     <td className="p-2">{expert.mobile}</td>
//                                     <td className="p-2">
//                                         <button
//                                             onClick={() => handleVerificationToggle(expert._id, expert.isVerified)}
//                                             className={`${getStatusClassName(expert.isVerified)} py-1 px-2 rounded-full text-sm`}
//                                         >
//                                             {expert.isVerified ? "Verified" : "Unverified"}
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={7} className="text-center p-2">No experts found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }



// // frontend\src\components\admin\Table.tsx

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useGetExpertDataQuery, useSendVerifiedEmailMutation, useUpdateExpertVerificationMutation } from "../../slices/api/adminApiSlice";
// import Spinner from "../Spinner";
// import { Link } from "react-router-dom";
// import { setExpertCredential } from "../../slices/authSlice";

// const getStatusClassName = (isVerified: boolean): string => {
//     return isVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
// };

// export default function AdminTable() {
//     const [page, setPage] = useState(1);
//     const [limit] = useState(6);
//     const { data, error, isLoading } = useGetExpertDataQuery({ page, limit });
//     const [sendVerifiedEmail] = useSendVerifiedEmailMutation();
//     const experts = data?.data ?? [];
//     const total = data?.total ?? 0;
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

//     if (isLoading) return <Spinner />;
//     if (error) return <div>Error loading experts</div>;

//     return (
//         <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200">
//             {/* <strong className="text-gray-700 font-medium">Expert List</strong> */}
//             <div className="overflow-x-auto mt-3">
//                 <table className="w-full text-left text-gray-700">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             <th className="p-2">Name</th>
//                             <th className="p-2">Email</th>
//                             <th className="p-2">Resume</th>
//                             <th className="p-2">Category</th>
//                             <th className="p-2">Experience</th>
//                             <th className="p-2">Rate</th>
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
//                                         <Link to={`${expert.resume}`} target="_blank" className="text-blue-600 hover:underline ellipsis">
//                                             Link
//                                         </Link>
//                                     </td>
//                                     <td className="p-2">{expert.category}</td>
//                                     <td className="p-2">{expert.experience} years</td>
//                                     <td className="p-2">{expert.mobile}</td>
//                                     <td className="p-2">
//                                         <button
//                                             onClick={() => handleVerificationToggle(expert._id, expert.isVerified)}
//                                             className={`${getStatusClassName(expert.isVerified)} py-1 px-2 rounded-full text-sm`}
//                                         >
//                                             {expert.isVerified ? "Verified" : "Unverified"}
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={7} className="text-center p-2">No experts found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//             <div className="flex justify-between items-center mt-4">
//                 <button onClick={handlePreviousPage} disabled={page === 1} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Previous</button>
//                 <span>Page {page}</span>
//                 <button onClick={handleNextPage} disabled={page * limit >= total} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Next</button>
//             </div>
//         </div>
//     );
// }
