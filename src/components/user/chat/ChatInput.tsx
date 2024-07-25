// frontend\src\components\user\chat\ChatInput.tsx

import { useState } from "react";
import { useSendMessageMutation } from "../../../slices/api/chatApiSlice";
import { UserInfo } from "../../../slices/authSlice";
import { IConversation } from "../../../types/domain";
import useSocket from "../../../hooks/useSocket";
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiGrin } from "react-icons/bs";

interface ChatInputProps {
    userInfo: UserInfo | null;
    currentConversation: IConversation;
}

const ChatInput = ({ userInfo, currentConversation }: ChatInputProps) => {
    const socket = useSocket();
    const [sendMessage] = useSendMessageMutation();
    const [chatText, setChatText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const sendChat = async () => {
        if (!userInfo || !currentConversation._id) {
            console.error("User info or conversation ID is missing");
            return;
        }
        const receiverId = currentConversation.members.find((member) => member !== userInfo._id);
        if (!receiverId) {
            console.error("Receiver ID not found");
            return;
        }

        try {
            const message = {
                conversationId: currentConversation._id,
                senderId: userInfo._id,
                receiverId,
                text: chatText,
            };

            // Send message through API
            await sendMessage(message).unwrap();

            // Emit message through socket
            socket?.emit("sendMessage", message);

            setChatText("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleEmojiClick = (emojiObject: { emoji: string; }) => {
        const { emoji } = emojiObject;
        setChatText((prevText) => prevText + emoji);
        setShowEmojiPicker(false);
    };

    return (
        <div className="flex items-center">
            <div className="relative">
                <BsEmojiGrin
                    className="text-[24px] mr-3 text-[#9BA3AF]"
                    onClick={() => setShowEmojiPicker((val) => !val)}
                />
                {showEmojiPicker && (
                    <div className="absolute bottom-full mb-2">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                )}
            </div>
            <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 bg-zinc-200 rounded-lg focus:outline-none focus:border-indigo-600"
                onChange={(e) => setChatText(e.target.value)}
                value={chatText}
            />
            <button onClick={sendChat} className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-lg" disabled={!chatText.trim()}>
                Send
            </button>
        </div>
    );
};

export default ChatInput;
