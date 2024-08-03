// frontend\src\pages\user\Slots.tsx

import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SlotCard from "../../components/user/SlotCard";
import { useGetExpertSlotsQuery } from "../../slices/api/userApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { formatTimeTo12Hour } from "../../lib/utils";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";


function Slots() {

    const { userInfo } = useSelector((state: RootState) => state.auth);
    const userId = userInfo?._id
    const userName = userInfo?.name


    const { expertId } = useParams();
    const [page, setPage] = useState(1);
    const [limit] = useState(4);

    const { data, error, isLoading } = useGetExpertSlotsQuery({ expertId: expertId || '', page, limit });
    const slotData = data?.data;
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / limit);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading experts</div>;
    }

    return (
        <>
            <Header />
            <div className="container mx-auto mt-10 min-h-[100vh]">
                <div className="text-4xl font-bold mb-6">Slots</div>
                <div className="space-y-4">
                    {error && <div className="pt-5 text-2xl font-bold mb-6">Error loading Data</div>}
                    {isLoading && <Spinner />}
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
                <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            </div>
            <Footer />
        </>
    );
}

export default Slots