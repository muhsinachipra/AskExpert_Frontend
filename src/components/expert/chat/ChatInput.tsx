// frontend\src\components\expert\chat\ChatInput.tsx

import React from 'react';

const ChatInput: React.FC = () => {
  return (
    <form className="flex gap-5 justify-center items-center px-4 py-4 text-xl font-medium leading-7 text-center border-t border-solid border-zinc-200 text-neutral-600 max-md:flex-wrap max-md:max-w-full">
      <label htmlFor="messageInput" className="sr-only">Enter Message</label>
      <input
        id="messageInput"
        type="text"
        placeholder="Enter Message"
        className="justify-center items-start self-stretch px-5 py-7 bg-white rounded-xl border border-solid border-zinc-200 max-md:px-5 max-md:max-w-full"
      />
      <button type="button" aria-label="Send voice message">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/570b89c1b97e0d0f1bc69954511fb19065ec070767c8e926288ade6805932b6f?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="" className="shrink-0 self-stretch my-auto aspect-[0.98] w-[59px]" />
      </button>
      <button type="submit" className="shrink-0 self-stretch my-auto w-32 max-w-full rounded-lg aspect-[2.04] bg-sky-600 text-white">
        Send
      </button>
    </form>
  );
};

export default ChatInput;