// frontend\src\components\expert\AppointmentCard.tsx

// import { useNavigate } from "react-router-dom";
import { formatTimeTo12Hour } from "../../lib/utils";
import { IAppointment } from "../../types/domain";

import { ZIM } from "zego-zim-web";
import { CallInvitationEndReason, ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZEGO_KEY } from "../../config/config";
import useInvalidateAppointments from "../../hooks/useInvalidateAppointments";
import { toast } from "react-toastify";
import { useExpertUpdateAppointmentStatusMutation } from "../../slices/api/expertApiSlice";

const AppointmentCard = ({ appointment }: { appointment: IAppointment }) => {

    const invalidateAppointments = useInvalidateAppointments();
    const [updateAppointmentStatus] = useExpertUpdateAppointmentStatusMutation();
    const appointmentId = appointment._id

    const userID = appointment.expertId || '';
    const userName = appointment.expertName || '';
    const appID = 1998573610;
    const serverSecret = ZEGO_KEY;
    const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, appointment._id, userID, userName);

    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zp.addPlugins({ ZIM });

    async function invite() {
        const targetUser = {
            userID: appointment.userId || '',
            userName: appointment.userName || '',
        };

        zp.setCallInvitationConfig({
            onCallInvitationEnded: async (reason: CallInvitationEndReason) => {
                console.log('expert reason: ', reason)
                if (reason === 'LeaveRoom') {
                    try {
                        await updateAppointmentStatus({ appointmentId, status: "completed" }).unwrap();
                        console.log("Appointment status updated to completed");
                    } catch (error) {
                        console.error("Failed to update appointment status:", error);
                    }
                    invalidateAppointments(); // Invalidate cache
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




    return (
        <div className="p-6 mb-4 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
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
                    <div className="text-sm font-medium text-gray-400">Price</div>
                    <div className="text-sm md:text-2xl font-semibold text-gray-800">
                        <time>{appointment.price}</time>
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
                        // onClick={() => navigate(`/room/${appointment._id}`)}
                        onClick={() => invite()}
                    >
                        Call
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;
