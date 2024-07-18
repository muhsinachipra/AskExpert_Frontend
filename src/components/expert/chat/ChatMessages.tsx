// frontend\src\components\expert\chat\ChatMessages.tsx

import React from 'react';
import UserMessage from './UserMessage';
import ExpertMessage from './ExpertMessage';

const ChatMessages: React.FC = () => {
  return (
    <div className="flex overflow-hidden relative z-10 flex-col justify-end py-11 pr-14 pl-4 -mt-52 w-full min-h-[600px] max-md:pr-5 max-md:mt-0 max-md:max-w-full">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3428dca7691b0f95286279cef91999da840adeca79c04eaa04192ec9ebd3e2b2?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="" className="object-cover absolute inset-0 size-full" />
      <UserMessage />
      <ExpertMessage />
    </div>
  );
};

export default ChatMessages;