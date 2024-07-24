// frontend\src\components\expert\chat\ChatMessages.tsx

import moment from 'moment';
import { ExpertInfo } from '../../../slices/authSlice';
import { IMessage, IUser } from '../../../types/domain';

interface ChatMessagesProps {
    message: IMessage;
    expertInfo: ExpertInfo | null;
    userData: IUser | undefined;
}

const ChatMessages = ({ message, expertInfo, userData }: ChatMessagesProps) => {
    const isSender = message.senderId === expertInfo?._id;
    const avatarSrc = isSender ? expertInfo?.profilePic : userData?.profilePic;
    const avatarAlt = isSender ? 'Expert Avatar' : 'User Avatar';
    const messageClass = isSender ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800';
    const timeClass = isSender ? 'text-gray-300' : 'text-gray-500';
    
    const renderAvatar = (src: string | undefined, alt: string) => (
        <div className="w-10 h-10 bg-gray-300 rounded-full mx-2">
            <img src={src} alt={alt} className="w-10 h-10 rounded-full" />
        </div>
    );

    return (
        <div className={`flex items-start mb-4 ${isSender ? 'justify-end' : ''}`}>
            {!isSender && renderAvatar(avatarSrc, avatarAlt)}
            <div className={`p-3 rounded-lg max-w-xs ${messageClass}`}>
                <p>{message.text}</p>
                <small className={`text-xs ${timeClass}`}>
                    {moment(message.createdAt).fromNow()}
                </small>
            </div>
            {isSender && renderAvatar(avatarSrc, avatarAlt)}
        </div>
    );
};

export default ChatMessages;
