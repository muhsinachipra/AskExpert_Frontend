// frontend\src\pages\user\ChatPage.tsx

import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IConversation } from "../../types/domain";
import { useGetMessageQuery, useGetConversationQuery } from "../../slices/api/chatApiSlice";
import { useUserGetExpertDataQuery } from "../../slices/api/userApiSlice";
import useSocket from "../../hooks/useSocket";
import { IoIosArrowBack } from "react-icons/io";

import ChatHeader from "../../components/user/chat/ChatHeader";
import ChatInput from "../../components/user/chat/ChatInput";
import ChatMessages from "../../components/user/chat/ChatMessages";
import ContactList from "../../components/user/chat/ContactList";

import selectConversationImage from "../../../public/live-chat-vs-messaging-removebg-preview.png";

const ChatPage = () => {
    const socket = useSocket();
    const location = useLocation();
    const currentConversation: IConversation = location.state?.currentConversation || {} as IConversation;
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const userId = userInfo?._id || '';

    const { data: conversationData } = useGetConversationQuery(userId);
    const userConversations = conversationData?.newConversation || [];

    const { data: messageData, refetch: refetchMessages } = useGetMessageQuery({ conversationId: currentConversation._id || '000000' });
    console.log('messageData?.message: ', messageData?.message || []);
    const [chatMessages, setChatMessages] = useState(messageData?.message || []);
    console.log('chatMessages: ', chatMessages);

    const [showContactList, setShowContactList] = useState(true);

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

    const toggleContactList = () => {
        setShowContactList(!showContactList);
    };

    return (
        <div className="h-screen flex flex-col md:flex-row bg-gray-100">
            <div className={`${showContactList ? 'flex' : 'hidden'} h-screen md:flex flex-col w-full md:w-1/4 border-r bg-white transition-all duration-300 ease-in-out`}>
                <ChatHeader />
                <div className="overflow-y-auto flex-grow p-2">
                    {userConversations.length > 0 ? (
                        userConversations.map((conversation) => (
                            <ContactList
                                key={conversation._id}
                                conversation={conversation}
                                currentUserId={userId}
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
                            <img src={expertData?.profilePic} alt="Expert Avatar" className="w-9 h-9 rounded-full" />
                            <h1 className="text-xl md:text-2xl font-semibold">{expertData?.name || "Expert_Name"}</h1>
                        </div>

                        <div className="flex-grow overflow-y-auto p-3 bg-gray-100" ref={scrollRef}>
                            {chatMessages.map((message) => (
                                <ChatMessages key={message._id} message={message} userInfo={userInfo} expertData={expertData} />
                            ))}
                        </div>
                        <div className="bg-white border-t">
                            <ChatInput userInfo={userInfo} currentConversation={currentConversation} />
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
