// // frontend\src\components\Otp.tsx


// export default function OtpComponent() {
//     return (
//         <section className="bg-neutral-200 dark:bg-gray-900">
//             <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                 <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//                     <img className="w-8 h-8 mr-2" src="/Ask.svg" alt="logo" />
//                     AskExpert
//                 </a>
//                 <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                             OTP is sent to your mail
//                         </h1>
//                         <form className="space-y-4 md:space-y-6" action="#">
//                             <div>
//                                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
//                                 <input type="tel" onChange={(e) => setOtp(e.target.value)} name="email" id="email" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter OTP" required={true} />
//                             </div>
//                             <hr className="border-gray-300 dark:border-gray-600" />
//                             <button type="submit" onClick={submitRegisterHandler} className="w-full text-black border border-gray-300 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:text-white  dark:border-gray-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Verify</button>

//                             {showResendButton ?
//                                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                                     Don't get OTP ? <a onClick={resendOtpHandler} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Resent OTP</a>
//                                 </p>
//                                 :
//                                 <p className="mt-3 text-red-500">
//                                     {timer > 0 && `Resend OTP in ${timer} seconds`}
//                                 </p>
//                             }
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }




// frontend/src/components/Otp.tsx

interface OtpComponentProps {
    otp: string;
    setOtp: (otp: string) => void;
    submitRegisterHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
    resendOtpHandler: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    timer: number;
    showResendButton: boolean;
}

export default function OtpComponent({ otp, setOtp, submitRegisterHandler, resendOtpHandler, timer, showResendButton }: OtpComponentProps) {
    return (
        <section className="bg-neutral-200 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="/Ask.svg" alt="logo" />
                    AskExpert
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            OTP is sent to your mail
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                                <input type="tel" value={otp} onChange={(e) => setOtp(e.target.value)} name="otp" id="otp" className="bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter OTP" required={true} />
                            </div>
                            <hr className="border-gray-300 dark:border-gray-600" />
                            <button type="submit" onClick={submitRegisterHandler} className="w-full text-black border border-gray-300 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:text-white dark:border-gray-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Verify</button>

                            {showResendButton ?
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't get OTP? <a onClick={resendOtpHandler} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Resend OTP</a>
                                </p>
                                :
                                <p className="mt-3 text-red-500">
                                    {timer > 0 && `Resend OTP in ${timer} seconds`}
                                </p>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
