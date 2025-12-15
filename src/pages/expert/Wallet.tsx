// frontend\src\pages\expert\Wallet.tsx

import { useSelector } from "react-redux";
import TransactionList from "../../components/expert/TransactionList";
import WalletBalance from "../../components/expert/WalletBalance";
import Spinner from "../../components/Spinner";
import { useGetWalletDataQuery } from "../../slices/api/expertApiSlice";
import { RootState } from "../../app/store";
import { useState } from "react";
import Pagination from "../../components/Pagination";

export default function Wallet() {
    const { expertInfo } = useSelector((state: RootState) => state.auth);
    const [page, setPage] = useState(1);
    const [limit] = useState(4);
    const { data, error, isLoading } = useGetWalletDataQuery({ page, limit });
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / limit);
    const walletData = data?.data;

    console.log('walletData in expert page: ', walletData);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Wallet</h1>
            {isLoading && <Spinner />}
            {error && <span className="font-bold text-2xl text-gray-500 mt-4  mb-6 block">Some Error Happened</span>}
            {walletData?.length === 0 && <span className="font-bold text-2xl text-gray-500 mt-4  mb-6 block">No Wallet Data Found</span>}
            {walletData && (
                <>
                    <WalletBalance balance={expertInfo?.wallet || 0} />
                    <TransactionList walletData={walletData} />
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                </>
            )}
        </div>
    );
}
