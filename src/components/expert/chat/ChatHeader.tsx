// frontend\src\components\expert\chat\ChatHeader.tsx

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const ChatHeader = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (menuVisible && event.target instanceof Element && !event.target.closest('#menuButton') && !event.target.closest('#menuDropdown')) {
            setMenuVisible(false);
        }
    }, [menuVisible]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <Link to="/expert/home" className="text-2xl font-semibold">Exit</Link>
            <div className="relative">
                <button type='button' id="menuButton" className="focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                    </svg>
                </button>
                {/* Menu Dropdown */}
                <div id="menuDropdown"
                    className={`absolute z-10 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg ${menuVisible ? '' : 'hidden'}`}>
                    <ul className="py-2 px-3">
                        <li>
                            <a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a>
                        </li>
                        {/* Add more menu options here */}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default ChatHeader;
