// frontend\src\components\user\UserHeader.tsx

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { useCallback, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useGetAppointmentsCountQuery, useUserLogoutMutation } from "../../slices/api/userApiSlice";
import { userLogout } from "../../slices/authSlice";
import useMediaQuery from "../../hooks/useMediaQuery";

const MySwal = withReactContent(Swal);

export default function UserHeader() {
    const { data } = useGetAppointmentsCountQuery();
    const appointmentCount = data?.data || 0;
    const navigate = useNavigate();
    const userLoggedIn = useSelector((state: RootState) => state.auth.userInfo);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userLogoutMutation] = useUserLogoutMutation();
    const isMobile = useMediaQuery("(max-width: 768px)");

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
            dispatch(userLogout());
            await userLogoutMutation('').unwrap();
            navigate('/login');
        }
    };

    const handleEditProfile = () => {
        navigate('/profile');
    };

    const toggleDropdown = () => {
        if (userLoggedIn) {
            setIsOpen(!isOpen);
        } else {
            navigate("/login");
        }
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (isOpen && event.target instanceof Element && !event.target.closest('#menuButton') && !event.target.closest('#menuDropdown')) {
            setIsOpen(false);
        }

        if (isMenuOpen && event.target instanceof Element && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-toggle')) {
            setIsMenuOpen(false);
        }
    }, [isOpen, isMenuOpen]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <header className="bg-neutral-200 py-4 flex justify-between items-center w-full relative z-10 px-4 md:px-8">
            <div className="flex items-center">
                <img loading="lazy" src="/Ask.svg" alt="AskExperts logo" className="w-8 h-8" />
                <div className="ml-2 text-2xl font-semibold text-black">AskExpert</div>
            </div>

            {isMobile ? (
                <>
                    <div className="md:hidden">
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            title="Toggle menu"
                            className="text-gray-700 focus:outline-none menu-toggle"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={"M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>

                    <nav className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 mobile-menu`}>
                        <div className="flex flex-col items-start p-6 space-y-4">
                            <Link
                                to='/home'
                                className="block py-2 px-4 w-full text-neutral-700 font-medium hover:bg-gray-100 rounded-md"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/appointments"
                                className="block py-2 px-4 w-full text-neutral-700 font-medium hover:bg-gray-100 rounded-md"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Appointments
                                {appointmentCount > 0 && (
                                    <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-700 rounded-full">
                                        {appointmentCount}
                                    </span>
                                )}
                            </Link>
                            <Link
                                to="/chat"
                                className="block py-2 px-4 w-full text-neutral-700 font-medium hover:bg-gray-100 rounded-md"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Chat
                            </Link>

                            <button
                                type="button"
                                id="menuButton"
                                onClick={toggleDropdown}
                                className="w-full justify-center px-5 py-2 rounded-lg font-semibold text-white capitalize bg-indigo-500 hover:bg-indigo-600"
                            >
                                {userLoggedIn ? "Profile" : "Log in"}
                            </button>

                            {userLoggedIn && isOpen && (
                                <div id="menuDropdown" className="w-full mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow-xl dark:bg-gray-700 dark:divide-gray-600 z-20">
                                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                        <div>{userLoggedIn.name}</div>
                                        <div className="font-medium truncate">{userLoggedIn.email}</div>
                                    </div>
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="menuButton">
                                        <li>
                                            <button
                                                type="button"
                                                className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={handleEditProfile}
                                            >
                                                Edit profile
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="py-2">
                                        <button
                                            type="button"
                                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            onClick={handleLogout}
                                        >
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                </>
            ) : (
                <nav className="flex gap-5 pl-20 text-lg text-center">
                    <Link to='/home' className={`relative justify-center px-0.5 py-1 my-auto text-neutral-700 font-medium`}>
                        Home
                    </Link>
                    <Link to="/appointments" className={`relative justify-center px-0.5 py-1 my-auto text-neutral-700 font-medium`}>
                        Appointments
                        {appointmentCount > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-700 rounded-full">
                                {appointmentCount}
                            </span>
                        )}
                    </Link>
                    <Link to="/chat" className={`relative justify-center px-0.5 py-1 my-auto text-neutral-700 font-medium`}>
                        Chat
                    </Link>
                    <div className="relative">
                        <button
                            type="button"
                            id="menuButton"
                            onClick={toggleDropdown}
                            className="justify-center px-5 py-2 rounded-full font-semibold text-white capitalize bg-indigo-500 hover:bg-indigo-600"
                        >
                            {userLoggedIn ? "Profile" : "Log in"}
                        </button>
                        {userLoggedIn && isOpen && (
                            <div id="menuDropdown" className="absolute right-5 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-xl dark:bg-gray-700 dark:divide-gray-600 z-20">
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div>{userLoggedIn.name}</div>
                                    <div className="font-medium truncate">{userLoggedIn.email}</div>
                                </div>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="menuButton">
                                    <li>
                                        <button
                                            type="button"
                                            className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            onClick={handleEditProfile}
                                        >
                                            Edit profile
                                        </button>
                                    </li>
                                </ul>
                                <div className="py-2">
                                    <button
                                        type="button"
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        onClick={handleLogout}
                                    >
                                        Log out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
}
