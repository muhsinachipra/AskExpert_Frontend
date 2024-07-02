// frontend\src\components\user\SlotCard.tsx

type SlotCardProps = {
    time: string;
    price: number;
};

const SlotCard = ({ time, price }: SlotCardProps) => {
    return (
        <main className="flex flex-col gap-5 md:flex-row justify-between px-5 py-11 bg-zinc-100 max-md:flex-wrap md:px-11 max-md:py-5 rounded-lg shadow-md">
            <div className="flex flex-col self-start">
                <div className="flex items-center gap-2 mt-2 text-3xl font-extrabold tracking-wide leading-6 text-zinc-600">
                    <time dateTime="20:00">{time}</time>
                </div>
            </div>
            <button className="flex gap-2 items-center justify-center px-10 py-4 text-2xl font-semibold text-center text-white capitalize bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition duration-300 ease-in-out max-md:px-5 max-md:py-3">
                <span>Pay {price} ₹</span>
            </button>
        </main>
    );
};

export default SlotCard;
