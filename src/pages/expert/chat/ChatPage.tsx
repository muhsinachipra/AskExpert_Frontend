// frontend\src\pages\expert\chat\ChatPage.tsx

import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { IConversation } from "../../../types/domain";
import { useGetMessageQuery, useGetConversationQuery } from "../../../slices/api/chatApiSlice";
import { useExpertGetUserDataQuery } from "../../../slices/api/expertApiSlice";

import ChatHeader from "../../../components/expert/chat/ChatHeader";
import ChatInput from "../../../components/expert/chat/ChatInput";
import ChatMessages from "../../../components/expert/chat/ChatMessages";
import ContactList from "../../../components/expert/chat/ContactList";

const ChatPage = () => {
    const location = useLocation();
    const currentConversation: IConversation = location.state?.currentConversation || {} as IConversation;
    const { expertInfo } = useSelector((state: RootState) => state.auth);
    const expertId = expertInfo?._id || '';

    const { data: conversationData } = useGetConversationQuery(expertId);
    const expertConversations = conversationData?.newConversation || [];

    const { data: messageData } = useGetMessageQuery({ conversationId: currentConversation._id || '000000' });
    const messages = useMemo(() => messageData?.message || [], [messageData]);

    const userId = currentConversation.members?.find((m) => m !== expertId) || '';
    const { data: userD } = useExpertGetUserDataQuery(userId);
    const userData = userD?.data

    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.style.scrollBehavior = "smooth";
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="h-screen flex">
            <div className="flex flex-col w-1/4 border-r">
                <ChatHeader />
                <div className="overflow-y-auto h-screen p-2">
                    {expertConversations.length > 0 ? (
                        expertConversations.map((conversation) => (
                            <ContactList key={conversation._id} conversation={conversation} currentExpertId={expertId} />
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
                            <img src={userData?.profilePic} alt="Expert Avatar" className="w-10 h-10 rounded-full" />
                            <h1 className="text-2xl font-semibold">{userData?.name || "Expert_Name"}</h1>
                        </div>
                        <div className="flex-grow overflow-y-scroll p-3 bg-zinc-200" ref={scrollRef}>
                            {messages.map((message) => (
                                <ChatMessages key={message._id} message={message} expertInfo={expertInfo} userData={userData} />
                            ))}
                        </div>
                        <div className="bg-white p-4 border-t">
                            <ChatInput expertInfo={expertInfo} currentConversation={currentConversation} />
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
