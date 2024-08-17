// frontend\src\pages\user\SelectExpert.tsx

import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import UserHeader from "../../components/user/UserHeader";
import ExpertListCard from "../../components/user/ExpertCard";
import { useGetExpertsByCategoryQuery } from "../../slices/api/userApiSlice";

function SelectExpert() {

    const { categoryName } = useParams();
    // console.log('categoryName : ',categoryName)
    const { data, error, isLoading } = useGetExpertsByCategoryQuery(categoryName || '');
    const expertsData = data?.data

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading experts</div>;
    }

    return (
        <>
            <UserHeader />
            <div className="container mx-auto mt-10 mb-10">
                <div className="text-4xl ml-5 md:ml-0 font-bold mb-6">Experts</div>
               
                <div className="space-y-4">
                   
                    {expertsData?.length === 0 && (
                        <div className="text-4xl font-bold mt-14 mb-6 text-center text-gray-500">No experts found.</div>
                    )}
                    {expertsData?.map((expert) => (
                        <ExpertListCard
                            key={expert._id}
                            name={expert.name}
                            experience={expert.experience}
                            averageRating={expert.averageRating}
                            image={expert.profilePic}
                            expertId={expert._id}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SelectExpert;
