// frontend\src\components\user\chat\ContactList.tsx

import { useNavigate } from "react-router-dom";
import { useUserGetExpertDataQuery } from "../../../slices/api/userApiSlice";
import { IConversation } from "../../../types/domain";
import { useCreateConversationMutation } from "../../../slices/api/chatApiSlice";

const ContactList = ({ conversation, currentUserId, onSelectConversation }: { conversation: IConversation, currentUserId: string, onSelectConversation: () => void }) => {
    const expertId = conversation.members.find((m) => m !== currentUserId)
    const { data } = useUserGetExpertDataQuery(expertId || '');
    const expertData = data?.data

    const [createConversation] = useCreateConversationMutation();
    const navigate = useNavigate();

    const handleChat = async (receiverId: string) => {
        try {
            const res = await createConversation({
                senderId: currentUserId,
                receiverId,
            }).unwrap();
            // console.log('currentConversation in handleChat ContactList: ', res.newConversation)
            navigate("/chat", {
                state: { currentConversation: res.newConversation },
            });
            onSelectConversation();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            key={conversation._id}
            className="flex items-center mb-2 cursor-pointer hover:bg-gray-100 p-3 rounded-md transition-all duration-200 relative"
            onClick={() => handleChat(expertData?._id || '')}
        >
            <div className="relative w-14 h-14 sm:w-12 sm:h-12 bg-gray-300 rounded-full mr-3 flex-shrink-0">
                <img src={expertData?.profilePic} alt="User Avatar" className="w-full h-full rounded-full object-cover" />
                {/* {contact.isOnline && (
                    <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )} */}
            </div>
            <div className="flex-1">
                <h2 className="text-base sm:text-lg font-semibold select-none">{expertData?.name}</h2>
            </div>
        </div>
    )
}

export default ContactList;
