// frontend\src\components\Header.tsx

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../app/store";
import { useCallback, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useGetAppointmentsCountQuery, useUserLogoutMutation } from "../slices/api/userApiSlice";
import { useExpertLogoutMutation } from "../slices/api/expertApiSlice";
import { expertLogout, userLogout } from "../slices/authSlice";
// import { CgProfile } from "react-icons/cg";
// import { IoMdSettings } from "react-icons/io";
// import { RiLogoutBoxFill } from "react-icons/ri";

const MySwal = withReactContent(Swal);

interface HeaderProps {
    isExpertPage?: boolean;
}

export default function Header({ isExpertPage = false }: HeaderProps) {

    const { data } = useGetAppointmentsCountQuery();
    const appointmentCount = data?.data || 0;
    const navigate = useNavigate();
    const userLoggedIn = useSelector((state: RootState) => state.auth.userInfo);
    const expertLoggedIn = useSelector((state: RootState) => state.auth.expertInfo);
    const [isOpen, setIsOpen] = useState(false);
    const name = isExpertPage ? expertLoggedIn?.name : userLoggedIn?.name;
    const email = isExpertPage ? expertLoggedIn?.email : userLoggedIn?.email;
    // const profilePic = isExpertPage ? expertLoggedIn?.profilePic : userLoggedIn?.profilePic;
    const dispatch = useDispatch();

    const [userLogoutMutation] = useUserLogoutMutation();
    const [expertLogoutMutation] = useExpertLogoutMutation();

    const navItems = [
        { label: "Home", href: isExpertPage ? '/expert/appointments' : '/home', current: false },
        { label: "Appointments", href: "/appointments", current: false, count: appointmentCount },
        { label: "Chat", href: "/chat", current: false },
        // { label: "About Us", href: "/contact", current: false },
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
            navigate('/expert/profile2')
        }
    };

    const toggleDropdown = () => {
        if ((userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage)) {
            setIsOpen(!isOpen);
        } else {
            navigate(isExpertPage ? "/expert/login" : "/login");
        }
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (isOpen && event.target instanceof Element && !event.target.closest('#menuButton') && !event.target.closest('#menuDropdown')) {
            setIsOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <header className="bg-neutral-200 py-4 flex gap-5 justify-between self-center w-full max-md:flex-wrap relative z-10">
            <div className="flex gap-3 ml-2 px-5 my-auto text-3xl font-semibold leading-8 text-black whitespace-nowrap">
                <img loading="lazy" src="/Ask.svg" alt="AskExperts logo" className="shrink-0 self-start aspect-[1.03] w-[30px]" />
                <div>AskExpert</div>
            </div>
            <nav className="flex gap-5 pl-20 text-lg text-center max-md:flex-wrap">
                {navItems.map((item) => (
                    <Link key={item.label} to={item.href} className={`relative justify-center px-0.5 py-1 my-auto text-neutral-700 font-medium`}>
                        {item.label}
                        {item.count !== undefined && item.count > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-700 rounded-full">
                                {item.count}
                            </span>
                        )}
                    </Link>
                ))}

                {/* <div className="relative">
                    <button type="button" id="menuButton" onClick={toggleDropdown} className="justify-center mr-4 px-5 py-2 rounded-full font-semibold text-white capitalize bg-indigo-500 hover:bg-indigo-600 max-md:px-9">
                        {(userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage) ? "Profile" : "Log in"}
                    </button>
                    {((userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage)) && isOpen && (
                        <div id="menuDropdown" className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-20">
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
                </div> */}

                <div className="relative">
                    <button
                        type="button"
                        id="menuButton"
                        onClick={toggleDropdown}
                        className="justify-center mr-4 px-5 py-2 rounded-full font-semibold text-white capitalize bg-indigo-500 hover:bg-indigo-600 max-md:px-9"
                    >
                        {(userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage) ? "Profile" : "Log in"}
                    </button>
                    {((userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage)) && isOpen && (
                        <div id="menuDropdown" className="absolute right-5 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-xl dark:bg-gray-700 dark:divide-gray-600 z-20">
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                {/* <img className="w-8 h-8 rounded-full" src={profilePic} alt="user photo" /> */}
                                <div>{name}</div>
                                <div className="font-medium truncate">{email}</div>
                            </div>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="menuButton">
                                <li>
                                    <button
                                        type="button"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                                        onClick={handleEditProfile}
                                    >
                                        Edit profile
                                    </button>
                                </li>
                                {/* <li>
                                    <button
                                        type="button"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                                        onClick={handleLogout}
                                    >
                                        Log out
                                    </button>
                                </li> */}
                            </ul>
                            <div className="py-2">
                                <button
                                    type="button"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
                                    onClick={handleLogout}
                                >
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
