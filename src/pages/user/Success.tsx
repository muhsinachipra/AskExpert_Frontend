// frontend\src\pages\user\Success.tsx

import Footer from "../../components/Footer";
import UserHeader from "../../components/user/UserHeader";
import animationData from "../../assets/SuccessAnimation.json";
import Lottie from "react-lottie-player";

function Success() {

    return (
        <>
            <UserHeader />
            <section className="h-[80vh] flex flex-col justify-center items-center px-16 pt-24 pb-20 text-4xl font-bold leading-10 text-center bg-white text-neutral-700 max-md:px-5 max-md:max-w-full">
                <Lottie
                    loop
                    animationData={animationData}
                    play
                    style={{ width: 200, height: 200 }}
                />
                Payment Successfull
            </section>
            <Footer />
        </>
    );
}

export default Success