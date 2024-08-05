// frontend\src\components\user\ExpertCard.tsx

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { useCreateConversationMutation } from "../../slices/api/chatApiSlice";
import { Icon } from '@iconify/react';

type ExpertCardProps = {
    name: string;
    experience: number;
    averageRating: number;
    image: string;
    expertId: string;
};

const ExpertListCard = ({ name, experience, averageRating, image, expertId }: ExpertCardProps) => {

    const [conversation] = useCreateConversationMutation();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const handleChat = async (receiverId: string) => {
        try {
            const res = await conversation({
                senderId: userInfo?._id,
                receiverId,
            }).unwrap();
            console.log('currentConversation in ExpertCard: ', res.newConversation)
            navigate("/chat", {
                state: { currentConversation: res.newConversation },
            });
        } catch (error) {
            console.error(error);
        }
    };

    // const renderStars = () => {
    //     const fullStars = Math.floor(averageRating);
    //     const halfStar = averageRating % 1 !== 0;
    //     const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    //     return (
    //         <div className="flex items-center text-yellow-500">
    //             {Array.from({ length: fullStars }).map((_, i) => (
    //                 <Icon key={`full-${i}`} icon={"material-symbols:star"} />
    //             ))}
    //             {halfStar && <Icon icon={"material-symbols:star-half"} />}
    //             {Array.from({ length: emptyStars }).map((_, i) => (
    //                 <Icon key={`empty-${i}`} icon={"material-symbols:star"} className="text-gray-300" />
    //             ))}
    //         </div>
    //     );
    // };
    const renderStars = () => {
        const roundedRating = Math.round(averageRating * 2) / 2; // Round to nearest 0.5
        const fullStars = Math.floor(roundedRating);
        const halfStar = roundedRating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className="flex items-center text-yellow-500">
                {Array.from({ length: fullStars }).map((_, i) => (
                    <Icon key={`full-${i}`} icon={"material-symbols:star"} />
                ))}
                {halfStar && <Icon icon={"material-symbols:star-half"} />}
                {Array.from({ length: emptyStars }).map((_, i) => (
                    <Icon key={`empty-${i}`} icon={"material-symbols:star"} className="text-gray-300" />
                ))}
            </div>
        );
    };

    return (
        <div className="flex items-center border p-4 rounded-lg shadow-md">
            <img src={image} alt={name} className="w-24 h-24 rounded-full mr-4" />
            <div className="flex-1">
                <div className="text-xl font-bold">{name}</div>
                <div className="text-gray-600">{experience} Years Experience</div>
                {renderStars()}
            </div>
            <div className="flex flex-col space-y-2">
                <Link to={`/slots/${expertId}`} className="bg-green-500 text-white px-4 py-2 rounded">Take Appointment</Link>
                <button onClick={() => handleChat(expertId)} className="bg-green-500 text-white px-4 py-2 rounded">Chat with Expert</button>
            </div>
        </div>
    );
};

export default ExpertListCard
