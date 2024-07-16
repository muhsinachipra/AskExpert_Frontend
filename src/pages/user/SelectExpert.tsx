// frontend\src\pages\user\SelectExpert.tsx

import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
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
            <Header />
            <div className="container h-screen mx-auto mt-10">
                <div className="text-4xl font-bold mb-6">Experts</div>
                {/* <div className="flex justify-center mb-6">
                    <input
                        type="text"
                        placeholder="Search an Expert"
                        className="border border-gray-300 p-2 w-1/2 rounded-l"
                    />
                    <button className="bg-blue-500 text-white p-2 rounded-r">Search</button>
                </div> */}
                <div className="space-y-4">
                    {/* {expertsData.map((expert, index) => (
                        <ExpertListCard
                            key={index}
                            name={expert.name}
                            experience={expert.experience}
                            rating={expert.rating}
                            fee={expert.fee}
                            image={expert.image}
                        />
                    ))} */}
                    {expertsData?.length === 0 && (
                        <div className="text-4xl font-bold mt-14 mb-6 text-center text-gray-500">No experts found.</div>
                    )}
                    {expertsData?.map((expert) => (
                        <ExpertListCard
                            key={expert._id}
                            name={expert.name}
                            experience={expert.experience}
                            rating={expert.rating}
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
