// frontend\src\pages\expert\Appointments.tsx

import { formatTimeTo12Hour } from "../../lib/utils";
import { useGetAppointmentsDataQuery } from "../../slices/api/expertApiSlice";

export default function Appointments() {
    const { data, error, isLoading } = useGetAppointmentsDataQuery();
    const appointmentData = data?.data;

    console.log('appointmentData in expert page: ', appointmentData);

    const handleCallClick = () => {
        // start video call
    };

    return (
        <div className="p-1">
            <span className="font-bold text-4xl mb-6 block">Appointments</span>
            {isLoading && <p>Loading...</p>}
            {error && <p>Some Error Happened</p>}
            {appointmentData?.length === 0 && <span className="font-bold text-2xl text-gray-500 mt-4  mb-6 block">No Appointments Found</span>}
            {appointmentData && (
                <div>
                    {appointmentData.map((appointment) => (
                        <div key={appointment._id} className="p-6 mb-4 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col items-center">
                                    <div className="text-sm font-medium text-gray-400">Date</div>
                                    <div className="text-sm md:text-2xl font-semibold text-gray-800">
                                        <time>{appointment.date}</time>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-sm font-medium text-gray-400">Start Time</div>
                                    <div className="text-sm md:text-2xl font-semibold text-gray-800">
                                        <time>{formatTimeTo12Hour(appointment.startTime)}</time>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-sm font-medium text-gray-400">End Time</div>
                                    <div className="text-sm md:text-2xl font-semibold text-gray-800">
                                        <time>{formatTimeTo12Hour(appointment.endTime)}</time>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-sm font-medium text-gray-400">User Name</div>
                                    <div className="text-sm md:text-2xl font-semibold text-gray-800">
                                        <time>{appointment.userName}</time>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="ml-4 px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                                        onClick={handleCallClick}
                                    >
                                        Call
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}







{/* <div>
    <div className="text-gray-600 font-medium">#{index + 1}</div>
    <div className="text-gray-800 text-lg">
        <span className="font-medium">Date:</span> {appointment.date}
    </div>
    <div className="text-gray-800 text-lg">
        <span className="font-medium">Time:</span> {formatTimeTo12Hour(appointment.startTime)}
    </div>
    <div className="text-gray-800 text-lg">
        <span className="font-medium">User Name:</span> {appointment.userName}
    </div>
</div>
<button
    className="ml-4 px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
    onClick={handleCallClick}
>
    Call {appointment.userName}
</button> */}












// import { useGetAppointmentsDataQuery } from "../../slices/api/expertApiSlice";

// export default function Appointments() {
//     const { data, error, isLoading } = useGetAppointmentsDataQuery();
//     const appointmentData = data?.data;

//     const handleCallClick = () => {
//         // start video call
//     };

//     return (
//         <div>
//             <span className="font-bold text-4xl">Appointments</span>
//             {isLoading && <p>Loading...</p>}
//             {error && <p>Some Error Happened</p>}
//             {appointmentData && (
//                 <div>
//                     {appointmentData.map((appointment, index) => (
//                         <div key={appointment._id} className="p-6 mt-5 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 mb-4">
//                             <div className="flex mb-2">
//                                 <div className="w-24 text-gray-600 font-medium">{index + 1}</div>
//                             </div>
//                             <div className="flex mb-2">
//                                 <div className="w-24 text-gray-600 font-medium">Date:</div>
//                                 <div className="ml-2 text-gray-800 text-lg">{appointment.date}</div>
//                             </div>
//                             <div className="flex mb-2">
//                                 <div className="w-24 text-gray-600 font-medium">Time:</div>
//                                 <div className="ml-2 text-gray-800 text-lg">{appointment.startTime}</div>
//                             </div>
//                             <div className="flex mb-2">
//                                 <div className="w-24 text-gray-600 font-medium">User Name:</div>
//                                 <div className="ml-2 text-gray-800 text-lg">{appointment.userName}</div>
//                             </div>
//                             <button
//                                 className={`w-full px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
//                                 onClick={handleCallClick}
//                             >
//                                 Call {appointment.userName}
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }




// // frontend\src\pages\expert\Appointments.tsx

// import { useGetAppointmentsDataQuery } from "../../slices/api/expertApiSlice";

// export default function Appointments() {

//     const { data, error, isLoading } = useGetAppointmentsDataQuery();
//     const appointmentData = data?.data
//     console.log('appointmentData in expert page: ',appointmentData)

//     return (
//         <>
//             <span className="font-bold text-4xl">Appointments</span>
//             {/* i want to display the appointment data here */}
//         </>
//     );
// }
