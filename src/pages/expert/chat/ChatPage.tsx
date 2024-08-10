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
        <div className="h-screen flex flex-col md:flex-row">
            <div className={`${showContactList ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-1/4 border-r`}>
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
            <div className={`${showContactList ? 'hidden' : 'flex'} md:flex flex-col w-full md:w-3/4 h-full`}>
                {currentConversation._id ? (
                    <>
                        <div className="flex gap-4 items-center bg-white p-3 border-b">
                            <button type="button" onClick={toggleContactList} className="md:hidden" title="Back button">
                                <IoIosArrowBack />
                            </button>
                            <img src={userData?.profilePic} alt="Expert Avatar" className="w-10 h-10 rounded-full" />
                            <h1 className="text-xl md:text-2xl font-semibold">{userData?.name || "Expert_Name"}</h1>
                        </div>
                        <div className="flex-grow overflow-y-scroll p-3 bg-zinc-200" ref={scrollRef}>
                            {chatMessages.map((message) => (
                                <ChatMessages key={message._id} message={message} expertInfo={expertInfo} userData={userData} />
                            ))}
                        </div>
                        <div className="bg-white border-t">
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