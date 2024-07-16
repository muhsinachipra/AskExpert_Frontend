// frontend\src\components\CategoryCard.tsx

type CardProps = {
    imageSrc: string;
    title: string;
    onClick: () => void;
}

export default function Card({ imageSrc, title, onClick }: CardProps) {
    return (

        <div
            className="flex w-1/3 max-md:w-full mx-3 my-3 relative overflow-hidden rounded-xl cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            onClick={onClick}
        >
            <img src={imageSrc} alt={title} className="object-cover w-full h-full" />
            <div className="absolute bottom-7 left-7 text-4xl text-white drop-shadow-lg" style={{ textShadow: '0 0 5px rgba(0, 0, 0, 0.90)' }}>
                {title}
            </div>
        </div>

    );
}