// frontend\src\components\expert\chat\ChatHeader.tsx

import React from 'react';

const ChatHeader: React.FC = () => {
  return (
    <header className="flex gap-5 justify-between items-start px-4 pt-5 w-full border-b border-solid border-zinc-200 max-md:flex-wrap max-md:max-w-full">
      <div className="flex gap-4">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5486588777a188e082618f4e64adeeabe7cc3f95aa8070396a48c43aad810fcf?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="Ryan Johnson's profile" className="shrink-0 aspect-square w-[65px]" />
        <div className="flex flex-col my-auto">
          <div className="flex gap-2.5 px-px text-lg font-bold leading-5 text-sky-600">
            <div className="grow">Ryan Johnson</div>
            <div className="shrink-0 self-start w-3.5 h-3.5 bg-green-600 rounded-lg" aria-label="Online status indicator" />
          </div>
          <div className="mt-2 text-base leading-6 text-stone-950">Computer Specialist</div>
        </div>
      </div>
      <div className="flex flex-col mt-2.5">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c61c9c041aa88f2614ef489b0a0da02597831b73fc279597ddd158d213d84eaf?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="" className="aspect-[1.18] w-[55px]" />
        <div className="flex gap-2 self-end mt-48 max-md:mt-10">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/46054f86d295991c90e820582ee95221478d77806ffec1f4c80fab4c0e74ffab?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="" className="shrink-0 w-full aspect-[1.18]" />
          <div className="shrink-0 my-auto w-2 h-1 border-t-4 border-solid border-t-neutral-800 border-x-4 border-x-neutral-800" />
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;