// frontend\src\pages\admin\report\ReportDetails.tsx

import { useParams } from 'react-router-dom';
import { useGetReportsByExpertIdQuery } from '../../../slices/api/adminApiSlice';
import Spinner from '../../../components/Spinner';
import { useState } from 'react';
import Pagination from '../../../components/Pagination';

const ReportDetails = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const { expertId } = useParams();
    const { data, error, isLoading } = useGetReportsByExpertIdQuery({ expertId: expertId || '', page, limit });
    const total = data?.total ?? 0;
    const totalPages = Math.ceil(total / limit);

    if (isLoading) return <Spinner />;
    if (error) return <div className="font-bold text-2xl">Error loading reports</div>;

    const reports = data?.data || [];

    const tableHeaders = ["ID", "Reporting User","Expert Name", "Date", "Reason"];

    return (
        <>
            <span className="font-bold text-4xl mb-4">Reports for Expert</span>
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
                            {reports.length > 0 ? (
                                reports.map((report) => (
                                    <tr key={report._id} className="border-b hover:bg-gray-50">
                                        <td className="p-2">{report._id}</td>
                                        <td className="p-2">{report.userId?.name}</td>
                                        <td className="p-2">{report.expertId?.name}</td>
                                        <td className="p-2">{new Date(report.createdAt).toLocaleDateString()}</td>
                                        <td className="p-2">{report.reason}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={tableHeaders.length} className="text-center p-2 font-bold text-2xl">No reports found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {totalPages > 1 && <Pagination page={page} totalPages={totalPages} setPage={setPage} />}
        </>
    );
};

export default ReportDetails;
