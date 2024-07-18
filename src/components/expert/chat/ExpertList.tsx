// frontend\src\components\expert\chat\ExpertList.tsx

import React from 'react';
import ExpertCard from './ExpertCard';

interface ExpertListProps {
  experts: Expert[];
}

interface Expert {
  id: number;
  name: string;
  profession: string;
  imageUrl: string;
  isOnline?: boolean;
}

const ExpertList: React.FC<ExpertListProps> = ({ experts }) => {
  return (
    <div className="flex flex-col grow pb-3 border-r border-solid border-zinc-200">
      <h2 className="justify-center items-start px-4 py-8 text-lg font-bold leading-7 text-sky-600 border-b border-solid border-zinc-200 max-md:pr-5">
        Chat with Experts For Free
      </h2>
      {experts.map((expert) => (
        <ExpertCard key={expert.id} expert={expert} />
      ))}
    </div>
  );
};

export default ExpertList;