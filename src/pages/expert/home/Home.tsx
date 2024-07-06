// frontend\src\pages\expert\home\Home.tsx

import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import UnverifiedMessage from "../../../components/expert/Unverified";

export default function Home() {
  const { expertInfo } = useSelector((state: RootState) => state.auth);
  const isVerified = expertInfo?.isVerified;

  return (
    <>
      {isVerified
        ?
        <>
          <span className="font-bold text-4xl">Home</span>
          <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg"></div>
          <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
          <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
          <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
          <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
          <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
        </>
        :
        <>
          <UnverifiedMessage />
        </>
      }
    </>
  );
}




