// frontend\src\components\admin\Table.tsx

import { format } from 'date-fns'
import { Link } from 'react-router-dom'

interface Order {
    id: string;
    product_id: string;
    customer_id: string;
    customer_name: string;
    order_date: string;
    order_total: string;
    current_order_status: string;
    shipment_address: string;
}

const recentOrderData: Order[] = [
    {
        id: '1',
        product_id: '4324',
        customer_id: '23143',
        customer_name: 'Shirley A. Lape',
        order_date: '2022-05-17T03:24:00',
        order_total: '$435.50',
        current_order_status: 'PLACED',
        shipment_address: 'Cottage Grove, OR 97424'
    },
    {
        id: '7',
        product_id: '7453',
        customer_id: '96453',
        customer_name: 'Ryan Carroll',
        order_date: '2022-05-14T05:24:00',
        order_total: '$96.35',
        current_order_status: 'CONFIRMED',
        shipment_address: 'Los Angeles, CA 90017'
    },
    {
        id: '2',
        product_id: '5434',
        customer_id: '65345',
        customer_name: 'Mason Nash',
        order_date: '2022-05-17T07:14:00',
        order_total: '$836.44',
        current_order_status: 'SHIPPED',
        shipment_address: 'Westminster, CA 92683'
    },
    {
        id: '3',
        product_id: '9854',
        customer_id: '87832',
        customer_name: 'Luke Parkin',
        order_date: '2022-05-16T12:40:00',
        order_total: '$334.50',
        current_order_status: 'SHIPPED',
        shipment_address: 'San Mateo, CA 94403'
    },
    {
        id: '4',
        product_id: '8763',
        customer_id: '09832',
        customer_name: 'Anthony Fry',
        order_date: '2022-05-14T03:24:00',
        order_total: '$876.00',
        current_order_status: 'OUT_FOR_DELIVERY',
        shipment_address: 'San Mateo, CA 94403'
    },
    {
        id: '5',
        product_id: '5627',
        customer_id: '97632',
        customer_name: 'Ryan Carroll',
        order_date: '2022-05-14T05:24:00',
        order_total: '$96.35',
        current_order_status: 'DELIVERED',
        shipment_address: 'Los Angeles, CA 90017'
    }
];

const getStatusClassName = (status: string): string => {
    switch (status) {
        case 'PLACED':
            return 'bg-blue-100 text-blue-600';
        case 'CONFIRMED':
            return 'bg-yellow-100 text-yellow-600';
        case 'SHIPPED':
            return 'bg-green-100 text-green-600';
        case 'OUT_FOR_DELIVERY':
            return 'bg-orange-100 text-orange-600';
        case 'DELIVERED':
            return 'bg-gray-100 text-gray-600';
        default:
            return '';
    }
};

export default function AdminTable() {
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Recent Orders</strong>
            <div className="overflow-x-auto mt-3">
                <table className="w-full text-left text-gray-700">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-2">ID</th>
                            <th className="p-2">Product ID</th>
                            <th className="p-2">Customer Name</th>
                            <th className="p-2">Order Date</th>
                            <th className="p-2">Order Total</th>
                            <th className="p-2">Shipping Address</th>
                            <th className="p-2">Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrderData.map((order) => (
                            <tr key={order.id} className="border-b hover:bg-gray-50">
                                <td className="p-2">
                                    <Link to={`/order/${order.id}`} className="text-blue-600 hover:underline">
                                        #{order.id}
                                    </Link>
                                </td>
                                <td className="p-2">
                                    <Link to={`/product/${order.product_id}`} className="text-blue-600 hover:underline">
                                        #{order.product_id}
                                    </Link>
                                </td>
                                <td className="p-2">
                                    <Link to={`/customer/${order.customer_id}`} className="text-blue-600 hover:underline">
                                        {order.customer_name}
                                    </Link>
                                </td>
                                <td className="p-2">{format(new Date(order.order_date), 'dd/MM/yyyy')}</td>
                                <td className="p-2">{order.order_total}</td>
                                <td className="p-2">{order.shipment_address}</td>
                                <td className="p-2">
                                    <span className={`inline-block px-2 py-1 rounded ${getStatusClassName(order.current_order_status)}`}>
                                        {order.current_order_status.replace(/_/g, ' ')}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
