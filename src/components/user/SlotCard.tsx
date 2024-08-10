// frontend\src\components\user\SlotCard.tsx

import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useGetUserDataQuery, usePaymentMutation, useWalletPaymentMutation } from '../../slices/api/userApiSlice';
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { MyError } from "../../validation/validationTypes";

const public_stripe_key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

type SlotCardProps = {
    startTime: string;
    endTime: string;
    date: string;
    price: number;
    slotId: string;
    userId: string;
    userName: string;
};

const SlotCard = ({ startTime, endTime, date, price, slotId, userId, userName }: SlotCardProps) => {

    const [payment] = usePaymentMutation();
    const [walletPayment] = useWalletPaymentMutation();
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'wallet' | 'stripe' | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const { data } = useGetUserDataQuery();
    const walletAmount = data?.data.wallet


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowPaymentOptions(false);
                setSelectedPaymentMethod(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleStripePayment = async (price: number, slotId: string, userId: string, userName: string) => {
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

    const handleWalletPayment = async () => {
        try {
            const response = await walletPayment({ userId, amount: price, userName, appointmentId: slotId }).unwrap();
            console.log('response from wallet payment: ', response);
            if (response.success) {
                toast.success('Payment successful');
            }
            setShowPaymentOptions(false);
            setSelectedPaymentMethod(null);
        } catch (error) {
            toast.error((error as MyError)?.data?.message || (error as MyError)?.error);
            console.error('Error processing wallet payment: ', error);
        }
    };

    // Error deducting amount from wallet: Error: Insufficient wallet balance

    const handlePaymentMethodSelection = (method: 'wallet' | 'stripe') => {
        setSelectedPaymentMethod(method);

        if (method === 'stripe') {
            handleStripePayment(price, slotId, userId, userName);
        }
    };

    return (
        <main className="flex flex-col gap-5 md:flex-row justify-between mx-3 md:mx-0 px-5 py-11 bg-white max-md:flex-wrap md:px-11 max-md:py-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex flex-col self-start">
                <div className="flex items-center gap-2 mt-2 text-3xl font-bold tracking-wide leading-6 text-gray-800">
                    <time dateTime={startTime}>{startTime} - {endTime}</time>
                </div>
                <div className="mt-2 text-xl font-semibold text-gray-600">
                    <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
                </div>
            </div>
            <button onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                className="flex gap-2 items-center justify-center px-10 py-4 text-2xl font-semibold text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition duration-300 ease-in-out max-md:px-5 max-md:py-3">
                <span>Pay {price} ₹</span>
            </button>

            {showPaymentOptions && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg">
                        {!selectedPaymentMethod ? (
                            <>
                                <h2 className="text-2xl font-semibold mb-4">Choose Payment Method</h2>
                                <button
                                    onClick={() => handlePaymentMethodSelection('wallet')}
                                    className="block w-full px-4 py-2 mb-2 text-xl font-semibold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                >
                                    Pay with Wallet
                                </button>
                                <button
                                    onClick={() => handlePaymentMethodSelection('stripe')}
                                    className="block w-full px-4 py-2 text-xl font-semibold text-center text-white bg-green-500 rounded-lg hover:bg-green-600"
                                >
                                    Pay with Stripe
                                </button>
                            </>
                        ) : selectedPaymentMethod === 'wallet' ? (
                            <>
                                <h2 className="text-2xl font-semibold mb-4">Confirm Wallet Payment</h2>
                                <p className="mb-4">Wallet Amount: {walletAmount} ₹</p>
                                <p className="mb-4">Payment Amount: {price} ₹</p>
                                <button
                                    onClick={handleWalletPayment}
                                    className="block w-full px-4 py-2 text-xl font-semibold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                >
                                    Confirm Payment
                                </button>
                            </>
                        ) : null}
                        {/* <h2 className="text-2xl font-semibold mb-4">Choose Payment Method</h2>
                        <button
                            onClick={() => handlePaymentMethodSelection('wallet')}
                            className="block w-full px-4 py-2 mb-2 text-xl font-semibold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                            Pay with Wallet
                        </button>
                        <button
                            onClick={() => handlePaymentMethodSelection('stripe')}
                            className="block w-full px-4 py-2 text-xl font-semibold text-center text-white bg-green-500 rounded-lg hover:bg-green-600"
                        >
                            Pay with Stripe
                        </button> */}
                    </div>
                </div>
            )}
        </main>
    );
};

export default SlotCard;
