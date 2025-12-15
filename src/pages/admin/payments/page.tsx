// frontend\src\pages\admin\payments\page.tsx

import { useState } from "react";
import Spinner from "../../../components/Spinner";
import { useAdminGetAppointmentDataQuery } from "../../../slices/api/adminApiSlice";
import { IAppointment } from "../../../types/domain";
import Pagination from "../../../components/Pagination";

function Payments() {
    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const { data, error, isLoading } = useAdminGetAppointmentDataQuery({ page, limit });
    const payments = data?.data ?? [];
    const total = data?.total ?? 0;
    const totalPages = Math.ceil(total / limit);

    const tableHeaders = ["Payment Id", "User", "Expert", "Method", "Status", "Amount"];

    const renderRow = (payment: IAppointment) => {
        const paymentMethod = payment.paymentId.startsWith("wa_") ? "Wallet" : "Stripe";
        return (
            <tr key={payment._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{payment.paymentId}</td>
                <td className="p-2">{payment.userName}</td>
                <td className="p-2">{payment.expertName}</td>
                <td className="p-2">{paymentMethod}</td>
                <td className="p-2">{payment.paymentStatus}</td>
                <td className="p-2">{payment.price}</td>
            </tr>
        );
    };

    return (
        <>
            <span className="font-bold text-4xl">Payments</span>
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
                            {isLoading &&
                                <tr><td colSpan={tableHeaders.length} className="text-center p-2"><Spinner /></td></tr>
                            }
                            {error &&
                                <tr><td colSpan={tableHeaders.length} className="text-center text-red-600 p-2">Error loading data</td></tr>
                            }
                            {payments.length > 0 ? (
                                payments.map((payment) => renderRow(payment))
                            ) : (
                                <tr>
                                    <td colSpan={tableHeaders.length} className="text-center p-2">No data found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
    )
}

export default Payments
