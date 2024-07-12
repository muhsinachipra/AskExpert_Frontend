// frontend\src\components\user\AppointmentsCard.tsx

import { useEffect, useState } from "react";

interface AppointmentsCardProps {
    startTime: string;
    endTime: string;
    date: string;
    expertName: string;
    expertCategory: string;
}

const AppointmentsCard = ({ startTime, endTime, date, expertName, expertCategory }: AppointmentsCardProps) => {

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        const appointmentDateTime = new Date(`${date} ${startTime}`);
        const interval = setInterval(() => {
            const now = new Date();
            if (now >= appointmentDateTime) {
                setIsButtonEnabled(true);
                clearInterval(interval);
            }
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, [date, startTime]);

    const handleCallClick = () => {
        // start video call
    };

    return (
        <div className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex items-center justify-between space-x-6">
            <div className="flex flex-col items-start">
                <div className="text-gray-600">{date}</div>
                <div className="font-bold text-lg">{startTime} - {endTime}</div>
            </div>
            <div className="flex flex-col items-start">
                <div className="text-gray-600">Expert Name</div>
                <div className="font-bold text-lg">{expertName}</div>
            </div>
            <div className="flex flex-col items-start">
                <div className="text-gray-600">Expertise</div>
                <div className="font-bold text-lg">{expertCategory}</div>
            </div>
            <button
                className={`w-24 px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 ${isButtonEnabled
                    ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75'
                    : 'bg-gray-400 cursor-not-allowed'
                    }`}
                onClick={handleCallClick}
                disabled={!isButtonEnabled}
            >
                Call
            </button>
        </div>
    );
};

export default AppointmentsCard;
