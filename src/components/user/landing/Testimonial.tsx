// frontend\src\components\user\landing\Testimonial.tsx

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TestimonialCard from '../../TestimonialCard';

const testimonialData = [
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f035b502e5e329fe20236ea8fc8903b1b5919d6fabfffdeffe5775d9765b7e5b?apiKey=62cb0e3201dd4b038734137173080a0d&",
        name: "John Doe",
        role: "Software Engineer",
        averageRating: 3,
        testimonial:
            "Expert Consult helped me immensely in resolving a complex coding issue. The expert I consulted provided clear explanations and valuable insights. I highly recommend this platform to anyone seeking professional advice.",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f55989522d27d5a327c95a0190690fef912b5f6c2554e4f5ddd2e1350d8ed431?apiKey=62cb0e3201dd4b038734137173080a0d&",
        name: "Alice Smith",
        role: "Business Analyst",
        averageRating: 4,
        testimonial:
            "I had a legal query regarding a contract negotiation, and Expert Consult connected me with a knowledgeable lawyer who provided excellent guidance. The platform is user-friendly, and the expert was responsive and helpful.",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/3b442835c561cbb7c7582c1b8e0a38f9ec5cbeff1deca5d009922e5594ed8b9a?apiKey=62cb0e3201dd4b038734137173080a0d&",
        name: "Michael Johnson",
        role: "Medical Doctor",
        averageRating: 5,
        testimonial:
            "I needed medical advice on managing a chronic condition, and Expert Consult connected me with a specialist who provided comprehensive guidance. The platform is a valuable resource for accessing expertise from the comfort of home.",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4939d453edf50a307e83b840364cc5c75ae87a71e3f3845dc9af4ada4d7f411?apiKey=62cb0e3201dd4b038734137173080a0d&",
        name: "Sarah Brown",
        role: "Financial Advisor",
        averageRating: 5,
        testimonial:
            "I consulted an expert on Expert Consult regarding investment strategies, and I was impressed by the depth of knowledge and professionalism. The platform offers a convenient way to access expert advice tailored to individual needs.",
    },
];

function Testimonial() {
    const [titleRef, titleInView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
        rootMargin: '-100px 0px',
    });

    const [cardsRef, cardsInView] = useInView({
        triggerOnce: true,
        threshold: 0.3,
        rootMargin: '-50px 0px',
    });

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <motion.div 
                    ref={titleRef}
                    className="text-center mb-12"
                    initial="hidden"
                    animate={titleInView ? "visible" : "hidden"}
                    variants={itemVariants}
                >
                    <div className="flex items-center justify-center">
                        <div className="w-3 h-3 bg-teal-400 mr-2" />
                        <div className="font-medium">Testimonial</div>
                    </div>
                    <h2 className="mt-4 text-4xl font-bold capitalize">What Our Users Say</h2>
                </motion.div>
                <motion.div 
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={cardsInView ? "visible" : "hidden"}
                >
                    {testimonialData.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                        >
                            <TestimonialCard
                                imageSrc={testimonial.imageSrc}
                                name={testimonial.name}
                                role={testimonial.role}
                                stars={testimonial.averageRating}
                                testimonial={testimonial.testimonial}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Testimonial;