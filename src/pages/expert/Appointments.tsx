// frontend\src\pages\expert\Appointments.tsx

import { useEffect, useState } from "react";
import AppointmentCard from "../../components/expert/AppointmentCard";
import { useGetAppointmentsDataQuery } from "../../slices/api/expertApiSlice";
import Pagination from "../../components/Pagination";

export default function Appointments() {
    const [page, setPage] = useState(1);
    const [limit] = useState(4);
    const { data, error, isLoading, refetch } = useGetAppointmentsDataQuery({ page, limit });
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / limit);
    const appointmentData = data?.data;

    // Use refetch when the component mounts
    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <div className="p-1">
            <span className="font-bold text-4xl mb-6 block">Appointments</span>
            {isLoading && <p>Loading...</p>}
            {error && <p>Some Error Happened</p>}
            {appointmentData?.length === 0 && <span className="font-bold text-2xl text-gray-500 mt-4  mb-6 block">No Appointments Found</span>}
            {appointmentData && (
                <>
                    <div>
                        {appointmentData.map((appointment) => (
                            <AppointmentCard
                                key={appointment._id}
                                appointment={appointment}
                            />
                        ))}
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                    </div>
                </>
            )}
        </div>
    );
}
