export default function Form() {
    return (
        <div className="border-2 bg-gray-100 dark:bg-gray-800 px-10 py-10 border-black-500 rounded-xl md:w-8/12">
            <h1 className="font-semibold text-5xl text-center dark:text-white">Welcome</h1>
            {/* <p className="mt-4 font-medium text-gray-500 text-lg dark:text-gray-400">please enter your details</p> */}
            <div className="mt-8">
                <div>
                    <input
                        className="border-2 border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 mt-1 p-4 rounded w-full placeholder:text-slate-600"
                        placeholder="Your Email"
                    />
                </div>
                <div className="mt-3">
                    <input
                        className="border-2 border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 mt-1 p-4 rounded w-full placeholder:text-slate-600"
                        placeholder="Your Password"
                        type="password"
                    />
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        {/* <input id="rememberMe" type="checkbox" />
                        <label htmlFor="rememberMe" className="ml-2 font-medium text-base text-gray-500 dark:text-gray-400">Remember me</label> */}
                    </div>
                    <button type="button" className="font-medium text-base text-blue-500 dark:text-blue-400">Forget Password</button>
                </div>
                <div className="flex flex-col gap-y-4 mt-5">
                    <button type="button" className="active:scale-[0.98] bg-blue-500 dark:bg-blue-600 py-3 rounded font-bold text-lg text-white dark:text-gray-900 transition-all active:duration-75 hover:scale-[1.01] ease-in-out">Sign in</button>
                    <button type="button" className="flex justify-center items-center gap-2 active:scale-[.98] border-2 border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 font-semibold text-gray-700 dark:text-gray-200 transition-all active:duration-75 hover:scale-[1.01] rounded text-lg transform ease-in-out">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335" />
                            <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853" />
                            <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2" />
                            <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05" />
                        </svg>
                        Sign in with Google
                    </button>
                </div>
                <div className='flex justify-center items-center mt-8'>
                    <p className='font-medium text-base dark:text-gray-400'>Don't have an account?</p>
                    <button type='button' className='ml-2 font-medium text-base text-blue-500 dark:text-blue-400'>Sign up</button>
                </div>
            </div>
        </div>
    )
}
