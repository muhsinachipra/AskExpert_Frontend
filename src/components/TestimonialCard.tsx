// TestimoonialCard.tsx 

import { FaStar } from "react-icons/fa";

type TestimonialCardProps = {
    imageSrc: string;
    name: string;
    role: string;
    stars: number;
    testimonial: string;
};

export default function TestimonialCard({
    imageSrc,
    name,
    role,
    stars,
    testimonial,
}: TestimonialCardProps) {
    return (
        <div className="flex flex-col shadow-lg bg-neutral-100 p-6 md:p-4">
            <div className="flex items-center">
                <img
                    loading="lazy"
                    src={imageSrc}
                    alt={`${name}'s profile`}
                    className="w-24 h-24 rounded-full mr-4"
                />
                <div>
                    <div className="font-semibold text-lg text-neutral-700">{name}</div>
                    <div className="text-sm text-zinc-500">{role}</div>
                    <div className="flex items-center mt-2">
                        {[...Array(stars)].map((_, index) => (
                            <FaStar key={index} className="text-yellow-400 mr-1" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-4 italic text-lg leading-relaxed text-zinc-500">{testimonial}</div>
        </div>
    );
}
