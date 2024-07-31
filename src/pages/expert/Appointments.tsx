// frontend\src\pages\expert\Appointments.tsx

import { useEffect } from "react";
import AppointmentCard from "../../components/expert/AppointmentCard";
import { useGetAppointmentsDataQuery } from "../../slices/api/expertApiSlice";

export default function Appointments() {
    const { data, error, isLoading, refetch } = useGetAppointmentsDataQuery();
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
                <div>
                    {appointmentData.map((appointment) => (
                        <AppointmentCard
                            key={appointment._id}
                            appointment={appointment}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
