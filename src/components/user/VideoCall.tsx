import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZEGO_KEY } from "../../config/config";

const VideoCall = () => {
    const { roomId } = useParams<{ roomId: string }>();

    const myMeeting = async (element: HTMLDivElement) => {
       
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            1998573610,
            ZEGO_KEY,
            roomId || '',
            String(Date.now()),
            "Muhsin"
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: `http://localhost:5000/room/${roomId}`
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall
            },
            showScreenSharingButton: true
        });
    }

    return (
        <div>
            <div ref={myMeeting}></div>
        </div>
    );
};

export default VideoCall;
