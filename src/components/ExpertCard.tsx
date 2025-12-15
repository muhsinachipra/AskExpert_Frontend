// ExpertCard.tsx 

type CardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    iconClassName?: string;
}

export default function ExpertCard({ icon, title, description, iconClassName }: CardProps) {
    return (
        <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-lg font-semibold text-center max-md:mt-8">
                <div className={`${iconClassName}`}>
                    {icon}
                </div>
                <div className="flex flex-col h-full shadow-lg items-center px-11 py-14 bg-neutral-200 max-md:px-5">
                    <h3 className="text-2xl leading-8 text-neutral-700">{title}</h3>
                    <p className="self-stretch mt-4 leading-7 text-zinc-500">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
