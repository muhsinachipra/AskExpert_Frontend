// frontend\src\components\expert\chat\ChatMessages.tsx

import moment from 'moment';
import { ExpertInfo } from '../../../slices/authSlice';
import { IUser, IMessage } from '../../../types/domain';
import CustomAudioPlayer from '../../CustomAudioPlayer';

interface ChatMessagesProps {
    message: IMessage;
    expertInfo: ExpertInfo | null;
    userData: IUser | undefined;
}

const ChatMessages = ({ message, expertInfo, userData }: ChatMessagesProps) => {
    const isSender = message.senderId === expertInfo?._id;
    const avatarSrc = isSender ? expertInfo?.profilePic : userData?.profilePic;
    const avatarAlt = isSender ? 'User Avatar' : 'Expert Avatar';
    const messageClass = isSender ? 'bg-indigo-200 text-black' : 'bg-white text-gray-800';
    const timeClass = isSender ? 'text-gray-600' : 'text-gray-500';

    const renderAvatar = (src: string | undefined, alt: string) => (
        <div className="w-10 h-10 bg-gray-300 rounded-full mx-2">
            <img src={src} alt={alt} className="w-10 h-10 rounded-full" />
        </div>
    );

    const handleMediaClick = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <div className={`flex items-end mb-4 ${isSender ? 'justify-end' : ''}`}>
            {!isSender && renderAvatar(avatarSrc, avatarAlt)}
            <div className={`p-2 rounded-lg max-w-[75%] sm:max-w-md ${messageClass} shadow-sm`}>
                {message.imageName && (
                    <img
                        src={message.imageName}
                        onClick={() => message.imageName && handleMediaClick(message.imageName)}
                        alt="Sent image"
                        className="mt-2 max-h-40 sm:max-h-60 object-contain cursor-pointer"
                    />
                )}
                {message.videoName && (
                    <video controls className="mt-2 max-h-40 sm:max-h-60 object-contain">
                        <source src={message.videoName} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
                {message.audioName && (
                    <CustomAudioPlayer audioSrc={message.audioName} />
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




