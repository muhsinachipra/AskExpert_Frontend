// frontend\src\pages\user\Slots.tsx

import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SlotCard from "../../components/user/SlotCard";
import { useGetExpertSlotsQuery } from "../../slices/api/userApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { formatTimeTo12Hour } from "../../lib/utils";


function Slots() {

    const { userInfo } = useSelector((state: RootState) => state.auth);
    const userId = userInfo?._id
    const userName = userInfo?.name


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
            <div className="container mx-auto mt-10 min-h-[100vh]">
                <div className="text-4xl font-bold mb-6">Slots</div>
                <div className="space-y-4">
                    {slotData && slotData.length > 0 ? (
                        slotData.map((slot) => (
                            <SlotCard
                                key={slot._id}
                                startTime={formatTimeTo12Hour(slot.startTime)}
                                endTime={formatTimeTo12Hour(slot.endTime)}
                                date={slot.date}
                                price={slot.price}
                                slotId={slot._id}
                                userId={userId || ''}
                                userName={userName || ''}
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