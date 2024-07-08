// frontend\src\pages\user\Appointments.tsx

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import AppointmentsCard from "../../components/user/AppointmentsCard";
import { useGetUserAppointmentsQuery } from "../../slices/api/userApiSlice";

function Appointments() {

    const { data, error, isLoading } = useGetUserAppointmentsQuery();
    const appointmentData = data?.data

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
                                time={appointment.time}
                                date={appointment.date}
                                expertId={appointment.expertId}
                            />
                        ))
                    ) : (
                        <div className="pt-5 text-3xl font-bold mb-6">No Appointments</div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Appointments