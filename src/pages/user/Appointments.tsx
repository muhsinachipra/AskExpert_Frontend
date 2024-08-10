import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import UserHeader from "../../components/user/UserHeader";
import Spinner from "../../components/Spinner";
import AppointmentsCard from "../../components/user/AppointmentsCard";
import { useGetUserAppointmentsQuery, useGetUserAppointmentsHistoryQuery } from "../../slices/api/userApiSlice";
import Pagination from "../../components/Pagination";

function Appointments() {
    const [page, setPage] = useState(1);
    const [limit] = useState(4);
    const [viewMode, setViewMode] = useState('booked'); // 'booked' or 'history'

    // Conditionally use the appropriate query based on viewMode
    const queryFn = viewMode === 'booked'
        ? useGetUserAppointmentsQuery
        : useGetUserAppointmentsHistoryQuery;

    const { data, error, isLoading, refetch } = queryFn({ page, limit });
    const appointmentData = data?.data;
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / limit);

    // Use refetch when viewMode or page changes
    useEffect(() => {
        refetch();
    }, [refetch, viewMode, page]);

    return (
        <>
            <UserHeader />
            <div className="container mx-auto mt-10 min-h-[100vh] px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <div className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-0">
                        Appointments
                    </div>
                    <button
                        onClick={() => {
                            setViewMode(viewMode === 'booked' ? 'history' : 'booked');
                            setPage(1); // Reset to the first page when switching modes
                        }}
                        className="px-4 py-2 rounded-full bg-blue-500 text-white w-full sm:w-auto"
                    >
                        {viewMode === 'history' ? 'Show Booked Appointments' : 'Show Appointment History'}
                    </button>
                </div>
                <div className="space-y-4">
                    {isLoading && <Spinner />}
                    {error && <div className="pt-5 text-xl sm:text-2xl font-bold mb-6">Error loading Data</div>}
                    {appointmentData && appointmentData.length > 0 ? (
                        appointmentData.map((appointment) => (
                            <AppointmentsCard
                                key={appointment._id}
                                appointment={appointment}
                            />
                        ))
                    ) : (
                        <div className="pt-5 text-xl sm:text-3xl font-bold mb-6">No Appointments</div>
                    )}
                </div>
                <div className="mb-5">
                    {appointmentData?.length !== 0 &&
                        <Pagination page={page} totalPages={totalPages} setPage={setPage} />}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Appointments;
