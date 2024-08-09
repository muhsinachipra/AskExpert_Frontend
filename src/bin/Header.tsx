// frontend\src\components\Header.tsx

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useCallback, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useGetAppointmentsCountQuery, useUserLogoutMutation } from "../slices/api/userApiSlice";
import { useExpertLogoutMutation } from "../slices/api/expertApiSlice";
import { expertLogout, userLogout } from "../slices/authSlice";
import useMediaQuery from "../hooks/useMediaQuery";

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
    const dispatch = useDispatch();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [userLogoutMutation] = useUserLogoutMutation();
    const [expertLogoutMutation] = useExpertLogoutMutation();

    const isMobile = useMediaQuery("(max-width: 768px)");


    const navItems = isExpertPage
        ? []
        : [
            { label: "Home", href: '/home', current: false },
            { label: "Appointments", href: "/appointments", current: false, count: appointmentCount },
            { label: "Chat", href: "/chat", current: false },
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
                navigate('/expert/login');
            } else {
                dispatch(userLogout());
                await userLogoutMutation('').unwrap();
                navigate('/login');
            }
        }
    };

    const handleEditProfile = async () => {
        if (!isExpertPage) {
            navigate('/profile');
        } else {
            navigate('/expert/profile2');
        }
    };

    const toggleDropdown = () => {
        if ((userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage)) {
            if (isExpertPage) {
                navigate('/expert/appointments'); // Redirects experts to /expert/appointments on button click
            } else {
                setIsOpen(!isOpen);
            }
        } else {
            navigate(isExpertPage ? "/expert/login" : "/login");
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

            {(!isExpertPage && isMobile) ? (
                // Mobile Header
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
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.href}
                                    className="block py-2 px-4 w-full text-neutral-700 font-medium hover:bg-gray-100 rounded-md"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                    {item.count !== undefined && item.count > 0 && (
                                        <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-700 rounded-full">
                                            {item.count}
                                        </span>
                                    )}
                                </Link>
                            ))}

                            <button
                                type="button"
                                id="menuButton"
                                onClick={toggleDropdown}
                                className="justify-center px-5 py-2 rounded-full font-semibold text-white capitalize bg-indigo-500 hover:bg-indigo-600"
                            >
                                {(userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage) ? (isExpertPage ? "Home" : "Profile") : "Log in"}
                            </button>

                            {((userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage)) && isOpen && (
                                <div id="menuDropdown" className="w-full mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow-xl dark:bg-gray-700 dark:divide-gray-600 z-20">
                                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                        <div>{name}</div>
                                        <div className="font-medium truncate">{email}</div>
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
                // Desktop Header
                <nav className="flex gap-5 pl-20 text-lg text-center">
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
                    <div className="relative">
                        <button
                            type="button"
                            id="menuButton"
                            onClick={toggleDropdown}
                            className="justify-center px-5 py-2 rounded-full font-semibold text-white capitalize bg-indigo-500 hover:bg-indigo-600"
                        >
                            {/* {(userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage) ? {isExpertPage?"home":"Profile"} : "Log in"} */}
                            {(userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage) ? (isExpertPage ? "home" : "Profile") : "Log in"}
                        </button>
                        {((userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage)) && isOpen && (
                            <div id="menuDropdown" className="absolute right-5 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-xl dark:bg-gray-700 dark:divide-gray-600 z-20">
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div>{name}</div>
                                    <div className="font-medium truncate">{email}</div>
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


// // frontend\src\components\Header.tsx

// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom"
// import { RootState } from "../app/store";
// import { useCallback, useEffect, useState } from "react";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import { useGetAppointmentsCountQuery, useUserLogoutMutation } from "../slices/api/userApiSlice";
// import { useExpertLogoutMutation } from "../slices/api/expertApiSlice";
// import { expertLogout, userLogout } from "../slices/authSlice";

// const MySwal = withReactContent(Swal);

// interface HeaderProps {
//     isExpertPage?: boolean;
// }

// export default function Header({ isExpertPage = false }: HeaderProps) {

//     const { data } = useGetAppointmentsCountQuery();
//     const appointmentCount = data?.data || 0;
//     const navigate = useNavigate();
//     const userLoggedIn = useSelector((state: RootState) => state.auth.userInfo);
//     const expertLoggedIn = useSelector((state: RootState) => state.auth.expertInfo);
//     const [isOpen, setIsOpen] = useState(false);
//     const name = isExpertPage ? expertLoggedIn?.name : userLoggedIn?.name;
//     const email = isExpertPage ? expertLoggedIn?.email : userLoggedIn?.email;
//     const dispatch = useDispatch();

//     const [userLogoutMutation] = useUserLogoutMutation();
//     const [expertLogoutMutation] = useExpertLogoutMutation();

//     const navItems = [
//         { label: "Home", href: isExpertPage ? '/expert/appointments' : '/home', current: false },
//         { label: "Appointments", href: "/appointments", current: false, count: appointmentCount },
//         { label: "Chat", href: "/chat", current: false },
//     ];

//     const handleLogout = async () => {
//         const result = await MySwal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'Yes, logout!',
//             cancelButtonText: 'No, cancel!',
//         });

//         if (result.isConfirmed) {
//             if (isExpertPage) {
//                 dispatch(expertLogout());
//                 await expertLogoutMutation('').unwrap();
//                 navigate('/expert/login')
//             } else {
//                 dispatch(userLogout());
//                 await userLogoutMutation('').unwrap();
//                 navigate('/login');
//             }
//         }
//     };

//     const handleEditProfile = async () => {
//         if (!isExpertPage) {
//             navigate('/profile')
//         } else {
//             navigate('/expert/profile2')
//         }
//     };

//     const toggleDropdown = () => {
//         if ((userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage)) {
//             setIsOpen(!isOpen);
//         } else {
//             navigate(isExpertPage ? "/expert/login" : "/login");
//         }
//     };

//     const handleClickOutside = useCallback((event: MouseEvent) => {
//         if (isOpen && event.target instanceof Element && !event.target.closest('#menuButton') && !event.target.closest('#menuDropdown')) {
//             setIsOpen(false);
//         }
//     }, [isOpen]);

//     useEffect(() => {
//         document.addEventListener('click', handleClickOutside);
//         return () => {
//             document.removeEventListener('click', handleClickOutside);
//         };
//     }, [handleClickOutside]);

//     return (
//         <header className="bg-neutral-200 py-4 flex gap-5 justify-between self-center w-full max-md:flex-wrap relative z-10">
//             <div className="flex gap-3 ml-2 px-5 my-auto text-3xl font-semibold leading-8 text-black whitespace-nowrap">
//                 <img loading="lazy" src="/Ask.svg" alt="AskExperts logo" className="shrink-0 self-start aspect-[1.03] w-[30px]" />
//                 <div>AskExpert</div>
//             </div>
//             <nav className="flex gap-5 pl-20 text-lg text-center max-md:flex-wrap">
//                 {navItems.map((item) => (
//                     <Link key={item.label} to={item.href} className={`relative justify-center px-0.5 py-1 my-auto text-neutral-700 font-medium`}>
//                         {item.label}
//                         {item.count !== undefined && item.count > 0 && (
//                             <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-700 rounded-full">
//                                 {item.count}
//                             </span>
//                         )}
//                     </Link>
//                 ))}
//                 <div className="relative">
//                     <button
//                         type="button"
//                         id="menuButton"
//                         onClick={toggleDropdown}
//                         className="justify-center mr-4 px-5 py-2 rounded-full font-semibold text-white capitalize bg-indigo-500 hover:bg-indigo-600 max-md:px-9"
//                     >
//                         {(userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage) ? "Profile" : "Log in"}
//                     </button>
//                     {((userLoggedIn && !isExpertPage) || (expertLoggedIn && isExpertPage)) && isOpen && (
//                         <div id="menuDropdown" className="absolute right-5 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-xl dark:bg-gray-700 dark:divide-gray-600 z-20">
//                             <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
//                                 <div>{name}</div>
//                                 <div className="font-medium truncate">{email}</div>
//                             </div>
//                             <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="menuButton">
//                                 <li>
//                                     <button
//                                         type="button"
//                                         className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
//                                         onClick={handleEditProfile}
//                                     >
//                                         Edit profile
//                                     </button>
//                                 </li>
//                             </ul>
//                             <div className="py-2">
//                                 <button
//                                     type="button"
//                                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
//                                     onClick={handleLogout}
//                                 >
//                                     Log out
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//             </nav>
//         </header>
//     );
// }
