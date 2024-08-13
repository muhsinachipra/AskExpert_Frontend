// frontend\src\pages\user\LandingPage.tsx

import CategoryCard from "../../components/CategoryCard";
import UserHeader from "../../components/user/UserHeader";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useUserGetCategoryDataQuery } from "../../slices/api/userApiSlice";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import HowItWorks from "../../components/user/landing/HowItWorks";
import Hero from "../../components/user/landing/Hero";
import Testimonial from "../../components/user/landing/Testimonial";
import BackToTop from "../../components/user/landing/BackToTop";


function Category() {
    const { data, error, isLoading } = useUserGetCategoryDataQuery({ page: 1, limit: 100 });
    const navigate = useNavigate();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const handleCategoryClick = (categoryName: string) => {
        navigate(`/experts/${categoryName}`);
    };

    const categoryData = data?.data;

    if (isLoading) {
        return <CategorySkeleton />;
    }

    if (error) {
        return <div>Error loading categories</div>;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section ref={ref}>
            <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <motion.div
                    className="flex justify-center max-md:mx-4 text-center mt-10 text-5xl font-bold"
                    variants={itemVariants}
                >
                    What category are you seeking help with?
                </motion.div>
                <div className="flex flex-col mx-14 my-7 max-md:mx-3 items-center">
                    {categoryData && data.total > 0 ? (
                        [...Array(Math.ceil(data.total / 3))].map((_, rowIndex) => (
                            <motion.div
                                key={rowIndex}
                                className="flex flex-row justify-center items-center max-md:flex-wrap"
                                variants={itemVariants}
                            >
                                {categoryData.slice(rowIndex * 3, rowIndex * 3 + 3).map((category, index) => (
                                    <CategoryCard
                                        key={index}
                                        imageSrc={category.categoryImage}
                                        title={category.categoryName}
                                        onClick={() => handleCategoryClick(category.categoryName)}
                                    />
                                ))}
                            </motion.div>
                        ))
                    ) : (
                        <div>No categories found</div>
                    )}
                </div>
            </motion.div>
        </section>
    );
}

function CategorySkeleton() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-gray-200 h-64 rounded-lg animate-pulse"></div>
                ))}
            </div>
        </div>
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
            <BackToTop />
        </div>
    );
}
