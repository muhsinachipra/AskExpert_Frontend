// frontend\src\components\admin\Table.tsx

import { useGetExpertDataQuery, useUpdateExpertVerificationMutation } from "../../slices/api/adminApiSlice";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const getStatusClassName = (isVerified: boolean): string => {
    return isVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
};


export default function AdminTable() {
    const { data, refetch, error, isLoading } = useGetExpertDataQuery();
    const [updateExpertVerification] = useUpdateExpertVerificationMutation();

    const handleVerificationToggle = async (expertId: string, isVerified: boolean) => {
        try {
            const res = await updateExpertVerification({ expertId, isVerified: !isVerified });
            console.log('response data :', res)
            refetch();
        } catch (error) {
            console.error("Failed to update expert verification status", error);
        }
    };

    if (isLoading) return <Spinner />;
    if (error) return <div>Error loading experts</div>;

    const experts = data?.data.data ?? [];

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Expert List</strong>
            <div className="overflow-x-auto mt-3">
                <table className="w-full text-left text-gray-700">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Resume</th>
                            <th className="p-2">Category</th>
                            <th className="p-2">Experience</th>
                            <th className="p-2">Rating</th>
                            <th className="p-2">Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {experts.length > 0 ? (
                            experts.map((expert) => (
                                <tr key={expert._id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{expert.name}</td>
                                    <td className="p-2">{expert.email}</td>
                                    <td className="p-2 max-w-xs truncate">
                                        <Link to={`${expert.resume}`} className="text-blue-600 hover:underline ellipsis">
                                            #{expert.resume}
                                        </Link>
                                    </td>
                                    <td className="p-2">{expert.category}</td>
                                    <td className="p-2">{expert.experience} years</td>
                                    <td className="p-2">{expert.rating}</td>
                                    <td className="p-2">
                                        <button
                                            className={`inline-block px-2 py-1 rounded ${getStatusClassName(expert.isVerified)}`}
                                            onClick={() => handleVerificationToggle(expert._id, expert.isVerified)}
                                        >
                                            {expert.isVerified ? 'Yes' : 'No'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="p-2 text-center">No experts found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}






// // import React from "react";
// import { useGetExpertDataQuery } from "../../slices/api/adminApiSlice";
// import Spinner from "../Spinner";
// // import { format } from "date-fns";
// import { Link } from "react-router-dom";

// const getStatusClassName = (isVerified: boolean): string => {
//     return isVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
// };

// export default function AdminTable() {
//     const { data: experts, error, isLoading } = useGetExpertDataQuery();
//     // const [expertData] = useGetExpertDataQuery();

//     if (isLoading) return <Spinner />;
//     if (error) return <div>Error loading experts</div>;

//     return (
//         <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
//             <strong className="text-gray-700 font-medium">Expert List</strong>
//             <div className="overflow-x-auto mt-3">
//                 <table className="w-full text-left text-gray-700">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             <th className="p-2">ID</th>
//                             <th className="p-2">Name</th>
//                             <th className="p-2">Email</th>
//                             <th className="p-2">Category</th>
//                             <th className="p-2">Experience</th>
//                             <th className="p-2">Rating</th>
//                             <th className="p-2">Verified</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {experts && experts.length > 0 ? (
//                             experts.map((expert) => (
//                                 <tr key={expert._id} className="border-b hover:bg-gray-50">
//                                     <td className="p-2">
//                                         <Link to={`/expert/${expert._id}`} className="text-blue-600 hover:underline">
//                                             #{expert._id}
//                                         </Link>
//                                     </td>
//                                     <td className="p-2">{expert.name}</td>
//                                     <td className="p-2">{expert.email}</td>
//                                     <td className="p-2">{expert.category}</td>
//                                     <td className="p-2">{expert.experience} years</td>
//                                     <td className="p-2">{expert.rating}</td>
//                                     <td className="p-2">
//                                         <span className={`inline-block px-2 py-1 rounded ${getStatusClassName(expert.isVerified)}`}>
//                                             {expert.isVerified ? 'Yes' : 'No'}
//                                         </span>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={7} className="p-2 text-center">No experts found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }


// import { format } from 'date-fns'
// import { Link } from 'react-router-dom'

// interface Order {
//     id: string;
//     product_id: string;
//     customer_id: string;
//     customer_name: string;
//     order_date: string;
//     order_total: string;
//     current_order_status: string;
//     shipment_address: string;
// }

// const recentOrderData: Order[] = [
//     {
//         id: '1',
//         product_id: '4324',
//         customer_id: '23143',
//         customer_name: 'Shirley A. Lape',
//         order_date: '2022-05-17T03:24:00',
//         order_total: '$435.50',
//         current_order_status: 'PLACED',
//         shipment_address: 'Cottage Grove, OR 97424'
//     },
//     {
//         id: '7',
//         product_id: '7453',
//         customer_id: '96453',
//         customer_name: 'Ryan Carroll',
//         order_date: '2022-05-14T05:24:00',
//         order_total: '$96.35',
//         current_order_status: 'CONFIRMED',
//         shipment_address: 'Los Angeles, CA 90017'
//     },
//     {
//         id: '2',
//         product_id: '5434',
//         customer_id: '65345',
//         customer_name: 'Mason Nash',
//         order_date: '2022-05-17T07:14:00',
//         order_total: '$836.44',
//         current_order_status: 'SHIPPED',
//         shipment_address: 'Westminster, CA 92683'
//     },
//     {
//         id: '3',
//         product_id: '9854',
//         customer_id: '87832',
//         customer_name: 'Luke Parkin',
//         order_date: '2022-05-16T12:40:00',
//         order_total: '$334.50',
//         current_order_status: 'SHIPPED',
//         shipment_address: 'San Mateo, CA 94403'
//     },
//     {
//         id: '4',
//         product_id: '8763',
//         customer_id: '09832',
//         customer_name: 'Anthony Fry',
//         order_date: '2022-05-14T03:24:00',
//         order_total: '$876.00',
//         current_order_status: 'OUT_FOR_DELIVERY',
//         shipment_address: 'San Mateo, CA 94403'
//     },
//     {
//         id: '5',
//         product_id: '5627',
//         customer_id: '97632',
//         customer_name: 'Ryan Carroll',
//         order_date: '2022-05-14T05:24:00',
//         order_total: '$96.35',
//         current_order_status: 'DELIVERED',
//         shipment_address: 'Los Angeles, CA 90017'
//     }
// ];

// const getStatusClassName = (status: string): string => {
//     switch (status) {
//         case 'PLACED':
//             return 'bg-blue-100 text-blue-600';
//         case 'CONFIRMED':
//             return 'bg-yellow-100 text-yellow-600';
//         case 'SHIPPED':
//             return 'bg-green-100 text-green-600';
//         case 'OUT_FOR_DELIVERY':
//             return 'bg-orange-100 text-orange-600';
//         case 'DELIVERED':
//             return 'bg-gray-100 text-gray-600';
//         default:
//             return '';
//     }
// };

// export default function AdminTable() {
//     return (
//         <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
//             <strong className="text-gray-700 font-medium">Recent Orders</strong>
//             <div className="overflow-x-auto mt-3">
//                 <table className="w-full text-left text-gray-700">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             <th className="p-2">ID</th>
//                             <th className="p-2">Product ID</th>
//                             <th className="p-2">Customer Name</th>
//                             <th className="p-2">Order Date</th>
//                             <th className="p-2">Order Total</th>
//                             <th className="p-2">Shipping Address</th>
//                             <th className="p-2">Order Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {recentOrderData.map((order) => (
//                             <tr key={order.id} className="border-b hover:bg-gray-50">
//                                 <td className="p-2">
//                                     <Link to={`/order/${order.id}`} className="text-blue-600 hover:underline">
//                                         #{order.id}
//                                     </Link>
//                                 </td>
//                                 <td className="p-2">
//                                     <Link to={`/product/${order.product_id}`} className="text-blue-600 hover:underline">
//                                         #{order.product_id}
//                                     </Link>
//                                 </td>
//                                 <td className="p-2">
//                                     <Link to={`/customer/${order.customer_id}`} className="text-blue-600 hover:underline">
//                                         {order.customer_name}
//                                     </Link>
//                                 </td>
//                                 <td className="p-2">{format(new Date(order.order_date), 'dd/MM/yyyy')}</td>
//                                 <td className="p-2">{order.order_total}</td>
//                                 <td className="p-2">{order.shipment_address}</td>
//                                 <td className="p-2">
//                                     <span className={`inline-block px-2 py-1 rounded ${getStatusClassName(order.current_order_status)}`}>
//                                         {order.current_order_status.replace(/_/g, ' ')}
//                                     </span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }
