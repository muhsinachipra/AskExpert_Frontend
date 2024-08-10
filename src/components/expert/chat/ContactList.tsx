// frontend\src\components\expert\chat\ContactList.tsx

import { useNavigate } from "react-router-dom";
import { IConversation } from "../../../types/domain";
import { useCreateConversationMutation } from "../../../slices/api/chatApiSlice";
import { useExpertGetUserDataQuery } from "../../../slices/api/expertApiSlice";

const ContactList = ({ conversation, currentExpertId, onSelectConversation }: { conversation: IConversation, currentExpertId: string, onSelectConversation: () => void }) => {
    const userId = conversation.members.find((m) => m !== currentExpertId);
    const { data } = useExpertGetUserDataQuery(userId || '');
    const userData = data?.data;

    const [createConversation] = useCreateConversationMutation();
    const navigate = useNavigate();

    const handleChat = async (receiverId: string) => {
        try {
            const res = await createConversation({
                senderId: currentExpertId,
                receiverId,
            }).unwrap();
            navigate("/expert/chat", {
                state: { currentConversation: res.newConversation },
            });
            onSelectConversation(); // Call this when a conversation is selected
        } catch (error) {
            console.error(error);
        }
    };

    return (
        // frontend\src\components\expert\chat\ContactList.tsx
        <div
            key={conversation._id}
            className="flex items-center mb-2 cursor-pointer hover:bg-gray-100 p-3 rounded-md transition-all duration-200 relative"
            onClick={() => handleChat(userData?._id || '')}
        >
            <div className="relative w-14 h-14 sm:w-12 sm:h-12 bg-gray-300 rounded-full mr-3 flex-shrink-0">
                <img src={userData?.profilePic} alt="User Avatar" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="flex-1">
                <h2 className="text-base sm:text-lg font-semibold select-none">{userData?.name}</h2>
            </div>
        </div>
    );
}

export default ContactList;
