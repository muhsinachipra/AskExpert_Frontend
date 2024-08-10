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
    const appointmentId = appointment._id;

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
        <div className="p-4 mb-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
            <div className="grid grid-cols-2 gap-y-2 md:flex md:flex-row md:justify-between md:items-center md:space-x-4">
                <div className="flex flex-col">
                    <div className="text-xs font-medium text-gray-400">Date</div>
                    <div className="text-sm md:text-lg font-semibold text-gray-800">
                        <time>{appointment.date}</time>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="text-xs font-medium text-gray-400">Start Time</div>
                    <div className="text-sm md:text-lg font-semibold text-gray-800">
                        <time>{formatTimeTo12Hour(appointment.startTime)}</time>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="text-xs font-medium text-gray-400">End Time</div>
                    <div className="text-sm md:text-lg font-semibold text-gray-800">
                        <time>{formatTimeTo12Hour(appointment.endTime)}</time>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="text-xs font-medium text-gray-400">Price</div>
                    <div className="text-sm md:text-lg font-semibold text-gray-800">
                        <time>{appointment.price}</time>
                    </div>
                </div>
                <div className="flex flex-col col-span-2 md:col-auto">
                    <div className="text-xs font-medium text-gray-400">User Name</div>
                    <div className="text-sm md:text-lg font-semibold text-gray-800">
                        <time>{appointment.userName}</time>
                    </div>
                </div>
                <div className="flex justify-end col-span-2 md:col-auto">
                    <button
                        className="w-full md:w-auto px-4 py-2 text-sm text-white font-semibold rounded-md shadow transition-colors duration-200 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
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
