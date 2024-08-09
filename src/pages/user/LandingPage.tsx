// frontend\src\pages\user\LandingPage.tsx

import CategoryCard from "../../components/CategoryCard";
import UserHeader from "../../components/user/UserHeader";
import { TbPoint } from "react-icons/tb";
import TestimonialCard from "../../components/TestimonialCard";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useUserGetCategoryDataQuery } from "../../slices/api/userApiSlice";

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

function Category() {
    const { data, error, isLoading } = useUserGetCategoryDataQuery({ page: 1, limit: 100 });
    const navigate = useNavigate();

    const handleCategoryClick = (categoryName: string) => {
        navigate(`/experts/${categoryName}`);
    };

    const categoryData = data?.data;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading categories</div>;
    }
    return (

        <>
           <div className="flex justify-center max-md:mx-4 text-center mt-10 text-5xl font-bold">
                What category are you seeking help with?
            </div>
            <div className="flex flex-col mx-14 my-7 max-md:mx-3 items-center">
                {categoryData && data.total > 0 ? (
                    [...Array(Math.ceil(data.total / 3))].map((_, rowIndex) => (
                        <div key={rowIndex} className="flex flex-row justify-center items-center max-md:flex-wrap">
                            {categoryData.slice(rowIndex * 3, rowIndex * 3 + 3).map((category, index) => (
                                <CategoryCard key={index} imageSrc={category.categoryImage} title={category.categoryName} onClick={() => handleCategoryClick(category.categoryName)} /> 
                            ))}
                        </div>
                    ))
                ) : (
                    <div>No categories found</div>
                )}
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
        averageRating: 3,
        testimonial:
            "Expert Consult helped me immensely in resolving a complex coding issue. The expert I consulted provided clear explanations and valuable insights. I highly recommend this platform to anyone seeking professional advice.",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f55989522d27d5a327c95a0190690fef912b5f6c2554e4f5ddd2e1350d8ed431?apiKey=62cb0e3201dd4b038734137173080a0d&",
        name: "Alice Smith",
        role: "Business Analyst",
        averageRating: 4,
        testimonial:
            "I had a legal query regarding a contract negotiation, and Expert Consult connected me with a knowledgeable lawyer who provided excellent guidance. The platform is user-friendly, and the expert was responsive and helpful.",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/3b442835c561cbb7c7582c1b8e0a38f9ec5cbeff1deca5d009922e5594ed8b9a?apiKey=62cb0e3201dd4b038734137173080a0d&",
        name: "Michael Johnson",
        role: "Medical Doctor",
        averageRating: 5,
        testimonial:
            "I needed medical advice on managing a chronic condition, and Expert Consult connected me with a specialist who provided comprehensive guidance. The platform is a valuable resource for accessing expertise from the comfort of home.",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4939d453edf50a307e83b840364cc5c75ae87a71e3f3845dc9af4ada4d7f411?apiKey=62cb0e3201dd4b038734137173080a0d&",
        name: "Sarah Brown",
        role: "Financial Advisor",
        averageRating: 5,
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
                        stars={testimonial.averageRating}
                        testimonial={testimonial.testimonial}
                    />
                ))}
            </div>
        </section>
    );
}


export default function Landing() {
    return (
        <div className="flex flex-col">
            <UserHeader />
            <Hero />
            <Category />
            <HowItWorks />
            <Testimonial />
            <Footer />
        </div>
    );
}

