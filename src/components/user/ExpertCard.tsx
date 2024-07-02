// frontend\src\components\user\ExpertCard.tsx

import { Link } from "react-router-dom";

type ExpertCardProps = {
    name: string;
    experience: number;
    rating: number;
    fee: number;
    image: string;
    expertId: string;
};

const ExpertListCard = ({ name, experience, rating, fee, image, expertId }: ExpertCardProps) => {
    return (
        <div className="flex items-center border p-4 rounded-lg shadow-md">
            <img src={image} alt={name} className="w-24 h-24 rounded-full mr-4" />
            <div className="flex-1">
                <div className="text-xl font-bold">{name}</div>
                <div className="text-gray-600">{experience} Years Experience</div>
                <div className="flex items-center text-yellow-500">
                    {Array.from({ length: rating }).map((_, i) => (
                        <span key={i}>&#9733;</span>
                    ))}
                    {Array.from({ length: 5 - rating }).map((_, i) => (
                        <span key={i} className="text-gray-300">&#9733;</span>
                    ))}
                </div>
                <div className="text-gray-800 font-semibold">{fee}/Session</div>
            </div>
            <div className="flex flex-col space-y-2">
                <Link to={`/slots/${expertId}`} className="bg-green-500 text-white px-4 py-2 rounded">Take Appointment</Link>
            </div>
        </div>
    );
};


export default ExpertListCard