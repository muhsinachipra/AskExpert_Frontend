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
