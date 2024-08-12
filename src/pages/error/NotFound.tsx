// frontend\src\pages\error\NotFound.tsx

import {  useNavigate } from "react-router-dom";
import illustration from '../../assets/404illustration.svg';

interface NotFoundProps {
    role: 'user' | 'expert' | 'admin';
}

function NotFound({ role }: NotFoundProps) { // role could be user, expert or admin
    const navigate = useNavigate();

    // Define home routes for each role
    const homeRoutes: Record<string, string> = {
        user: "/",
        expert: "/expert/appointments",
        admin: "/admin",
    };

    const handleGoHome = () => {
        const route = homeRoutes[role] || "/";
        navigate(route);
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:justify-between">
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <p className="text-sm font-medium text-blue-500 dark:text-blue-400">404 Error</p>
                    <h1 className="mt-3 text-3xl font-bold text-gray-800 dark:text-white">Page Not Found</h1>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Oops! The page you're looking for doesn't exist. Here are some useful links to help you navigate:</p>

                    <div className="flex justify-center flex-row items-center gap-x-4 mt-6 gap-y-4 lg:justify-start lg:flex-row lg:items-center lg:gap-x-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180" aria-label="Go back icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span className="ml-2">Go Back</span>
                        </button>

                        <button
                            onClick={handleGoHome}
                            className="px-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-sm transition-transform transform hover:scale-105 dark:bg-blue-600 dark:hover:bg-blue-500"
                        >
                            Take Me Home
                        </button>
                    </div>
                </div>

                <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                    <img className="w-full max-w-lg mx-auto" src={illustration} alt="404 illustration" />
                </div>
            </div>
        </section>
    );
}

export default NotFound;
