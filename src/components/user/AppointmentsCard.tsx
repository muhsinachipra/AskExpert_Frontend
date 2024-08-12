// frontend\src\components\user\AppointmentsCard.tsx

import { useEffect, useState } from "react";
import { useCancelAppointmentMutation, useUpdateAppointmentStatusMutation } from "../../slices/api/userApiSlice";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { toast } from 'react-toastify';
import { IAppointment } from "../../types/domain";
import { formatTimeTo12Hour } from '../../lib/utils';
import useInvalidateAppointments from "../../hooks/useInvalidateAppointments";
import { ZIM } from "zego-zim-web";
import { CallInvitationEndReason, ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate } from "react-router-dom";


const AppointmentsCard = ({ appointment }: { appointment: IAppointment }) => {

    const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APPID);
    const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SECRET;

    const MySwal = withReactContent(Swal);
    const navigate = useNavigate()
    const [updateAppointmentStatus] = useUpdateAppointmentStatusMutation();
    const invalidateAppointments = useInvalidateAppointments();


    const startTime = formatTimeTo12Hour(appointment.startTime);
    const endTime = formatTimeTo12Hour(appointment.endTime);
    const date = appointment.date;
    const expertCategory = appointment.expertCategory;
    const appointmentId = appointment._id;
    const appointmentStatus = appointment.appointmentStatus;
    const expertId = appointment.expertId;
    const expertName = appointment.expertName;
    const userId = appointment.userId || '';
    const userName1 = appointment.userName || '';
    
    const userID = userId;
    const userName = userName1;
    const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, appointmentId, userID, userName);
    
    // console.log('appID: ', appID, 'serverSecret: ', serverSecret)
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zp.addPlugins({ ZIM });

    async function invite() {

        const targetUser = {
            userID: expertId,
            userName: expertName
        };

        zp.setCallInvitationConfig({
            onCallInvitationEnded: async (reason: CallInvitationEndReason) => {
                console.log('user reason: ', reason)
                if (reason === 'LeaveRoom') {
                    try {
                        await updateAppointmentStatus({ appointmentId, status: "completed" }).unwrap();
                        console.log("Appointment status updated to completed");
                    } catch (error) {
                        console.error("Failed to update appointment status:", error);
                    }
                    invalidateAppointments(); // Invalidate cache
                    navigate(`/review/${appointmentId}`);
                } else {
                    toast.error(`Call ${reason}`)
                }
            },

            // The caller will receive the notification through this callback when the callee accepts the call invitation. 
            onOutgoingCallAccepted: async () => {
                try {
                    await updateAppointmentStatus({ appointmentId, status: "completed" }).unwrap();
                    console.log("Appointment status updated to completed");
                } catch (error) {
                    console.error("Failed to update appointment status:", error);
                }
            },

        });

        try {
            const res = await zp.sendCallInvitation({
                callees: [targetUser],
                callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
                timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
            });
            console.warn(res);
        } catch (err) {
            console.warn(err);
        }
    }

    const [cancelAppointment] = useCancelAppointmentMutation();
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [isCancelled, setIsCancelled] = useState(appointmentStatus === 'cancelled');

    useEffect(() => {
        const appointmentDateTime = new Date(`${date} ${startTime}`);
        const interval = setInterval(() => {
            const now = new Date();
            if (now >= appointmentDateTime) {
                setIsButtonEnabled(true);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [date, startTime]);

    const handleCancel = async () => {
        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Cancel!',
            cancelButtonText: 'No, revert!',
        });

        if (result.isConfirmed) {
            try {
                await cancelAppointment(appointmentId).unwrap();
                setIsCancelled(true);
                toast.success('Appointment cancelled successfully');
                toast.success('Amount refunded to Wallet');
            } catch (error) {
                console.log(error);
                toast.error('Failed to cancel appointment');
            }
        }
    };

    return (
        <div className="p-4 sm:p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex flex-col items-start w-full sm:w-auto">
                <div className="text-gray-600 text-sm">{date}</div>
                <div className="font-bold text-base sm:text-lg">{startTime} - {endTime}</div>
            </div>
            <div className="flex flex-col items-start w-full sm:w-auto">
                <div className="text-gray-600 text-sm">Expert Name</div>
                <div className="font-bold text-base sm:text-lg">{expertName}</div>
            </div>
            <div className="flex flex-col items-start w-full sm:w-auto">
                <div className="text-gray-600 text-sm">Expertise</div>
                <div className="font-bold text-base sm:text-lg">{expertCategory}</div>
            </div>
            {appointmentStatus === 'completed' ? (
                <div className="font-bold text-base sm:text-lg text-green-600 w-full sm:w-auto">Completed</div>
            ) : isCancelled ? (
                <div className="font-bold text-base sm:text-lg text-red-600 w-full sm:w-auto">Cancelled</div>
            ) : (
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                    <button
                        className={`w-full sm:w-24 px-4 sm:px-6 py-2 sm:py-3 text-white font-semibold text-sm sm:text-base rounded-lg shadow-md transition-colors duration-200 ${isCancelled
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75'
                            }`}
                        onClick={handleCancel}
                        disabled={isCancelled}
                    >
                        {isCancelled ? 'Cancelled' : 'Cancel'}
                    </button>
                    <button
                        className={`w-full sm:w-24 px-4 sm:px-6 py-2 sm:py-3 text-white font-semibold text-sm sm:text-base rounded-lg shadow-md transition-colors duration-200 ${isButtonEnabled
                                ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75'
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        disabled={!isButtonEnabled}
                        onClick={() => invite()}
                    >
                        Call
                    </button>
                </div>
            )}
        </div>
    );
};

export default AppointmentsCard;
