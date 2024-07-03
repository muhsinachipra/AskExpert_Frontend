// frontend\src\components\user\SlotCard.tsx

import { loadStripe, Stripe } from "@stripe/stripe-js";
import { usePaymentMutation } from '../../slices/api/userApiSlice';

// const public_stripe_key = import.meta.env.VITE_STRIPE_PUBLIC_KET;
const public_stripe_key = "pk_test_51PY3OcCy9Ll9nYU0E9GFjPOCRy4NCco8fmJ5wb0RILRHtvDJtqPWtLw8E5HYLcQbRELm2eLDo423hLOnnynvH97t00KLnwwQFx";


type SlotCardProps = {
    time: string;
    price: number;
    slotId: string;
};

const SlotCard = ({ time, price, slotId }: SlotCardProps) => {

    const [payment] = usePaymentMutation();

    const handlePayment = async (price: number, slotId: string) => {
        console.log('public_stripe_key : ', public_stripe_key)
        const stripePromise: Stripe | null = await loadStripe(public_stripe_key);

        const response = await payment({
            amount: price,
            appointmentId: slotId,
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
        <main className="flex flex-col gap-5 md:flex-row justify-between px-5 py-11 bg-zinc-100 max-md:flex-wrap md:px-11 max-md:py-5 rounded-lg shadow-md">
            <div className="flex flex-col self-start">
                <div className="flex items-center gap-2 mt-2 text-3xl font-extrabold tracking-wide leading-6 text-zinc-600">
                    <time dateTime="20:00">{time}</time>
                </div>
            </div>
            <button onClick={() => handlePayment(price, slotId)}
                className="flex gap-2 items-center justify-center px-10 py-4 text-2xl font-semibold text-center text-white capitalize bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition duration-300 ease-in-out max-md:px-5 max-md:py-3">
                <span>Pay {price} ₹</span>
            </button>
        </main>
    );
};

export default SlotCard;
