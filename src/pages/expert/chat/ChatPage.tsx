// frontend\src\pages\expert\chat\ChatPage.tsx

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const ChatPage = () => {
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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300">
        {/* Sidebar Header */}
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
            <div
              id="menuDropdown"
              className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg ${menuVisible ? '' : 'hidden'}`}
            >
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

        {/* Contact List */}
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {/* Contact List Items */}
          {[
            { name: 'Alice', imgSrc: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { name: 'Martin', imgSrc: 'https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { name: 'Charlie', imgSrc: 'https://placehold.co/200x/2e83ad/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { name: 'David', imgSrc: 'https://placehold.co/200x/c2ebff/0f0b14.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { name: 'Ella', imgSrc: 'https://placehold.co/200x/e7c2ff/7315d1.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { name: 'Fiona', imgSrc: 'https://placehold.co/200x/ffc2e2/ffdbdb.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { name: 'George', imgSrc: 'https://placehold.co/200x/f83f3f/4f4f4f.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { name: 'Hannah', imgSrc: 'https://placehold.co/200x/dddddd/999999.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { name: 'Ian', imgSrc: 'https://placehold.co/200x/70ff33/501616.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { name: 'Jack', imgSrc: 'https://placehold.co/200x/30916c/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
          ].map((contact, index) => (
            <div key={index} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src={contact.imgSrc} alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{contact.name}</h2>
                {/* <p className="text-gray-600">{contact.message}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 relative">
        {/* Chat Header */}
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">Alice</h1>
        </header>

        {/* Chat Messages */}
        <div className="h-screen bg-zinc-100 overflow-y-auto p-4 pb-36">
          {/* Chat Messages Content */}
          {[
            { type: 'incoming', message: "Hey Bob, how's it going?", imgSrc: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { type: 'outgoing', message: "Hi Alice! I'm good, just finished a great book. How about you?", imgSrc: 'https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { type: 'incoming', message: "That book sounds interesting! What's it about?", imgSrc: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { type: 'outgoing', message: "It's about an astronaut stranded on Mars, trying to survive. Gripping stuff!", imgSrc: 'https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { type: 'incoming', message: "I'm intrigued! Maybe I'll borrow it from you when you're done?", imgSrc: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { type: 'outgoing', message: "Of course! I'll drop it off at your place tomorrow.", imgSrc: 'https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { type: 'incoming', message: "Thanks, you're the best!", imgSrc: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { type: 'outgoing', message: "Anytime! Let me know how you like it. 😊", imgSrc: 'https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
            { type: 'incoming', message: "Will do! Have a great day, Bob!", imgSrc: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
          ].map((chat, index) => (
            <div key={index} className={`flex items-start mb-4 ${chat.type === 'outgoing' ? 'justify-end' : ''}`}>
              {chat.type === 'incoming' && (
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3">
                  <img src={chat.imgSrc} alt="User Avatar" className="w-10 h-10 rounded-full" />
                </div>
              )}
              <div
                className={`p-3 rounded-lg max-w-xs ${chat.type === 'outgoing' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'}`}
              >
                <p>{chat.message}</p>
              </div>
              {chat.type === 'outgoing' && (
                <div className="w-10 h-10 bg-gray-300 rounded-full ml-3">
                  <img src={chat.imgSrc} alt="User Avatar" className="w-10 h-10 rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300 flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 bg-zinc-100 rounded-lg focus:outline-none focus:border-indigo-600"
          />
          <button className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-lg">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
