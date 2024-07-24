// frontend\src\components\expert\chat\ContactList.tsx

import { useNavigate } from "react-router-dom";
import { IConversation } from "../../../types/domain";
import { useCreateConversationMutation } from "../../../slices/api/chatApiSlice";
import { useExpertGetUserDataQuery } from "../../../slices/api/expertApiSlice";

const ContactList = ({ conversation, currentExpertId }: { conversation: IConversation, currentExpertId: string }) => {

    const userId = conversation.members.find((m) => m !== currentExpertId)
    const { data } = useExpertGetUserDataQuery(userId || '');
    const userData = data?.data

    const [createConversation] = useCreateConversationMutation();
    const navigate = useNavigate();

    const handleChat = async (receiverId: string) => {
        try {
            const res = await createConversation({
                senderId: currentExpertId,
                receiverId,
            }).unwrap();
            // console.log('currentConversation in handleChat ContactList: ', res.newConversation)
            navigate("/expert/chat", {
                state: { currentConversation: res.newConversation },
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div key={conversation._id} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => handleChat(userData?._id || '')} >
            <div className="relative w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src={userData?.profilePic} alt="User Avatar" className="w-12 h-12 rounded-full" />
                {/* {contact.isOnline && (
                    <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )} */}
            </div>
            <div className="flex-1">
                <h2 className="text-lg font-semibold">{userData?.name}</h2>
            </div>
        </div>
    )
}

export default ContactList;



// const contacts = [
//     { name: 'Alice', imgSrc: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato', isOnline: true },
//     { name: 'Martin', imgSrc: 'https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato', isOnline: false },
//     { name: 'Charlie', imgSrc: 'https://placehold.co/200x/2e83ad/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato', isOnline: true },
//     { name: 'David', imgSrc: 'https://placehold.co/200x/c2ebff/0f0b14.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato', isOnline: false },
//     { name: 'Ella', imgSrc: 'https://placehold.co/200x/e7c2ff/7315d1.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato', isOnline: true },
//     { name: 'Fiona', imgSrc: 'https://placehold.co/200x/ffc2e2/ffdbdb.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato', isOnline: false },
//     { name: 'George', imgSrc: 'https://placehold.co/200x/f83f3f/4f4f4f.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato', isOnline: true },
//     { name: 'Hannah', imgSrc: 'https://placehold.co/200x/dddddd/999999.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato', isOnline: false },
//     { name: 'Ian', imgSrc: 'https://placehold.co/200x/70ff33/501616.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato', isOnline: true },
//     { name: 'Jack', imgSrc: 'https://placehold.co/200x/30916c/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato', isOnline: false },
// ]