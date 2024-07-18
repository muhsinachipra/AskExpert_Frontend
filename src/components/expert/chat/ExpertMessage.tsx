// frontend\src\components\expert\chat\ExpertMessage.tsx

import React from 'react';

const ExpertMessage: React.FC = () => {
  return (
    <div className="flex relative gap-1.5 mt-14 max-md:flex-wrap max-md:mt-10">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c6310b8704a1f48d005623462dbcd466b1b0a94709e3bcadfeb4dea4c2c09432?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="Ryan Johnson's avatar" className="shrink-0 self-end mt-44 aspect-square w-[45px] max-md:mt-10" />
      <div className="flex flex-col grow shrink-0 py-5 pr-3.5 bg-white rounded-2xl border-b-4 border-solid basis-0 border-neutral-200 w-fit max-md:max-w-full">
        <div className="flex gap-5 text-lg font-bold leading-5 text-sky-600 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <div className="flex-auto my-auto">Ryan Johnson</div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/785df35837d4c9ed8c9e605b4a9e05968dab35dd3f8294e27e3465b7c97ea641?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="" className="shrink-0 w-6 aspect-square" />
        </div>
        <p className="mx-6 mt-3 text-base leading-7 text-zinc-800 max-md:mr-2.5 max-md:max-w-full">
          Are you having trouble getting your website noticed by search engines? Look no <br />
          further than Ryan Johnson, a search engine optimization specialist who is <br />
          passionate about helping businesses like yours succeed online. Ryan is always <br />
          up-to-date with the latest SEO practices and strategies, and is ready to help <br />
          you achieve your goals.
        </p>
        <div className="flex gap-5 justify-between mt-2.5 w-full text-sm max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <div className="flex gap-5 items-start self-start mt-2 leading-[155%] text-neutral-500">
            <div className="shrink-0 mt-1 w-2.5 h-5 border-solid border-r-[10px] border-r-white border-y-[10px] border-y-white" />
            <div className="flex gap-1">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1556e8c3ec6816007dd34c883a4ded98bc42485fb41058480ad5cbbf93bc907c?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="" className="shrink-0 self-start w-3.5 aspect-square" />
              <time dateTime="2024-04-30T01:04:18">4/30/2024, 1:04:18 AM</time>
            </div>
          </div>
          <button className="flex gap-px justify-end px-2.5 py-2 text-center text-sky-600 rounded-lg border border-sky-500 border-solid leading-[150%]">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c246c896f0a521edaa524cbd97ccdfe77708c27f04c5d2b5a0f7ef33db52578?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="" className="shrink-0 self-start w-3.5 aspect-square" />
            <span>Copy text</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertMessage;