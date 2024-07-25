// frontend\src\pages\user\ChatPage.tsx

import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IConversation } from "../../types/domain";
import { useGetMessageQuery, useGetConversationQuery } from "../../slices/api/chatApiSlice";
import { useUserGetExpertDataQuery } from "../../slices/api/userApiSlice";
import useSocket from "../../hooks/useSocket";

import ChatHeader from "../../components/user/chat/ChatHeader";
import ChatInput from "../../components/user/chat/ChatInput";
import ChatMessages from "../../components/user/chat/ChatMessages";
import ContactList from "../../components/user/chat/ContactList";

const ChatPage = () => {
    const socket = useSocket();
    const location = useLocation();
    const currentConversation: IConversation = location.state?.currentConversation || {} as IConversation;
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const userId = userInfo?._id || '';

    const { data: conversationData } = useGetConversationQuery(userId);
    const userConversations = conversationData?.newConversation || [];

    const { data: messageData, refetch: refetchMessages } = useGetMessageQuery({ conversationId: currentConversation._id || '000000' });
    // const messages = useMemo(() => messageData?.message || [], [messageData]);
    // const [messages, setMessages] = useState(messageData?.message || []);
    console.log('messageData?.message: ', messageData?.message || []);
    const [chatMessages, setChatMessages] = useState(messageData?.message || []);
    console.log('chatMessages: ', chatMessages);

    useEffect(() => {
        setChatMessages(messageData?.message || []);
    }, [socket, messageData]);

    const expertId = currentConversation.members?.find((m) => m !== userId) || '';
    const { data: expertD } = useUserGetExpertDataQuery(expertId);
    const expertData = expertD?.data

    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.style.scrollBehavior = "smooth";
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatMessages]);

    useEffect(() => {
        socket?.emit("addUser", userId);

        socket?.on("getMessage", (data) => {
            if (data.senderId === expertId) {
                setChatMessages((prevMessages) => [...prevMessages, data]);
                refetchMessages();
            }
        });

        return () => {
            socket?.off("getMessage");
        };
    }, [socket, userId, refetchMessages, expertId]);

    return (
        <div className="h-screen flex">
            <div className="flex flex-col w-1/4 border-r">
                <ChatHeader />
                <div className="overflow-y-auto h-screen p-2">
                    {userConversations.length > 0 ? (
                        userConversations.map((conversation) => (
                            <ContactList key={conversation._id} conversation={conversation} currentUserId={userId} />
                        ))
                    ) : (
                        <h1 className="flex items-center justify-center h-full text-lg font-semibold">No Conversations</h1>
                    )}
                </div>
            </div>
            <div className="flex flex-col w-3/4">
                {currentConversation._id ? (
                    <>
                        <div className="flex gap-5 items-center bg-white p-3 border-b">
                            <img src={expertData?.profilePic} alt="Expert Avatar" className="w-10 h-10 rounded-full" />
                            <h1 className="text-2xl font-semibold">{expertData?.name || "Expert_Name"}</h1>
                        </div>
                        <div className="flex-grow overflow-y-scroll p-4 bg-zinc-200" ref={scrollRef}>
                            {chatMessages.map((message) => (
                                <ChatMessages key={message._id} message={message} userInfo={userInfo} expertData={expertData} />
                            ))}
                        </div>
                        <div className="bg-white p-4 border-t">
                            <ChatInput userInfo={userInfo} currentConversation={currentConversation} />
                        </div>
                    </>
                ) : (
                    <h1 className="flex items-center justify-center h-full text-lg font-semibold">Select a conversation</h1>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
