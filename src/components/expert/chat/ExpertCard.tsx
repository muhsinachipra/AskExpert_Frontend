// frontend\src\components\expert\chat\ExpertCard.tsx

import React from 'react';

interface ExpertCardProps {
  expert: Expert;
}

interface Expert {
  id: number;
  name: string;
  profession: string;
  imageUrl: string;
  isOnline?: boolean;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert }) => {
  return (
    <div className="flex gap-5 justify-between py-4 pr-16 pl-4 border-b border-blue-50 border-solid max-md:pr-5">
      <img loading="lazy" src={expert.imageUrl} alt={`${expert.name}'s profile`} className="shrink-0 aspect-square w-[55px]" />
      <div className="flex flex-col my-auto">
        <div className="text-lg font-bold leading-7 text-black">{expert.name}</div>
        <div className="mt-4 text-base leading-7 text-neutral-600">{expert.profession}</div>
      </div>
    </div>
  );
};

export default ExpertCard;