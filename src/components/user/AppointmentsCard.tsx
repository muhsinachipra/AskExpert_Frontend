// frontend\src\components\user\AppointmentsCard.tsx

import { useUserGetExpertDataQuery } from "../../slices/api/userApiSlice";
import { useEffect, useState } from "react";

interface AppointmentsCardProps {
    time: string;
    date: string;
    expertId: string;
}

const AppointmentsCard = ({ time, date, expertId }: AppointmentsCardProps) => {

    const { data } = useUserGetExpertDataQuery(expertId);
    const expert = data?.data;

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        const appointmentDateTime = new Date(`${date}T${time}`);
        const now = new Date();

        if (now >= appointmentDateTime) {
            setIsButtonEnabled(true);
        } else {
            const timeout = appointmentDateTime.getTime() - now.getTime();
            const timerId = setTimeout(() => {
                setIsButtonEnabled(true);
            }, timeout);
            return () => clearTimeout(timerId);
        }
    }, [date, time]);

    const handleCallClick = () => {
        // start video call
    };

    return (
        <div className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex">
            <div className="flex-grow">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Appointment</h2>
                </div>
                <div className="flex mb-2">
                    <div className="w-24 text-gray-600 font-medium">Date:</div>
                    <div className="ml-2 text-gray-800 text-lg">{date}</div>
                </div>
                <div className="flex mb-2">
                    <div className="w-24 text-gray-600 font-medium">Time:</div>
                    <div className="ml-2 text-gray-800 text-lg">{time}</div>
                </div>
                {expert && (
                    <div className="flex mb-2">
                        <div className="w-24 text-gray-600 font-medium">Expert:</div>
                        <div className="ml-2 text-gray-800 text-lg">{expert.name}</div>
                    </div>
                )}
                {expert && (
                    <div className="flex mb-4">
                        <div className="w-24 text-gray-600 font-medium">Specialty:</div>
                        <div className="ml-2 text-gray-800 text-lg">{expert.category}</div>
                    </div>
                )}
            </div>
            <div className="flex-shrink-0 flex items-center">
                {expert && (
                    <button
                        className={`w-full px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 ${isButtonEnabled ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75' : 'bg-gray-400 cursor-not-allowed'}`}
                        onClick={handleCallClick}
                        disabled={!isButtonEnabled}
                    >
                        Call {expert.name}
                    </button>
                )}
            </div>
        </div>
    );
};

export default AppointmentsCard;



// // frontend\src\components\user\AppointmentsCard.tsx

// import { useUserGetExpertDataQuery } from "../../slices/api/userApiSlice";

// interface AppointmentsCardProps {
//     time: string;
//     date: string;
//     expertId: string;
// }

// const AppointmentsCard = ({ time, date, expertId }: AppointmentsCardProps) => {

//     const { data } = useUserGetExpertDataQuery(expertId);
//     const expert = data?.data;

//     const handleCallClick = () => {
//         // start video call
//     };

//     return (
//         <div className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex">
//             <div className="flex-grow">
//                 <div className="mb-4">
//                     <h2 className="text-2xl font-bold text-gray-800">Appointment</h2>
//                 </div>
//                 <div className="mb-2">
//                     <span className="block text-gray-600 font-medium">Date:</span>
//                     <span className="block text-gray-800 text-lg">{date}</span>
//                 </div>
//                 <div className="mb-2">
//                     <span className="block text-gray-600 font-medium">Time:</span>
//                     <span className="block text-gray-800 text-lg">{time}</span>
//                 </div>
//                 {expert && (
//                     <>
//                         <div className="mb-2">
//                             <span className="block text-gray-600 font-medium">Expert:</span>
//                             <span className="block text-gray-800 text-lg">{expert.name}</span>
//                         </div>
//                         <div className="mb-4">
//                             <span className="block text-gray-600 font-medium">Specialty:</span>
//                             <span className="block text-gray-800 text-lg">{expert.category}</span>
//                         </div>
//                     </>
//                 )}
//             </div>
//             <div className="flex-shrink-0 flex items-center">
//                 {expert && (
//                     <button
//                         className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200"
//                         onClick={handleCallClick}
//                     >
//                         Call {expert.name}
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AppointmentsCard;
