// frontend\src\components\user\HowItWorks.tsx

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaListUl, FaUserTie, FaCalendarCheck } from "react-icons/fa";
import { MdOutlineAssignment } from "react-icons/md";

function HowItWorks() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const steps = [
        { icon: <MdOutlineAssignment />, text: "Register for free" },
        { icon: <FaListUl />, text: "Choose a category" },
        { icon: <FaUserTie />, text: "Find your expert" },
        { icon: <FaCalendarCheck />, text: "Take an appointment" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    return (
        <section ref={ref} className="bg-teal-400 py-16">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-6xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    HERE IS HOW IT WORKS
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center text-center"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="text-4xl mb-4"
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {step.icon}
                            </motion.div>
                            <h3 className="text-2xl font-bold">{step.text}</h3>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default HowItWorks;