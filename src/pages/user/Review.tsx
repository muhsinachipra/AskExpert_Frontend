// frontend\src\pages\user\Review.tsx

import { useEffect, useState } from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSingleAppointmentDataQuery, useReviewMutation } from '../../slices/api/userApiSlice';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { MyError } from '../../validation/validationTypes';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

const Review = () => {

    const { appointmentId } = useParams();
    const { data, error, isLoading: loadingAppointment } = useGetSingleAppointmentDataQuery(appointmentId || '');
    const appointmentData = data?.data
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const userId = userInfo?._id || '';
    const expertId = appointmentData?.expertId || '';
    const [review, { isLoading: submitting }] = useReviewMutation();
    const navigate = useNavigate()
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (error) {
            toast.error('Error fetching appointment data');
        }
    }, [error]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const values = { userId, expertId, rating, feedback, appointmentId: appointmentId || '' };
            const res = await review(values).unwrap();
            navigate('/home');
            toast.success(res.message);
        } catch (err) {
            toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
        }
    };

    if (loadingAppointment) {
        return (
            <>
                <Header />
                <section className="h-[80vh] flex flex-col justify-center items-center px-16 pt-24 pb-20 text-4xl font-bold leading-10 text-center bg-stone-50 text-neutral-700 max-md:px-5 max-md:max-w-full">
                    <Spinner />
                </section>
                <Footer />
            </>
        );
    }

    if (error || !appointmentData) {
        return (
            <>
                <Header />
                <section className="h-[80vh] flex flex-col justify-center items-center px-16 pt-24 pb-20 text-4xl font-bold leading-10 text-center bg-stone-50 text-neutral-700 max-md:px-5 max-md:max-w-full">
                    <h1>Error fetching appointment data</h1>
                </section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <section className="h-[80vh] flex flex-col justify-center items-center px-16 pt-24 pb-20 text-4xl font-bold leading-10 text-center bg-stone-50 text-neutral-700 max-md:px-5 max-md:max-w-full">
                <h1>Rate Your Experience</h1>
                <form onSubmit={handleSubmit} className="mt-10 flex flex-col items-center w-full max-w-md">
                    <label className="mb-4 text-xl">
                        Rating (1-5):
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}  // Parse the value as a number
                            min="1"
                            max="5"
                            required
                            className="ml-2 p-2 border border-gray-300 rounded"
                        />
                    </label>
                    <label className="mb-4 text-xl">
                        Feedback:
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="ml-2 p-2 border border-gray-300 rounded w-full h-24"
                        ></textarea>
                    </label>
                    <button type="submit" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded" disabled={submitting}>
                        {submitting ? <Spinner /> : 'Submit'}
                    </button>
                </form>
            </section>
            <Footer />
        </>
    );
};

export default Review;


// // frontend\src\pages\user\Review.tsx

// import Footer from "../../components/Footer"
// import Header from "../../components/Header"

// function Review() {
//     return (
//         <>
//             <Header />
//             <section className="h-[80vh] flex flex-col justify-center items-center px-16 pt-24 pb-20 text-4xl font-bold leading-10 text-center bg-stone-50 text-neutral-700 max-md:px-5 max-md:max-w-full">
//                 Rate Your Experience
//             </section>
//             <Footer />
//         </>
//     )
// }

// export default Review
