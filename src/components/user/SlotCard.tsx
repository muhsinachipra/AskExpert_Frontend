// frontend\src\components\user\SlotCard.tsx

import { loadStripe, Stripe } from "@stripe/stripe-js";
import { usePaymentMutation } from '../../slices/api/userApiSlice';

const public_stripe_key = import.meta.env.VITE_STRIPE_PUBLIC_KET;

type SlotCardProps = {
    time: string;
    date: string;
    price: number;
    slotId: string;
    userId: string;
    userName: string;
};

const SlotCard = ({ time, date, price, slotId, userId, userName }: SlotCardProps) => {

    const [payment] = usePaymentMutation();

    const handlePayment = async (price: number, slotId: string, userId: string, userName: string) => {
        console.log('public_stripe_key : ', public_stripe_key)
        const stripePromise: Stripe | null = await loadStripe(public_stripe_key);

        const response = await payment({
            amount: price,
            appointmentId: slotId,
            userId: userId,
            userName: userName
        }).unwrap();
        console.log('response from payment mutation : ', response)
        const session = response;

        if (stripePromise) {
            stripePromise.redirectToCheckout({
                sessionId: session.data,
            });
        } else {
            console.error("Failed to initialize Stripe");
        }
    };

    return (
        <main className="flex flex-col gap-5 md:flex-row justify-between px-5 py-11 bg-white max-md:flex-wrap md:px-11 max-md:py-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex flex-col self-start">
                <div className="flex items-center gap-2 mt-2 text-3xl font-extrabold tracking-wide leading-6 text-gray-800">
                    <time dateTime={time}>{time}</time>
                </div>
                <div className="mt-2 text-xl font-semibold text-gray-600">
                    <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
                </div>
            </div>
            <button onClick={() => handlePayment(price, slotId, userId, userName)}
                className="flex gap-2 items-center justify-center px-10 py-4 text-2xl font-semibold text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition duration-300 ease-in-out max-md:px-5 max-md:py-3">
                <span>Pay {price} ₹</span>
            </button>
        </main>
    );
};

export default SlotCard;
