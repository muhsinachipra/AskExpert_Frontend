// frontend\src\components\expert\TransactionList.tsx

import { IAppointment } from "../../types/domain";



const TransactionList = ({ walletData }: { walletData: IAppointment[] }) => {
    return (
        <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-semibold mb-2">Transactions</h2>
            <ul>
                {walletData.map(transaction => (
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                        <div>
                            <p className="text-sm text-gray-600">{transaction.date}</p>
                            <p className="text-lg">{transaction.userName}'s Payment</p>
                        </div>
                        <p className='text-lg text-green-500'>
                            &#8377; {transaction.price.toFixed(2)}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TransactionList
