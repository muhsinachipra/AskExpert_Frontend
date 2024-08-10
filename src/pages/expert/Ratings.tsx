// frontend\src\pages\expert\Ratings.tsx

import { useState } from "react";
import Pagination from "../../components/Pagination";
import { useExpertGetReviewsQuery } from "../../slices/api/expertApiSlice";
import { IReview } from "../../types/domain";
import Spinner from "../../components/Spinner";
import { format } from 'date-fns';

function Ratings() {
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const { data, error, isLoading } = useExpertGetReviewsQuery({ page, limit });
  const reviews = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  const tableHeaders = ["Date", "User", "Rating", "Feedback"];

  const renderRow = (review: IReview) => (
    <tr key={review._id} className="border-b hover:bg-gray-50">
      <td className="p-2">{review.appointmentId ? format(new Date(review.appointmentId.date), 'yyyy-MM-dd') : 'N/A'}</td>
      <td className="p-2">{review.userId.name}</td>
      <td className="p-2">{review.rating}</td>
      <td className="p-2">{review.feedback}</td>
    </tr>
  );

  return (
    <>
  <h1 className="font-bold text-2xl md:text-4xl mb-4 text-center md:text-left">User Ratings</h1>
  <div className="bg-white px-3 md:px-4 pt-3 pb-4 rounded-lg border border-gray-200 shadow-sm">
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full text-gray-700 text-sm md:text-base">
        <thead>
          <tr className="bg-gray-100 border-b">
            {tableHeaders.map((header, index) => (
              <th key={index} className="p-2 whitespace-nowrap">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={tableHeaders.length} className="text-center p-2"><Spinner /></td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={tableHeaders.length} className="text-center p-2 text-red-500">Error loading data</td>
            </tr>
          ) : reviews.length > 0 ? (
            reviews.map((review) => renderRow(review))
          ) : (
            <tr>
              <td colSpan={tableHeaders.length} className="text-center p-2">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  <div className="mt-4 flex justify-center md:justify-end">
    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
  </div>
</>

  );
}

export default Ratings;
