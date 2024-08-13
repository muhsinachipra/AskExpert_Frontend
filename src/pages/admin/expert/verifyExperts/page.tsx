// frontend/src/pages/admin/expert/verifyExperts/page.tsx

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAdminGetExpertDataQuery, useSendVerifiedEmailMutation, useUpdateExpertVerificationMutation } from "../../../../slices/api/adminApiSlice";
import { setExpertCredential } from "../../../../slices/authSlice";
import { IExpert } from "../../../../types/domain";
import AdminTable from "../../../../components/admin/Table";
import { Link } from "react-router-dom";
import Pagination from "../../../../components/Pagination";

const getStatusClassName = (isVerified: boolean): string => {
    return isVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
};

const VerifyExperts = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const { data, error, isLoading } = useAdminGetExpertDataQuery({ page, limit });
    const [sendVerifiedEmail] = useSendVerifiedEmailMutation();
    const [updateExpertVerification] = useUpdateExpertVerificationMutation();
    const dispatch = useDispatch();
    const experts = data?.data ?? [];
    const total = data?.total ?? 0;
    const totalPages = Math.ceil(total / limit);

    const handleButtonClick = async (expertId: string, isVerified: boolean) => {
        try {
            const res = await updateExpertVerification({ expertId, isVerified: !isVerified });
            if (!isVerified) {
                await sendVerifiedEmail({ expertId });
                const newres = res.data?.data;
                dispatch(setExpertCredential({ ...newres }));
            }
        } catch (error) {
            console.error("Failed to update expert verification status", error);
        }
    };

    const tableHeaders = ["Name", "Email", "Resume", "Category", "Experience", "Rate", "Verified"];

    const renderRow = (expert: IExpert, handleButtonClick: (expertId: string, isVerified: boolean) => void) => (
        <>
            <td className="p-2">{expert.name}</td>
            <td className="p-2">{expert.email}</td>
            <td className="p-2 max-w-xs truncate">
                <Link to={`${expert.resume}`} target="_blank" className="text-blue-600 hover:underline ellipsis">
                    Link
                </Link>
            </td>
            <td className="p-2">{expert.category}</td>
            <td className="p-2">{expert.experience} years</td>
            <td className="p-2">{expert.mobile}</td>
            <td className="p-2">
                <button
                    onClick={() => handleButtonClick(expert._id, expert.isVerified)}
                    className={`${getStatusClassName(expert.isVerified)} py-1 px-2 rounded-full text-sm`}
                >
                    {expert.isVerified ? "Verified" : "Unverified"}
                </button>
            </td>
        </>
    );

    return (
        <>
            <span className="font-bold text-4xl">Verify Experts</span>
            <AdminTable<IExpert>
                data={experts}
                isLoading={isLoading}
                error={error}
                handleButtonClick={handleButtonClick}
                tableHeaders={tableHeaders}
                renderRow={renderRow}
            />
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
    );
};

export default VerifyExperts;
