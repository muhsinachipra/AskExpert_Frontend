// frontend\src\pages\user\home\Home.tsx

import Footer from "../../../components/Footer";
import UserHeader from "../../../components/user/UserHeader";
import CategoryCard from "../../../components/CategoryCard";
import { useUserGetCategoryDataQuery } from "../../../slices/api/userApiSlice";
import { useNavigate } from "react-router-dom";

function Home() {
    const { data, error, isLoading } = useUserGetCategoryDataQuery({ page: 1, limit: 100 });
    const navigate = useNavigate();

    const categoryData = data?.data;

    const handleCategoryClick = (categoryName: string) => {
        navigate(`/experts/${categoryName}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading categories</div>;
    }

    return (
        <>
            <UserHeader />
            <div className="min-h-[100vh]">
                <div className="flex justify-center max-md:mx-4 text-center mt-10 text-5xl font-bold">
                    What category are you seeking help with?
                </div>
                <div className="flex flex-col mx-14 my-7 max-md:mx-3 items-center">
                    {categoryData && data.total > 0 ? (
                        [...Array(Math.ceil(data.total / 3))].map((_, rowIndex) => (
                            <div key={rowIndex} className="flex flex-row justify-center items-center max-md:flex-wrap">
                                {categoryData.slice(rowIndex * 3, rowIndex * 3 + 3).map((category, index) => (
                                    // <CategoryCard key={index} imageSrc={category.categoryImage} title={category.categoryName} />
                                    <CategoryCard
                                        key={index}
                                        imageSrc={category.categoryImage}
                                        title={category.categoryName}
                                        // params={category.categoryName}
                                        onClick={() => handleCategoryClick(category.categoryName)}
                                    />
                                ))}
                            </div>
                        ))
                    ) : (
                        <div>No categories found</div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
