import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import UserHeader from "../../components/user/UserHeader";
import Spinner from "../../components/Spinner";
import AppointmentsCard from "../../components/user/AppointmentsCard";
import { useGetUserAppointmentsQuery } from "../../slices/api/userApiSlice";
import Pagination from "../../components/Pagination";

function Appointments() {
    const [page, setPage] = useState(1);
    const [limit] = useState(4);
    const [viewMode, setViewMode] = useState('booked'); // 'booked' or 'history'
    const { data, error, isLoading, refetch } = useGetUserAppointmentsQuery({ page, limit });
    const appointmentData = data?.data
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / limit)

    // Use refetch when the component mounts
    useEffect(() => {
        refetch();
    }, [refetch]);

    const filteredAppointments = appointmentData?.filter(appointment =>
        viewMode === 'history' ? appointment.appointmentStatus !== 'booked' : appointment.appointmentStatus === 'booked'
    );

    return (
        <>
            <UserHeader />
            <div className="container mx-auto mt-10 min-h-[100vh]">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-4xl font-bold">Appointments</div>
                    <button
                        onClick={() => setViewMode(viewMode === 'booked' ? 'history' : 'booked')}
                        // className={`px-4 py-2 rounded-full ${viewMode === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        className={"px-4 py-2 rounded-full bg-blue-500 text-white"}
                    >
                        {viewMode === 'history' ? 'Show Booked Appointments' : 'Show Appointment History'}
                    </button>
                </div>
                <div className="space-y-4">
                    {isLoading && <Spinner />}
                    {error && <div className="pt-5 text-2xl font-bold mb-6">Error loading Data</div>}
                    {filteredAppointments && filteredAppointments.length > 0 ? (
                        filteredAppointments.map((appointment) => (
                            <AppointmentsCard
                                key={appointment._id}
                                appointment={appointment}
                            />
                        ))
                    ) : (
                        <div className="pt-5 text-3xl font-bold mb-6">No Appointments</div>
                    )}
                </div>
                {
                    filteredAppointments?.length !== 0 &&
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                }
            </div>
            <Footer />
        </>
    );
}

export default Appointments;
