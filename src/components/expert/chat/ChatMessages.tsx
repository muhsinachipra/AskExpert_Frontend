// frontend\src\components\expert\chat\ChatMessages.tsx

import moment from 'moment';
import { ExpertInfo } from '../../../slices/authSlice';
import { IMessage, IUser } from '../../../types/domain';
import { useGetFileUrlQuery } from '../../../slices/api/chatApiSlice';
import { useEffect } from 'react';
import CustomAudioPlayer from '../../CustomAudioPlayer';

interface ChatMessagesProps {
    message: IMessage;
    expertInfo: ExpertInfo | null;
    userData: IUser | undefined;
}

const ChatMessages = ({ message, expertInfo, userData }: ChatMessagesProps) => {
    const isSender = message.senderId === expertInfo?._id;
    const avatarSrc = isSender ? expertInfo?.profilePic : userData?.profilePic;
    const avatarAlt = isSender ? 'Expert Avatar' : 'User Avatar';
    const messageClass = isSender ? 'bg-indigo-200 text-black' : 'bg-white text-gray-800';
    const timeClass = isSender ? 'text-gray-600' : 'text-gray-500';

    const { data: presignedUrl, refetch } = useGetFileUrlQuery(message.imageName || message.videoName || message.audioName || '', {
        skip: !(message.imageName || message.videoName || message.audioName),
    });

    console.log('presignedUrl in frontend: ', presignedUrl)

    useEffect(() => {
        if (message.imageName || message.videoName || message.audioName) {
            refetch();
        }
    }, [message.imageName, message.videoName, message.audioName, refetch]);


    const renderAvatar = (src: string | undefined, alt: string) => (
        <div className="w-10 h-10 bg-gray-300 rounded-full mx-2">
            <img src={src} alt={alt} className="w-10 h-10 rounded-full" />
        </div>
    );

    const handleMediaClick = () => {
        if (presignedUrl) {
            window.open(presignedUrl.url, '_blank');
        }
    };

    return (
        // frontend\src\components\expert\chat\ChatMessages.tsx
        <div className={`flex items-end mb-4 ${isSender ? 'justify-end' : ''}`}>
            {!isSender && renderAvatar(avatarSrc, avatarAlt)}
            <div className={`p-2 rounded-lg max-w-[75%] sm:max-w-md ${messageClass} shadow-sm`}>

                {message.imageName && presignedUrl && (
                    <img src={presignedUrl.url} onClick={handleMediaClick} alt="Sent image" className="mt-2 max-h-40 sm:max-h-60 object-contain" />
                )}

                {message.videoName && presignedUrl && (
                    <video controls className="mt-2 max-h-40 sm:max-h-60 object-contain">
                        <source src={presignedUrl.url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}

                {message.audioName && presignedUrl && (
                    <CustomAudioPlayer audioSrc={presignedUrl.url} />
                )}

                <p className="text-sm sm:text-base break-words">{message.text}</p>
                <small className={`text-xs ${timeClass} mt-1 block`}>
                    {moment(message.createdAt).fromNow()}
                </small>
            </div>
            {isSender && renderAvatar(avatarSrc, avatarAlt)}
        </div>
    );
};

export default ChatMessages;
