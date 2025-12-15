// frontend\src\pages\expert\LandingPage.tsx

import ExpertCard from "../../components/ExpertCard";
import { MdVerifiedUser } from "react-icons/md";
import { BiSolidConversation } from "react-icons/bi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import ExpertHeader from "../../components/expert/ExpertHeader";

const expertData = [
    {
        icon: <MdVerifiedUser />,
        title: "Verify Credentials",
        description:
            "Ensure the validity and authenticity of your qualifications and achievements with our comprehensive verification process. Gain confidence and trust by showcasing verified credentials to potential employers or clients.",
        iconClassName: "flex justify-center text-6xl  text-teal-400"
    },
    {
        icon: <BiSolidConversation />,
        title: "Interview",
        description:
            "Prepare for success in your upcoming interviews with personalized coaching and guidance from seasoned professionals. Polish your communication skills, refine your techniques, and ace your interviews with confidence.",
        iconClassName: "flex justify-center text-6xl  text-indigo-500"
    },
    {
        icon: <RiMoneyRupeeCircleFill />,
        title: "Start Earning",
        description:
            "Embark on your journey to financial independence and success. Utilize our platform to leverage your expertise and start earning by providing valuable services to clients worldwide. Join our community of experts today!",
        iconClassName: "flex justify-center text-6xl  text-teal-400"
    },
];

function AreYouAnExpert() {
    return (
        <div className="flex justify-center  items-center p-16 bg-gray-200 bg-opacity-50 max-md:px-5">
            <div className="flex flex-col w-full max-w-[1715px] max-md:max-w-full">
                <div className="flex justify-center items-center px-16 max-md:px-5 max-md:max-w-full">
                    <div className="flex flex-col items-center w-full max-w-[1320px] max-md:max-w-full">
                        <div className="flex gap-1.5 py-0.5 text-lg font-medium text-neutral-700">
                            <div className="shrink-0 mt-2 self-start w-3 h-3 bg-teal-400" />
                            <h2 className="flex-auto">Get hired as an expert</h2>
                        </div>
                        <h1 className="mt-4 text-4xl font-bold text-center leading-[48.4px] text-neutral-700">
                            Are You An Expert ?
                        </h1>
                        <div className="justify-center self-stretch px-12 mt-10 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                {expertData.map((card, index) => (
                                    <ExpertCard key={index} {...card} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Link to={'/expert/register'} className="justify-center self-center px-10 py-2 mt-12 text-2xl font-semibold text-center capitalize bg-teal-400 text-neutral-700 max-md:px-5 max-md:mt-10">
                    Join Now
                </Link>
            </div>
        </div>
    );
}

function JoinExpert() {
    return (
        <section className="relative flex justify-center items-center h-full">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d60141c1a8fcb1ad7168bc2be51da0dfa8a298d9e2c1367b042f24f7141aaf4?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="" className="object-cover w-full h-full" />
            {/* <Link to={'/expert/register'} className="absolute px-16 py-14 text-4xl font-bold text-center text-white backdrop-blur-[9px] bg-neutral-700 bg-opacity-80"> */}
            <Link to={'/expert/register'} className="absolute px-16 py-14 text-4xl font-bold text-center text-white backdrop-blur-[9px] bg-neutral-800 bg-opacity-30 rounded-3xl capitalize max-md:px-5 max-md:py-5">
                Join Our Team
            </Link>
        </section>
    )
}

function ExpertCommunity() {
    return (
        <section className="flex flex-col justify-center items-center py-20 px-4 bg-neutral-200 max-md:py-10">
            <div className="flex flex-col justify-center items-center py-20 px-16 bg-white max-md:py-10 max-md:px-5">
                <div className="flex flex-col gap-1.5 w-full">
                    <div className="flex flex-col gap-1.5 py-0.5 text-lg font-medium text-neutral-700">
                        <div className="shrink-0 mt-2 self-start w-3 h-3 bg-teal-400" />
                        <h2 className="flex-auto">Join our expert community</h2>
                    </div>
                    <h1 className="text-5xl font-bold leading-[56px] text-neutral-700">Become an Expert</h1>
                    <p className="mt-5 text-lg font-normal leading-[30px] text-neutral-700">
                        Gain recognition and credibility by joining our platform. We provide
                        opportunities for experts across various fields to connect with clients,
                        share knowledge, and earn money. Start your journey with us and become
                        a trusted expert in your industry.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default function Landing() {
    return (
        <div className="flex flex-col">
            <ExpertHeader/>
            <JoinExpert />
            <ExpertCommunity />
            <AreYouAnExpert />
        </div>
    );
}
