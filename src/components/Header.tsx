// frontend\src\components\Header.tsx

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useUserLogoutMutation } from "../slices/api/userApiSlice";
import { useExpertLogoutMutation } from "../slices/api/expertApiSlice";
import { expertLogout, userLogout } from "../slices/authSlice";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";

const MySwal = withReactContent(Swal);

interface HeaderProps {
    isExpertPage?: boolean;
}

export default function Header({ isExpertPage = false }: HeaderProps) {
    const navigate = useNavigate();
    const userLoggedIn = useSelector((state: RootState) => state.auth.userInfo);
    const expertLoggedIn = useSelector((state: RootState) => state.auth.expertInfo);
    const [isOpen, setIsOpen] = useState(false);
    const name = isExpertPage ? expertLoggedIn?.name : userLoggedIn?.name;
    const email = isExpertPage ? expertLoggedIn?.email : userLoggedIn?.email;
    const dispatch = useDispatch();
    // const dispatch = useDispatch<AppDispatch>();

    // useEffect(() => {
    //     const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
    //     if (isUserLoggedIn) {
    //         dispatch(fetchUserData());
    //     }
    // }, [dispatch]);

    const [userLogoutMutation] = useUserLogoutMutation();
    const [expertLogoutMutation] = useExpertLogoutMutation();

    const navItems = [
        { label: "Home", href: isExpertPage ? '/expert/home' : '/', current: false },
        { label: "About Us", href: "/about", current: false },
        { label: "Contact Us", href: "/contact", current: false },
    ];

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
            if (isExpertPage) {
                dispatch(expertLogout());
                await expertLogoutMutation('').unwrap();
                navigate('/expert/login')
            } else {
                dispatch(userLogout());
                await userLogoutMutation('').unwrap();
                navigate('/login');
            }
        }
    };

    const handleEditProfile = async () => {
        if (!isExpertPage) {
            navigate('/profile')
        } else {
            navigate('/expert/profile')
        }
    };



    const toggleDropdown = () => {
        if ((userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage)) {
            setIsOpen(!isOpen);
        } else {
            navigate(isExpertPage ? "/expert/login" : "/login");
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
                    <button type="button" onClick={toggleDropdown} className="justify-center mr-4 px-5 py-2 rounded-full font-semibold text-white capitalize bg-indigo-500 hover:bg-indigo-600 max-md:px-9">
                        {(userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage) ? "Profile" : "Log in"}
                    </button>
                    {((userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage)) && isOpen && (
                        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-20">
                            <div className="py-1">
                                <button type="button" className="flex items-center text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <span className="mr-3"><CgProfile className="text-teal-500" /></span>
                                    {name}<br />{email}
                                </button>
                                <button type="button" onClick={handleEditProfile} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <span className="mr-3"><IoMdSettings className="text-teal-500" /></span>
                                    Edit profile
                                </button>
                                <button type="button" onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <span className="mr-3"><RiLogoutBoxFill className="text-teal-500" /></span>
                                    Log out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
