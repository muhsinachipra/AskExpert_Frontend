// frontend\src\components\expert\chat\UserMessage.tsx

import React from 'react';

const UserMessage: React.FC = () => {
  return (
    <div className="flex relative gap-2.5 self-end max-md:flex-wrap">
      <div className="flex flex-auto gap-0 max-md:flex-wrap">
        <div className="flex flex-col grow shrink-0 py-7 bg-white rounded-2xl border-b-4 border-solid basis-0 border-neutral-200 w-fit max-md:max-w-full">
          <div className="self-end mr-8 text-lg font-bold leading-5 text-right text-sky-600 max-md:mr-2.5">You</div>
          <div className="flex flex-col px-5 mt-3 max-md:pr-5 max-md:max-w-full">
            <p className="text-base leading-7 text-zinc-800 max-md:max-w-full">
              Are you having trouble getting your website noticed by search engines? Look no <br />
              further than Ryan Johnson, a search engine optimization specialist who is <br />
              passionate about helping businesses like yours succeed online. Ryan is always <br />
              up-to-date with the latest SEO practices and strategies, and is ready to help <br />
              you achieve your goals.
            </p>
            <div className="flex gap-1 self-start mt-4 text-sm leading-5 text-neutral-500">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a7cb01947f0d3e20c29304ed3506608a0dcde5db7e1e7beb7507d077e3598c3?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="" className="shrink-0 self-start w-3.5 aspect-square" />
              <time dateTime="2024-04-30T01:04:18">4/30/2024, 1:04:18 AM</time>
            </div>
          </div>
        </div>
        <div className="shrink-0 self-end mt-48 w-2.5 h-5 border-solid border-r-[10px] border-r-white border-y-[10px] border-y-white max-md:mt-10" />
      </div>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8efe8774a4f103f67e86e4c1cc04241a34249533ef108f74220dcd64d16b66d7?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="" className="shrink-0 self-end mt-44 aspect-[1.18] w-[55px] max-md:mt-10" />
    </div>
  );
};

export default UserMessage;