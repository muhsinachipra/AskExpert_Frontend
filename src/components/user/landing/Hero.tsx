// frontend\src\components\user\landing\Hero.tsx

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section className="relative flex flex-col justify-center items-start w-full font-semibold h-[calc(100vh-12vh)] overflow-hidden">
            <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-neutral-700 to-transparent z-10"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            />
            <motion.img 
                loading="lazy" 
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca8395bfb97a1bd951d7fb1f3f2bcdf65a60ed5f3ae590334de4f2d86d78cdc1?apiKey=62cb0e3201dd4b038734137173080a0d&" 
                alt="Banner Image" 
                className="object-cover absolute inset-0 size-full"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }} // Reduced from 5 to 3 seconds
            />

            <div className="relative z-20 flex flex-col h-full md:w-1/2 w-full px-9">
                <motion.h1 
                    className="mt-32 text-6xl font-bold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }} // Increased delay slightly
                >
                    Connect An <br /> 
                    <motion.span 
                        className="text-teal-400"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1.3 }} // Increased delay slightly
                    >
                        Expert
                    </motion.span>
                </motion.h1>
                <motion.p 
                    className="mt-5 text-2xl leading-9 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }} // Increased delay slightly
                >
                    We help you connect with experts around the world and get answers to your questions on time and at an affordable price.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }} // Increased delay slightly
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link to={'/register'} className="inline-block px-16 py-3 mt-9 text-lg text-center capitalize bg-teal-400 text-neutral-700 transition-all duration-300 hover:bg-teal-500">
                        Register for free
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;