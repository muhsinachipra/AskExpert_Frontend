// LandingPage.tsx 

import CategoryCard from "../../components/CategoryCard";
import Header from "../../components/Header";
import { TbPoint } from "react-icons/tb";
import TestimonialCard from "../../components/TestimonialCard";
import ExpertCard from "../../components/ExpertCard";
import { MdVerifiedUser } from "react-icons/md";
import { BiSolidConversation } from "react-icons/bi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";


function Hero() {
    return (
        <section className="flex overflow-hidden relative flex-col justify-center items-start w-full font-semibold h-[calc(100vh-12vh)] ">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca8395bfb97a1bd951d7fb1f3f2bcdf65a60ed5f3ae590334de4f2d86d78cdc1?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="Banner Image" className="object-cover absolute inset-0 size-full" />

            <div className="flex relative flex-col h-full md:w-1/2 w-full bg-neutral-700 bg-opacity-90 ">
                <h1 className="mt-32 ml-9 text-6xl font-bold text-white">
                    Connect An <br /> <span className="text-teal-400">Expert</span>
                </h1>
                <p className="mt-5 mx-9 text-2xl leading-9 text-white">
                    Why choose us because we help you connect with experts around the world and get answer to your question on time and with affordable price.
                </p>
                <Link to={'/register'} type="button" className="ml-9 self-start px-16 py-3 mt-9 text-lg text-center capitalize bg-teal-400 text-neutral-700">
                    Register for free
                </Link>
            </div>
        </section>
    );
}





const cardData = [
    { imageSrc: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg", title: "Doctors" },
    { imageSrc: "https://t3.ftcdn.net/jpg/06/36/88/40/360_F_636884026_Myd8mWq6y2Lu2IOXC47DHjlTnyBC25fu.jpg", title: "Lawyers" },
    { imageSrc: "https://img.freepik.com/free-photo/mechanic-holding-wrench_1170-1136.jpg?t=st=1715320874~exp=1715324474~hmac=e5e3b12c366d07aa86bb581f69ac15c4684caecbbffbefc17150e0cd071d58e3&w=740", title: "Mechanics" },
    { imageSrc: "https://img.freepik.com/free-photo/portrait-freelancer-looking-camera-sitting-desk-with-charts-smart-businessman-sitting-his-workplace-course-late-night-hours-doing-his-job_482257-10278.jpg?t=st=1715321877~exp=1715325477~hmac=a4d512f2011cbf3fde54bf78affe45221ff5176eb2b84044b5a0619c7e3d1403&w=740", title: "IT Professionals" },
    { imageSrc: "https://img.freepik.com/premium-photo/portrait-smiling-young-man-sitting-with-colleague-table_1048944-25467744.jpg?w=740", title: "Career Advisors" },
    { imageSrc: "https://img.freepik.com/premium-photo/busy-analyst-team-office-analyzing-financial-data-analysis-entity_31965-171231.jpg?w=740", title: "Finance Advisors" },
    { imageSrc: "https://img.freepik.com/premium-photo/worried-man_23-2147990570.jpg?w=740", title: "Psychologist" },
    { imageSrc: "https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-dog_23-2149100197.jpg?t=st=1715340194~exp=1715343794~hmac=144c119a4e8ff181e9e3b15896d942f2f906c629c740fdc190ac2ea398eae6ef&w=740", title: "Veterinarian" },
    { imageSrc: "https://img.freepik.com/premium-photo/cheerful-european-woman-doctor-nutritionist-white-coat-with-organic-fruits-vegetables_116547-78050.jpg?w=740", title: "Dietitian" },
];

function Category() {
    return (

        <>
            <div className="flex justify-center max-md:mx-4 text-center mt-10 text-5xl font-bold">What category are you seeking help with?</div>
            <div className="flex flex-col mx-14 my-7 max-md:mx-3 items-center">
                {[...Array(Math.ceil(cardData.length / 3))].map((_, rowIndex) => (
                    <div key={rowIndex} className="flex flex-row justify-center items-center max-md:flex-wrap">
                        {cardData.slice(rowIndex * 3, rowIndex * 3 + 3).map((card, index) => (
                            <CategoryCard key={index} imageSrc={card.imageSrc} title={card.title} />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}



function HowItWorks() {


    return (
        <div className="h-80 max-md:h-96 bg-teal-400 flex flex-row max-md:flex-col justify-center items-center">
            <div className="max-md:w-full w-1/2 text-8xl md:text-6xl font-bold text-center leading-tight max-md:text-4xl max-md:pt-8 max-md:leading-tight">
                HERE IS HOW IT WORKS
            </div>

            <div className="shrink-0 self-stretch my-auto w-px bg-black border border-black border-solid h-64 max-md:h-0 max-md:w-72 max-md:ml-12 max-md:my-9" />

            <div className="flex flex-col pl-5 max-md:w-full w-1/2 lg:text-5xl md:text-4xl capitalize font-bold text-center leading-tight max-md:text-3xl max-md:leading-tight ">
                <div className="flex flex-row">
                    <TbPoint className="pt-6 max-md:pt-1" />
                    <h1>Register for free</h1>
                </div>
                <div className="flex flex-row">
                    <TbPoint className="pt-6 max-md:pt-1" />
                    <h1>choose a category</h1>
                </div>
                <div className="flex flex-row">
                    <TbPoint className="pt-6 max-md:pt-1" />
                    <h1>Find your expert</h1>
                </div>
                <div className="flex flex-row">
                    <TbPoint className="pt-6 max-md:pt-1" />
                    <h1>Take an appointment</h1>
                </div>
            </div>
        </div>
    );
}




const testimonialData = [
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f035b502e5e329fe20236ea8fc8903b1b5919d6fabfffdeffe5775d9765b7e5b?apiKey=62cb0e3201dd4b038734137173080a0d&",
        name: "John Doe",
        role: "Software Engineer",
        rating: 3,
        testimonial:
            "Expert Consult helped me immensely in resolving a complex coding issue. The expert I consulted provided clear explanations and valuable insights. I highly recommend this platform to anyone seeking professional advice.",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f55989522d27d5a327c95a0190690fef912b5f6c2554e4f5ddd2e1350d8ed431?apiKey=62cb0e3201dd4b038734137173080a0d&",
        name: "Alice Smith",
        role: "Business Analyst",
        rating: 4,
        testimonial:
            "I had a legal query regarding a contract negotiation, and Expert Consult connected me with a knowledgeable lawyer who provided excellent guidance. The platform is user-friendly, and the expert was responsive and helpful.",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/3b442835c561cbb7c7582c1b8e0a38f9ec5cbeff1deca5d009922e5594ed8b9a?apiKey=62cb0e3201dd4b038734137173080a0d&",
        name: "Michael Johnson",
        role: "Medical Doctor",
        rating: 5,
        testimonial:
            "I needed medical advice on managing a chronic condition, and Expert Consult connected me with a specialist who provided comprehensive guidance. The platform is a valuable resource for accessing expertise from the comfort of home.",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4939d453edf50a307e83b840364cc5c75ae87a71e3f3845dc9af4ada4d7f411?apiKey=62cb0e3201dd4b038734137173080a0d&",
        name: "Sarah Brown",
        role: "Financial Advisor",
        rating: 5,
        testimonial:
            "I consulted an expert on Expert Consult regarding investment strategies, and I was impressed by the depth of knowledge and professionalism. The platform offers a convenient way to access expert advice tailored to individual needs.",
    },
];

function Testimonial() {
    return (
        <section className="px-8 py-12 bg-white md:p-4">
            <div className="text-center">
                <div className="flex items-center justify-center">
                    <div className="w-3 h-3 bg-teal-400 mr-2" />
                    <div className="font-medium">Testimonial</div>
                </div>
                <h2 className="mt-4 text-4xl font-bold text-center capitalize">What Our Users Say</h2>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {testimonialData.map((testimonial, index) => (
                    <TestimonialCard
                        key={index}
                        imageSrc={testimonial.imageSrc}
                        name={testimonial.name}
                        role={testimonial.role}
                        stars={testimonial.rating}
                        testimonial={testimonial.testimonial}
                    />
                ))}
            </div>
        </section>
    );
}






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
            <Link to={'/expert/register'} className="absolute px-16 py-14 text-4xl font-bold text-center text-white backdrop-blur-[9px] bg-neutral-700 bg-opacity-80">
                Join Our Experts
            </Link>
        </section>
    )
}




















export default function Landing() {
    return (
        <div className="flex flex-col">
            <Header />
            <Hero />
            <Category />
            <HowItWorks />
            <Testimonial />
            <AreYouAnExpert />
            <JoinExpert />
            <Footer />
        </div>
    );
}

