// frontend\src\pages\expert\chat\ChatPage.tsx

import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { IConversation } from "../../../types/domain";
import { useGetMessageQuery, useGetConversationQuery } from "../../../slices/api/chatApiSlice";
import { useExpertGetUserDataQuery } from "../../../slices/api/expertApiSlice";
import useSocket from "../../../hooks/useSocket";
import { IoIosArrowBack } from "react-icons/io";

import ChatHeader from "../../../components/expert/chat/ChatHeader";
import ChatInput from "../../../components/expert/chat/ChatInput";
import ChatMessages from "../../../components/expert/chat/ChatMessages";
import ContactList from "../../../components/expert/chat/ContactList";

import selectConversationImage from "../../../../public/live-chat-vs-messaging-removebg-preview.png";

const ChatPage = () => {
    const socket = useSocket();
    const location = useLocation();
    const currentConversation: IConversation = location.state?.currentConversation || {} as IConversation;
    const { expertInfo } = useSelector((state: RootState) => state.auth);
    const expertId = expertInfo?._id || '';

    const { data: conversationData } = useGetConversationQuery(expertId);
    const expertConversations = conversationData?.newConversation || [];

    const { data: messageData, refetch: refetchMessages } = useGetMessageQuery({ conversationId: currentConversation._id || '000000' });
    const [chatMessages, setChatMessages] = useState(messageData?.message || []);

    const [showContactList, setShowContactList] = useState(true);

    useEffect(() => {
        setChatMessages(messageData?.message || []);
    }, [socket, messageData]);

    const userId = currentConversation.members?.find((m) => m !== expertId) || '';
    const { data: userD } = useExpertGetUserDataQuery(userId);
    const userData = userD?.data

    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.style.scrollBehavior = "smooth";
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatMessages]);

    useEffect(() => {
        socket?.emit("addUser", expertId);

        socket?.on("getMessage", (data) => {
            if (data.senderId === userId) {
                setChatMessages((prevMessages) => [...prevMessages, data]);
                refetchMessages();
            }
        });

        return () => {
            socket?.off("getMessage");
        };
    }, [socket, expertId, refetchMessages, userId]);

    const toggleContactList = () => {
        setShowContactList(!showContactList);
    };

    return (
        // frontend\src\pages\expert\chat\ChatPage.tsx
        <div className="h-screen flex flex-col md:flex-row bg-gray-100">
            <div className={`${showContactList ? 'flex' : 'hidden'} h-screen md:flex flex-col w-full md:w-1/4 border-r bg-white transition-all duration-300 ease-in-out`}>
                <ChatHeader />
                <div className="overflow-y-auto flex-grow p-2">
                    {expertConversations.length > 0 ? (
                        expertConversations.map((conversation) => (
                            <ContactList
                                key={conversation._id}
                                conversation={conversation}
                                currentExpertId={expertId}
                                onSelectConversation={() => {
                                    setShowContactList(false);
                                }}
                            />
                        ))
                    ) : (
                        <h1 className="flex items-center justify-center h-full text-lg font-semibold">No Conversations</h1>
                    )}
                </div>
            </div>
            <div className={`${showContactList ? 'hidden' : 'flex'} md:flex flex-col w-full md:w-3/4 h-full transition-all duration-300 ease-in-out`}>
                {currentConversation._id ? (
                    <>
                        <div className="flex gap-4 items-center bg-white p-3 border-b">
                            <button type="button" onClick={toggleContactList} className="md:hidden" title="Back button">
                                <IoIosArrowBack />
                            </button>
                            <img src={userData?.profilePic} alt="Expert Avatar" className="w-9 h-9 rounded-full" />
                            <h1 className="text-xl md:text-2xl font-semibold">{userData?.name || "Expert_Name"}</h1>
                        </div>

                        <div className="flex-grow overflow-y-auto p-3 bg-gray-100" ref={scrollRef}>
                            {chatMessages.map((message) => (
                                <ChatMessages key={message._id} message={message} expertInfo={expertInfo} userData={userData} />
                            ))}
                        </div>
                        <div className="bg-white border-t">
                            <ChatInput expertInfo={expertInfo} currentConversation={currentConversation} />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
                        <img src={selectConversationImage} alt="Select a Conversation" className="w-1/2 h-auto mb-4" />
                        <p className="text-lg font-semibold text-gray-600">Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;