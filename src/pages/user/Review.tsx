// frontend\src\pages\user\Review.tsx

import { useEffect, useState } from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSingleAppointmentDataQuery, useReviewMutation, useReportMutation } from '../../slices/api/userApiSlice';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { MyError } from '../../validation/validationTypes';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import { FaStar } from 'react-icons/fa';

const Review = () => {

    const { appointmentId } = useParams();
    const { data, error, isLoading: loadingAppointment } = useGetSingleAppointmentDataQuery(appointmentId || '');
    const appointmentData = data?.data
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const userId = userInfo?._id || '';
    const expertId = appointmentData?.expertId || '';
    const [review, { isLoading: submittingReview }] = useReviewMutation();
    const [report, { isLoading: submittingReport }] = useReportMutation();
    const navigate = useNavigate()
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [reportMisconduct, setReportMisconduct] = useState(false);
    const [misconductReport, setMisconductReport] = useState('');


    useEffect(() => {
        if (error) {
            toast.error('Error fetching appointment data');
        }
    }, [error]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error('Rating is required');
            return;
        }
        try {

            if (reportMisconduct && misconductReport) {
                const reportValues = { userId, expertId, reason: misconductReport };
                await report(reportValues).unwrap();
                toast.success('Misconduct report submitted');
            }

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
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6">Rate Your Experience</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <FaStar
                                    key={index}
                                    className="cursor-pointer transition-colors duration-200 mx-1 text-3xl"
                                    color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                                    onClick={() => setRating(ratingValue)}
                                />
                            );
                        })}
                    </div>
                    <div>
                        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                            Feedback
                        </label>
                        <textarea
                            id="feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                            rows={4}
                        ></textarea>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="reportMisconduct"
                            checked={reportMisconduct}
                            onChange={(e) => setReportMisconduct(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="reportMisconduct" className="ml-2 block text-sm text-gray-900">
                            Report Misconduct
                        </label>
                    </div>
                    {reportMisconduct &&
                        <div>
                            <label htmlFor="misconductReport" className="block text-sm font-medium text-gray-700 mb-2">
                                Descripsion will be send to the admin for review:
                            </label>
                            <textarea
                                id="misconductReport"
                                value={misconductReport}
                                onChange={(e) => setMisconductReport(e.target.value)}
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                                rows={4}
                            ></textarea>
                        </div>
                    }

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                        disabled={submittingReview || submittingReport}
                    >
                        {(submittingReview || submittingReport) ? <Spinner /> : 'Submit Review'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Review;




// // frontend\src\pages\user\Review.tsx

// import { useEffect, useState } from 'react';
// import Footer from "../../components/Footer";
// import Header from "../../components/Header";
// import { useNavigate, useParams } from 'react-router-dom';
// import { useGetSingleAppointmentDataQuery, useReviewMutation, useReportMutation } from '../../slices/api/userApiSlice';
// import { RootState } from '../../app/store';
// import { useSelector } from 'react-redux';
// import { MyError } from '../../validation/validationTypes';
// import { toast } from 'react-toastify';
// import Spinner from '../../components/Spinner';

// const Review = () => {

//     const { appointmentId } = useParams();
//     const { data, error, isLoading: loadingAppointment } = useGetSingleAppointmentDataQuery(appointmentId || '');
//     const appointmentData = data?.data
//     const { userInfo } = useSelector((state: RootState) => state.auth);
//     const userId = userInfo?._id || '';
//     const expertId = appointmentData?.expertId || '';
//     const [review, { isLoading: submittingReview }] = useReviewMutation();
//     const [report, { isLoading: submittingReport }] = useReportMutation();
//     const navigate = useNavigate()
//     const [rating, setRating] = useState(0);
//     const [feedback, setFeedback] = useState('');
//     const [reportMisconduct, setReportMisconduct] = useState(false);
//     const [misconductReport, setMisconductReport] = useState('');

//     useEffect(() => {
//         if (error) {
//             toast.error('Error fetching appointment data');
//         }
//     }, [error]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {

//             if (reportMisconduct && misconductReport) {
//                 const reportValues = { userId, expertId, reason: misconductReport };
//                 await report(reportValues).unwrap();
//                 toast.success('Misconduct report submitted');
//             }

//             const values = { userId, expertId, rating, feedback, appointmentId: appointmentId || '' };
//             const res = await review(values).unwrap();
//             navigate('/home');
//             toast.success(res.message);
//         } catch (err) {
//             toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
//         }
//     };

//     if (loadingAppointment) {
//         return (
//             <>
//                 <Header />
//                 <section className="h-[80vh] flex flex-col justify-center items-center px-16 pt-24 pb-20 text-4xl font-bold leading-10 text-center bg-stone-50 text-neutral-700 max-md:px-5 max-md:max-w-full">
//                     <Spinner />
//                 </section>
//                 <Footer />
//             </>
//         );
//     }

//     if (error || !appointmentData) {
//         return (
//             <>
//                 <Header />
//                 <section className="h-[80vh] flex flex-col justify-center items-center px-16 pt-24 pb-20 text-4xl font-bold leading-10 text-center bg-stone-50 text-neutral-700 max-md:px-5 max-md:max-w-full">
//                     <h1>Error fetching appointment data</h1>
//                 </section>
//                 <Footer />
//             </>
//         );
//     }

//     return (
//         <>
//             <Header />
//             <section className="h-[80vh] flex flex-col justify-center items-center px-16 pt-24 pb-20 text-4xl font-bold leading-10 text-center bg-stone-50 text-neutral-700 max-md:px-5 max-md:max-w-full">
//                 <h1>Rate Your Experience</h1>
//                 <form onSubmit={handleSubmit} className="mt-10 flex flex-col items-center w-full max-w-md">
//                     <label className="mb-4 text-xl">
//                         Rating (1-5):
//                         <input
//                             type="number"
//                             value={rating}
//                             onChange={(e) => setRating(parseInt(e.target.value))}
//                             min="1"
//                             max="5"
//                             required
//                             className="ml-2 p-2 border border-gray-300 rounded"
//                         />
//                     </label>
//                     <label className="mb-4 text-xl">
//                         Feedback:
//                         <textarea
//                             value={feedback}
//                             onChange={(e) => setFeedback(e.target.value)}
//                             className="ml-2 p-2 border border-gray-300 rounded w-full h-24"
//                         ></textarea>
//                     </label>
//                     <label className="mb-4 text-xl flex items-center">
//                         <input
//                             type="checkbox"
//                             checked={reportMisconduct}
//                             onChange={(e) => setReportMisconduct(e.target.checked)}
//                             className="mr-2"
//                         />
//                         Report Misconduct
//                     </label>
//                     {reportMisconduct && (
//                         <label className="mb-4 text-xl">
//                             Descripsion will be send to the admin for review:
//                             <textarea
//                                 value={misconductReport}
//                                 onChange={(e) => setMisconductReport(e.target.value)}
//                                 className="ml-2 p-2 border border-gray-300 rounded w-full h-24"
//                                 placeholder="Describe any misconduct during the video call"
//                             ></textarea>
//                         </label>
//                     )}
//                     <button type="submit" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded" disabled={submittingReview || submittingReport}>
//                         {(submittingReview || submittingReport) ? <Spinner /> : 'Submit'}
//                     </button>
//                 </form>
//             </section>
//             <Footer />
//         </>
//     );
// };

// export default Review;
