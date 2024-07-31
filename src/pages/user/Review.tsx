// frontend\src\pages\user\Review.tsx

import Footer from "../../components/Footer"
import Header from "../../components/Header"

function Review() {
    return (
        <>
            <Header />
            <section className="h-[80vh] flex flex-col justify-center items-center px-16 pt-24 pb-20 text-4xl font-bold leading-10 text-center bg-stone-50 text-neutral-700 max-md:px-5 max-md:max-w-full">
                Rate Your Experience
            </section>
            <Footer />
        </>
    )
}

export default Review
