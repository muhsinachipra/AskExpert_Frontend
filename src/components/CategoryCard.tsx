type CardProps = {
    imageSrc: string;
    title: string;
}

export default function Card({ imageSrc, title }: CardProps) {
    return (
        // <div className="flex flex-col w-[33%] max-md:w-full">
        //     <div className="flex overflow-hidden relative flex-col grow justify-center text-4xl text-white whitespace-nowrap rounded-xl min-h-[298px] max-md:mt-5">
        //         <img src={imageSrc} alt="" className="object-cover absolute inset-0 size-full" />
        //         <div className="overflow-hidden relative flex-col justify-center items-start px-10 pt-40 pb-20 w-full min-h-[298px] max-md:px-5 max-md:pt-10 max-md:max-w-full">
        //             <img src={imageSrc} alt="" className="object-cover absolute inset-0 size-full" />
        //             {title}
        //         </div>
        //     </div>
        // </div>

        <div className="flex w-1/3 max-md:w-full mx-3 my-3 relative overflow-hidden rounded-xl">
            <img src={imageSrc} alt={title} className="object-cover w-full h-full" />
            <div className="absolute bottom-7 left-7 text-4xl text-white drop-shadow-lg" style={{ textShadow: '0 0 5px rgba(0, 0, 0, 0.90)' }}>
                
                {title}
            </div>
        </div>
    );
}