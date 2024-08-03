// frontend\src\pages\admin\expert\page.tsx

import { useState } from "react";
import { useAdminGetExpertDataQuery } from "../../../slices/api/adminApiSlice";
import { IExpert } from "../../../types/domain";
import { useToggleExpertBlockedStatusMutation } from "../../../slices/api/adminApiSlice";
import Spinner from "../../../components/Spinner";
import { useDispatch } from "react-redux";
import { expertLogout } from "../../../slices/authSlice";
import Pagination from "../../../components/Pagination";

const getStatusClassName = (isBlocked: boolean): string => {
    return isBlocked ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
};

const AllExperts = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const { data, error, isLoading } = useAdminGetExpertDataQuery({ page, limit });
    const [toggleExpertBlockedStatus] = useToggleExpertBlockedStatusMutation();
    const experts = data?.data ?? [];
    const total = data?.total ?? 0;
    const totalPages = Math.ceil(total / limit);
    const dispatch = useDispatch()

    const handleButtonClick = async (expertId: string, isBlocked: boolean) => {
        try {
            if (!isBlocked) {
                console.log('isBlocked', isBlocked)
                dispatch(expertLogout())
            }
            await toggleExpertBlockedStatus({ expertId }).unwrap();
        } catch (error) {
            console.error("Failed to update expert Block status", error);
        }
    };

    const tableHeaders = ['', "Name", "Email", "Category", "Rating","Wallet", "Action"];

    const renderRow = (expert: IExpert, handleButtonClick: (expertId: string, isBlocked: boolean) => void) => (
        <>
            <td className="p-2">
                {expert.profilePic ? (
                    <img src={expert.profilePic} alt={expert.name} className="w-16 h-16 object-cover rounded" />
                ) : (
                    "No Image"
                )}
            </td>
            <td className="p-2">{expert.name}</td>
            <td className="p-2">{expert.email}</td>
            <td className="p-2">{expert.category}</td>
            <td className="p-2">{expert.rating}</td>
            <td className="p-2">{expert.wallet}</td>
            <td className="p-2">
                <button
                    onClick={() => handleButtonClick(expert._id, expert.isBlocked)}
                    className={`${getStatusClassName(expert.isBlocked)} py-1 px-2 rounded-full text-sm`}
                >
                    {expert.isBlocked ? "Unblock" : "Block"}
                </button>
            </td>
        </>
    );



    return (
        <>
            <span className="font-bold text-4xl">Expert Management</span>
            {isLoading ? (
                <Spinner />
            ) : error ? (
                <div className="font-bold text-2xl">Error loading data</div>
            ) : (
                <>
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
                                    {experts.length > 0 ? (
                                        experts.map((datum) => (
                                            <tr key={datum._id} className="border-b hover:bg-gray-50">
                                                {renderRow(datum, handleButtonClick)}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={tableHeaders.length} className="text-center p-2 font-bold text-2xl">No data found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                </>
            )}
        </>
    );
};

export default AllExperts;
