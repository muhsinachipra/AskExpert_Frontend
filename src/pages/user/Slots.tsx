// frontend\src\pages\user\Slots.tsx

import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SlotCard from "../../components/user/SlotCard";
import { useGetExpertSlotsQuery } from "../../slices/api/userApiSlice";


function Slots() {
    const { expertId } = useParams();
    const { data, error, isLoading } = useGetExpertSlotsQuery(expertId || '');

    const slotData = data?.data
    console.log(slotData)

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading experts</div>;
    }

    if (!slotData) {
        return <div>No slots available</div>;
    }

    return (
        <>
            <Header />
            <div className="container h-screen mx-auto mt-10">
                <div className="text-4xl font-bold mb-6">Slots</div>
                <div className="space-y-4">
                    {slotData && slotData.length > 0 ? (
                        slotData.map((slot) => (
                            <SlotCard
                                key={slot._id}
                                time={slot.time}
                                price={slot.price}
                                slotId={slot._id}
                            />
                        ))
                    ) : (
                        <div className="pt-5 text-3xl font-bold mb-6">No slots available</div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Slots