// frontend\src\components\user\chat\ChatHeader.tsx

import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const ChatHeader = () => {
    return (
        <header className="px-4 py-4 border-b border-gray-200 flex justify-between items-center bg-white text-gray-800 shadow-sm">
            <Link to="/home" className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                <IoIosArrowBack className="inline-block mb-1" /> Exit
            </Link>
        </header>
    );
};

export default ChatHeader;
