// frontend\src\components\Header.tsx
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { useUserLogoutMutation } from "../slices/api/userApiSlice";
import { userLogout } from "../slices/authSlice";

const MySwal = withReactContent(Swal);

const navItems = [
    { label: "Home", href: "/", current: false },
    { label: "About Us", href: "/about", current: false },
    { label: "Contact Us", href: "/contact", current: false },
];

export default function Header() {

    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.userInfo);
    const [isOpen, setIsOpen] = useState(false);
    const name = isAuthenticated?.name
    const email = isAuthenticated?.email
    const dispatch = useDispatch();

    const [logout] = useUserLogoutMutation();

    const handleLogout = async () => {
        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            dispatch(userLogout())
            await logout('').unwrap();
            navigate('/login'); // Redirect to the login page
            MySwal.fire('Logged out!', 'You have been logged out successfully.', 'success');
        }
    }

    const toggleDropdown = () => {
        if (isAuthenticated) {
            setIsOpen(!isOpen);
        } else {
            navigate("/login");
        }
    };

    return (
        <header className="bg-neutral-200 py-4 flex gap-5 justify-between self-center w-full max-md:flex-wrap relative z-10">
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

                <div className="relative">
                    <button type="button" onClick={toggleDropdown} className="justify-center mr-4 px-5 py-2 rounded-full font-semibold text-white capitalize bg-indigo-500 max-md:px-9">
                        {isAuthenticated ? "Profile" : "Log in"}
                    </button>
                    {isAuthenticated && isOpen && (
                        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-20">
                            <div className="py-1">
                                <button type="button" className="flex items-center text-left w-full  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <span className="mr-3">😀</span>
                                    {name}<br />{email}
                                </button>
                                <button type="button" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <span className="mr-3">⚙</span>
                                    Edit profile
                                </button>
                                <button type="button" onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <span className="mr-3">🚪</span>
                                    Log out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

        </header>
    )
}










