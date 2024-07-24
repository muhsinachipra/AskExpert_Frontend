// frontend\src\pages\user\ChatPage.tsx

import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IConversation } from "../../types/domain";
import { useGetMessageQuery, useGetConversationQuery } from "../../slices/api/chatApiSlice";
import { useUserGetExpertDataQuery } from "../../slices/api/userApiSlice";

import ChatHeader from "../../components/user/chat/ChatHeader";
import ChatInput from "../../components/user/chat/ChatInput";
import ChatMessages from "../../components/user/chat/ChatMessages";
import ContactList from "../../components/user/chat/ContactList";

const ChatPage = () => {
    const location = useLocation();
    const currentConversation: IConversation = location.state?.currentConversation || {} as IConversation;
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const userId = userInfo?._id || '';

    const { data: conversationData } = useGetConversationQuery(userId);
    const userConversations = conversationData?.newConversation || [];

    const { data: messageData } = useGetMessageQuery({ conversationId: currentConversation._id || '000000' });
    const messages = useMemo(() => messageData?.message || [], [messageData]);

    const expertId = currentConversation.members?.find((m) => m !== userId) || '';
    const { data: expertD } = useUserGetExpertDataQuery(expertId);
    const expertData = expertD?.data

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
                            {messages.map((message) => (
                                <ChatMessages key={message._id} message={message} userInfo={userInfo} />
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



// // frontend\src\pages\user\ChatPage.tsx

// import { useLocation } from "react-router-dom";
// import ChatHeader from "../../components/user/chat/ChatHeader";
// import ChatInput from "../../components/user/chat/ChatInput";
// import ChatMessages from "../../components/user/chat/ChatMessages";
// import ContactList from "../../components/user/chat/ContactList";
// import { IConversation } from "../../types/domain";
// import { useEffect, useRef } from "react";
// import { useGetMessageQuery, useGetConversationQuery } from "../../slices/api/chatApiSlice";
// import { useSelector } from "react-redux";
// import { RootState } from "../../app/store";
// import { useUserGetExpertDataQuery } from "../../slices/api/userApiSlice";

// const ChatPage = () => {
//     const location = useLocation();
//     const currentConversation: IConversation = location.state?.currentConversation || {};
//     console.log('currentConversation in chatPage: ', currentConversation)
//     // const [viewMessages] = useViewMessagesMutation();
//     // const [getConversation] = useGetConversationQuery();
//     const { userInfo } = useSelector((state: RootState) => state.auth);
//     const { data } = useGetConversationQuery(userId);
//     const userConversations = data?.newConversation || [];
//     // console.log('userConversations in chatpage: ', userConversations)

//     // const [messages, setMessage] = useState<IMessage[]>([]);
//     const scrollRef = useRef<HTMLDivElement>(null);

//     const { data: res } = useGetMessageQuery({ conversationId: currentConversation._id });
//     const messages = res?.messages.data
//     console.log('messages in useGetMessageQuery: ', messages)

//     const expertId = currentConversation.members.find((m) => m !== userInfo?._id)
//     const { data: expertD } = useUserGetExpertDataQuery(expertId || '');
//     const expertData = expertD?.data

//     // if (res) {
//     //     setMessage(res.messages.data);
//     //     const idsToUpdate = res.messages.data
//     //         .filter((msg: IMessage) => msg.status === false && msg.senderId !== userInfo?._id)
//     //         .map((msg: IMessage) => msg._id);

//     //     if (idsToUpdate.length > 0) {
//     //         await viewMessages({ _id: idsToUpdate }).unwrap();
//     //     }
//     // }

//     // useEffect(() => {
//     //     if (currentConversation._id) {
//     //         const fetchChat = async () => {
//     //             try {
//     //                 // const res = await getMessage({ conversationId: currentConversation._id }).unwrap();
//     //                 if (res) {
//     //                     setMessage(res.messages.data);
//     //                     const idsToUpdate = res.messages.data
//     //                         .filter((msg: IMessage) => msg.status === false && msg.senderId !== userInfo?._id)
//     //                         .map((msg: IMessage) => msg._id);

//     //                     if (idsToUpdate.length > 0) {
//     //                         await viewMessages({ _id: idsToUpdate }).unwrap();
//     //                     }
//     //                 }
//     //             } catch (error) {
//     //                 console.error("Error fetching messages:", error);
//     //             }
//     //         };
//     //         fetchChat();
//     //     }
//     // }, [currentConversation._id, getMessage, viewMessages, userInfo?._id]);

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     const scrollToBottom = () => {
//         if (scrollRef.current) {
//             scrollRef.current.style.scrollBehavior = "smooth"
//             scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//         }
//     };

//     return (
//         <div className="h-screen flex">
//             <div className="flex flex-col w-1/4 border-r">
//                 <ChatHeader />
//                 <div className="overflow-y-auto h-screen p-2">
//                     {userConversations.length > 0 ? userConversations.map((c) => (
//                         <ContactList key={c._id} conversation={c} currentUserId={userId} />
//                     )) :
//                         <h1 className="text-center text-lg font-semibold mt-5">No Conversations</h1>
//                     }
//                 </div>
//             </div>
//             <div className="flex flex-col w-3/4">
//                 <div className="flex gap-5 items-center bg-white p-3 border-b">
//                     <img src={expertData?.profilePic} alt="Expert Avatar" className="w-10 h-10 rounded-full" />
//                     <h1 className="text-2xl font-semibold">{expertData?.name || "Expert_Name"}</h1>
//                 </div>
//                 <div className="flex-grow overflow-y-scroll p-4 bg-zinc-200" ref={scrollRef}  >
//                     {messages && messages.map(mes => (
//                         <ChatMessages key={mes._id} messages={mes} userInfo={userInfo} />
//                     ))}
//                 </div>
//                 <div className="bg-white p-4 border-t">
//                     <ChatInput userInfo={userInfo} currentConversation={currentConversation} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChatPage;
