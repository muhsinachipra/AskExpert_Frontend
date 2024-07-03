// frontend\src\pages\user\Success.tsx

import Footer from "../../components/Footer";
import Header from "../../components/Header";


function Success() {

    return (
        <>
            <Header />
            <section className="h-[80vh] flex flex-col justify-center items-center px-16 pt-24 pb-20 text-4xl font-bold leading-10 text-center bg-stone-50 text-neutral-700 max-md:px-5 max-md:max-w-full">
                <img loading="lazy" src="/Success.svg" alt="AskExperts logo" className="w-1/5 pb-9" />
                Payment Successfull
            </section>
            <Footer />
        </>
    );
}

export default Success