// frontend\src\components\CategoryCard.tsx

import { motion } from 'framer-motion';

type CardProps = {
    imageSrc: string;
    title: string;
    onClick: () => void;
}

export default function Card({ imageSrc, title, onClick }: CardProps) {
    return (
        <motion.div
            className="flex w-1/3 max-md:w-full mx-3 my-3 relative overflow-hidden rounded-xl cursor-pointer"
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <img src={imageSrc} alt={title} className="object-cover w-full h-full" />
            <motion.div 
                className="absolute bottom-7 left-7 text-4xl text-white drop-shadow-lg"
                style={{ textShadow: '0 0 5px rgba(0, 0, 0, 0.90)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {title}
            </motion.div>
        </motion.div>
    );
}