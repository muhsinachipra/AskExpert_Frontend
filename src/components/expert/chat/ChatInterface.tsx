// frontend\src\components\expert\chat\ChatInterface.tsx

import React from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatInterface: React.FC = () => {
  return (
    <div className="flex flex-col grow justify-center w-full shadow-sm bg-white bg-opacity-0 max-md:max-w-full">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatInterface;