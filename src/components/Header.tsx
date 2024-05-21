import { Link, useNavigate } from "react-router-dom";


const navItems = [
    { label: "Home", href: "/", current: false },
    { label: "About Us", href: "/about", current: false },
    { label: "Contact Us", href: "/contact", current: false },
];

export default function Header() {

    const navigate = useNavigate();

    const handleLoginButtonClick = () => {
        navigate("/login");
    };


    return (
        <header className="bg-neutral-200 py-4 flex gap-5 justify-between self-center w-full max-md:flex-wrap">
            <div className="flex gap-3 ml-2 px-5 my-auto text-3xl font-semibold leading-8 text-black whitespace-nowrap">
                <img loading="lazy" src="/Ask.svg" alt="AskExperts logo" className="shrink-0 self-start aspect-[1.03] w-[30px]" />
                <div>AskExpert</div>
            </div>
            <nav className="flex gap-5 pl-20 text-lg text-center max-md:flex-wrap">

                {navItems.map((item) => (
                    <Link key={item.label} to={item.href} className={`justify-center px-0.5 py-1 my-auto text-neutral-700 font-medium`}>
                        {item.label}
                    </Link>
                ))}
                <button type="button" onClick={handleLoginButtonClick} className="justify-center mr-4 px-5 py-2 rounded-full  font-semibold text-white capitalize bg-indigo-500 max-md:px-9">
                    Log in
                </button>
            </nav>
        </header>
    )
}