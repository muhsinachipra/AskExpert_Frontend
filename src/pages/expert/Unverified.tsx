// frontend\src\pages\expert\Unverified.tsx

import Footer from "../../components/Footer";
import ExpertHeader from "../../components/expert/ExpertHeader";

export default function Unverified() {

    return (
        <div className="flex flex-col">
            <ExpertHeader/>
            <UnverifiedMessage />
            <Footer />
        </div>
    );
}

function UnverifiedMessage() {
    return (
        <section className="h-[80vh] flex flex-col justify-center items-center px-16 pt-24 pb-20 text-4xl font-bold leading-10 text-center bg-stone-50 text-neutral-700 max-md:px-5 max-md:max-w-full">
            "Your Application is sent to the admin. You will get an email when verified."
        </section>
    );
}
