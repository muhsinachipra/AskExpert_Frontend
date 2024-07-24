// frontend\src\components\user\chat\ChatMessages.tsx

import moment from 'moment';
import { UserInfo } from '../../../slices/authSlice';
import { IExpert, IMessage } from '../../../types/domain';

interface ChatMessagesProps {
    message: IMessage;
    userInfo: UserInfo | null;
    expertData: IExpert | undefined;
}

const ChatMessages = ({ message, userInfo, expertData }: ChatMessagesProps) => {
    const isSender = message.senderId === userInfo?._id;
    const avatarSrc = isSender ? userInfo?.profilePic : expertData?.profilePic;
    const avatarAlt = isSender ? 'User Avatar' : 'Expert Avatar';
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
