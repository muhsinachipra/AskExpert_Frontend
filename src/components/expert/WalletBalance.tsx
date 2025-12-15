// frontend\src\components\expert\WalletBalance.tsx

interface WalletBalanceProps {
    balance: number;
}

const WalletBalance = ({ balance }: WalletBalanceProps) => {
    return (
        <div className="bg-white shadow-md rounded p-4 mb-4">
            <h2 className="text-xl font-semibold">Current Balance</h2>
            <p className="text-2xl text-green-500">&#8377; {balance.toFixed(2)}</p>
        </div>
    );
}

export default WalletBalance