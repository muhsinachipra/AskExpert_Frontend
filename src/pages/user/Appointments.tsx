// frontend\src\pages\user\Appointments.tsx

import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import AppointmentsCard from "../../components/user/AppointmentsCard";
import { useGetUserAppointmentsQuery } from "../../slices/api/userApiSlice";
import Pagination from "../../components/Pagination";

function Appointments() {
    const [page, setPage] = useState(1);
    const [limit] = useState(4);
    const { data, error, isLoading, refetch } = useGetUserAppointmentsQuery({ page, limit });
    const appointmentData = data?.data
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / limit)

    // Use refetch when the component mounts
    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <>
            <Header />
            <div className="container mx-auto mt-10 min-h-[100vh]">
                <div className="text-4xl font-bold mb-6">Appointments</div>
                <div className="space-y-4">
                    {isLoading && <Spinner />}
                    {error && <div className="pt-5 text-2xl font-bold mb-6">Error loading Data</div>}
                    {appointmentData && appointmentData.length > 0 ? (
                        appointmentData.map((appointment) => (
                            <AppointmentsCard
                                key={appointment._id}
                                appointment={appointment}
                            />
                        ))
                    ) : (
                        <div className="pt-5 text-3xl font-bold mb-6">No Appointments</div>
                    )}
                </div>
                <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            </div>
            <Footer />
        </>
    );
}

export default Appointments
