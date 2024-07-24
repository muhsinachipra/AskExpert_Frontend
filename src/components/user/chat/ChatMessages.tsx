// frontend\src\components\user\chat\ChatMessages.tsx

import moment from 'moment';
import { UserInfo } from '../../../slices/authSlice';
import { IMessage } from '../../../types/domain';

const ChatMessages = ({ message, userInfo }: { message: IMessage, userInfo: UserInfo | null }) => {

    return (
        <div className={`flex items-start mb-4 ${message.senderId !== userInfo?._id ? 'justify-end' : ''}`}>
            {message.senderId === userInfo?._id && (
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3">
                    <img src={userInfo.profilePic} alt="User Avatar" className="w-10 h-10 rounded-full" />
                </div>
            )}
            <div className={`p-3 rounded-lg max-w-xs ${message.senderId !== userInfo?._id ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'}`}>
                <p>{message.text}</p>
                <small className={`text-xs ${message.senderId === userInfo?._id ? 'text-gray-500' : 'text-gray-300'}`}>
                    {moment(message.createdAt).fromNow()}
                </small>
            </div>
            {message.senderId !== userInfo?._id && (
                <div className="w-10 h-10 bg-gray-300 rounded-full ml-3">
                    <img src={userInfo?.profilePic} alt="User Avatar" className="w-10 h-10 rounded-full" />
                </div>
            )}
        </div>
    );
};

export default ChatMessages;
