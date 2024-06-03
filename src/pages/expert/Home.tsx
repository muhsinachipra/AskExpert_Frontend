import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { RootState } from "../../app/store";

export default function Home() {
    const { expertInfo } = useSelector((state: RootState) => state.auth);
    const isVerified = expertInfo?.isVerified;

    return (
        <div className="flex flex-col">
            <Header isExpertPage={true} />
            {isVerified ? <VerifiedMessage /> : <UnverifiedMessage />}
            <Footer />
        </div>
    );
}

function VerifiedMessage() {
    return (
        <div className="h-[80vh] flex flex-col justify-center items-center px-16 pt-24 pb-20 text-4xl font-bold leading-10 text-center bg-stone-50 text-neutral-700 max-md:px-5 max-md:max-w-full">
            Welcome home
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
