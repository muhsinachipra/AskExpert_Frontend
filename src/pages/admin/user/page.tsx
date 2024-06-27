// frontend\src\pages\admin\user\page.tsx

import { useState } from "react";
import { useAdminGetUserDataQuery } from "../../../slices/api/adminApiSlice";
import { IUser } from "../../../types/domain";
import { useToggleUserBlockedStatusMutation } from "../../../slices/api/adminApiSlice";
import Spinner from "../../../components/Spinner";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../slices/authSlice";

const getStatusClassName = (isBlocked: boolean): string => {
    return isBlocked ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
};

const AllUsers = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const { data, error, isLoading } = useAdminGetUserDataQuery({ page, limit });
    const [toggleUserBlockedStatus] = useToggleUserBlockedStatusMutation();
    const users = data?.data ?? [];
    const total = data?.total ?? 0;
    const dispatch = useDispatch()

    const handleButtonClick = async (userId: string, isBlocked: boolean) => {
        try {
            if (!isBlocked) {
                console.log('isBlocked', isBlocked)
                dispatch(userLogout())
            }
            await toggleUserBlockedStatus({ userId }).unwrap();
        } catch (error) {
            console.error("Failed to update user Block status", error);
        }
    };

    const handleNextPage = () => {
        if (page * limit < total) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const tableHeaders = ["Name", "Email", "Mobile", "Action"];

    const renderRow = (user: IUser, handleButtonClick: (userId: string, isBlocked: boolean) => void) => (
        <>
            <td className="p-2">{user.name}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.mobile}</td>
            <td className="p-2">
                <button
                    onClick={() => handleButtonClick(user._id, user.isBlocked)}
                    className={`${getStatusClassName(user.isBlocked)} py-1 px-2 rounded-full text-sm`}
                >
                    {user.isBlocked ? "Unblock" : "Block"}
                </button>
            </td>
        </>
    );

    if (isLoading) return <Spinner />;
    if (error) return <div>Error loading data</div>;

    return (
        <>
            <span className="font-bold text-4xl">User Management</span>
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
                            {users.length > 0 ? (
                                users.map((datum) => (
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
            <div className="flex justify-between items-center mt-4">
                <button onClick={handlePreviousPage} disabled={page === 1} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Previous</button>
                <span>Page {page}</span>
                <button onClick={handleNextPage} disabled={page * limit >= total} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Next</button>
            </div>
        </>
    );
};

export default AllUsers;


// // frontend\src\pages\admin\user\page.tsx

// import { useState } from "react";
// import { useAdminGetUserDataQuery } from "../../../slices/api/adminApiSlice";
// import AdminTable from "../../../components/admin/Table";
// import { IUser } from "../../../types/domain";
// import { useToggleUserBlockedStatusMutation } from "../../../slices/api/adminApiSlice";
// import { useDispatch } from "react-redux";
// import { setCredential } from "../../../slices/authSlice";

// const getStatusClassName = (isBlocked: boolean): string => {
//     return isBlocked ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
// };

// const AllUsers = () => {
//     const [page, setPage] = useState(1);
//     const [limit] = useState(6);
//     const { data, error, isLoading } = useAdminGetUserDataQuery({ page, limit });
//     const [toggleUserBlockedStatus] = useToggleUserBlockedStatusMutation();
//     const users = data?.data ?? [];
//     const total = data?.total ?? 0;
//     const dispatch = useDispatch()

//     const handleButtonClick = async (userId: string, isBlocked: boolean) => {
//         try {
//             const result = await toggleUserBlockedStatus({ userId, isBlocked: !isBlocked }).unwrap();
//             if (result.data.success) {
//                 console.log('result.data.    : ', result.data.data)
//                 dispatch(setCredential({...result.data}));
//             }
//         } catch (error) {
//             console.error("Failed to update user Block status", error);
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

//     const tableHeaders = ["Name", "Email", "Mobile", "Action"];

//     const renderRow = (user: IUser, handleButtonClick: (userId: string, isBlocked: boolean) => void) => (
//         <>
//             <td className="p-2">{user.name}</td>
//             <td className="p-2">{user.email}</td>
//             <td className="p-2">{user.mobile}</td>
//             <td className="p-2">
//                 <button
//                     onClick={() => handleButtonClick(user._id, user.isBlocked)}
//                     className={`${getStatusClassName(user.isBlocked)} py-1 px-2 rounded-full text-sm`}
//                 >
//                     {user.isBlocked ? "Unblock" : "Block"}
//                 </button>
//             </td>
//         </>
//     );

//     return (
//         <>
//             <span className="font-bold text-4xl">Verify Users</span>
//             <AdminTable<IUser>
//                 data={users}
//                 isLoading={isLoading}
//                 error={error}
//                 handleButtonClick={handleButtonClick}
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

// export default AllUsers;