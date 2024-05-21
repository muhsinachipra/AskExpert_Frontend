import * as React from "react";

type ProfileProps = {
    src: string;
    name: string;
    email: string;
};

type StatProps = {
    src: string;
    label: string;
    value: string;
    alt: string;
}

type StatChartProps = {
    yearlyAmount: string;
    imgSrc: string;
    alt: string;
}

const Profile: React.FC<ProfileProps> = ({ src, name, email }) => (
    <div className="flex gap-4 mt-11 font-medium max-md:mt-10">
        <img loading="lazy" src={src} alt="Admin profile" className="shrink-0 aspect-square w-[46px]" />
        <div className="flex flex-col my-auto">
            <div className="text-sm text-slate-800">{name}</div>
            <div className="mt-3 text-xs tracking-normal text-slate-400">{email}</div>
        </div>
    </div>
);

const Stat: React.FC<StatProps> = ({ src, label, value, alt }) => (
    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow justify-center max-md:mt-8">
            <div className="flex gap-4 px-11 py-6 bg-white rounded-3xl max-md:px-5">
                <img loading="lazy" src={src} alt={alt} className="shrink-0 aspect-square w-[70px]" />
                <div className="flex flex-col flex-1 my-auto">
                    <div className="text-base text-slate-400">{label}</div>
                    <div className="mt-4 text-2xl font-semibold text-neutral-800">{value}</div>
                </div>
            </div>
        </div>
    </div>
)

const StatChart: React.FC<StatChartProps> = ({ yearlyAmount, imgSrc, alt }) => (
    <div className="flex flex-col grow px-8 py-8 w-full text-sm whitespace-nowrap bg-white rounded-3xl text-slate-400 max-md:px-5 max-md:mt-8 max-md:max-w-full">
        <div className="flex gap-2.5 text-right max-md:flex-wrap max-md:pr-5">
            <div>{yearlyAmount}</div>
            <div className="shrink-0 self-start mt-3 max-w-full h-px border border-dashed border-slate-200 w-[420px]" />
        </div>
        <div className="flex gap-5 mt-1.5 text-right max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
            <div className="flex flex-col my-auto">
                <div>$30,000</div>
                <div className="mt-9">$20,000</div>
                <div className="mt-9">$10,000</div>
            </div>
            <img loading="lazy" src={imgSrc} alt={alt} className="grow shrink-0 aspect-[2.38] basis-0 w-fit" />
        </div>
        <div className="flex gap-2.5 items-start self-end mt-3 max-md:flex-wrap">
            <div className="grow text-right">$0</div>
            <div className="flex flex-col grow shrink-0 mt-2.5 text-center basis-0 w-fit max-md:max-w-full">
                <div className="shrink-0 h-px border border-dashed border-slate-200 max-md:max-w-full" />
                <div className="flex gap-5 mt-2.5 max-md:flex-wrap max-md:pr-5">
                    <div>2016</div>
                    <div>2017</div>
                    <div>2018</div>
                    <div>2019</div>
                    <div>2020</div>
                    <div>2021</div>
                </div>
            </div>
        </div>
    </div>
)

const Dashboard: React.FC = () => {
    const stats = [
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/308c356fc63086984e36aa083a34c8824b067aa36bdbd531ce0d9fc2821d1385?apiKey=62cb0e3201dd4b038734137173080a0d&", label: "No.of Users", value: "12,750", alt: "Users Statistics" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a2a5a0495a476d893e370d7b7ad41f2160821394b2eaec9ad9e5ddbc3f1ea1a3?apiKey=62cb0e3201dd4b038734137173080a0d&", label: "No.of Experts", value: "5,600", alt: "Experts Statistics" },
    ];

    const images = [
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8b4dc90586afb13ef3ffd3ed50e5451ad6d0f671f1373be193d697bf91683bf8?apiKey=62cb0e3201dd4b038734137173080a0d&", alt: "Statistic Chart" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/84178e1733b78db06bf0402eae51b85eacb417ab263711ffe8f8db5ecb221f92?apiKey=62cb0e3201dd4b038734137173080a0d&", alt: "Monthly Performance Chart" },
    ];

    return (
        <div className="bg-neutral-200">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <aside className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow justify-center whitespace-nowrap max-md:mt-10">
                        <nav className="flex flex-col pt-6 pb-20 bg-white shadow-sm">
                            <div className="flex flex-col items-start pr-16 pl-6 max-md:px-5">
                                <div className="text-lg font-semibold text-blue-950">AskExpert</div>
                                <Profile src="https://cdn.builder.io/api/v1/image/assets/TEMP/b408e1671d1f84cd11be6693cccf6d42e99a4ad7eb49ca6f45dbe8b0921b8f3c?apiKey=62cb0e3201dd4b038734137173080a0d&" name="Admin" email="admin@email.com" />
                            </div>
                            <a href="#" className="justify-center items-start px-9 py-3 mt-12 text-xl font-medium tracking-wide text-black rounded-3xl bg-neutral-400 max-md:px-5 max-md:mt-10">Dashboard</a>
                            <a href="#" className="justify-center items-start px-9 py-3 mt-4 text-xl font-medium tracking-wide text-black rounded-3xl bg-stone-300 max-md:px-5">Users</a>
                            <a href="#" className="justify-center items-start px-9 py-3 mt-4 text-xl font-medium tracking-wide text-black rounded-3xl bg-stone-300 max-md:px-5">Experts</a>
                            <a href="#" className="justify-center items-start px-9 py-3 mt-4 mb-80 text-xl font-medium tracking-wide text-black rounded-3xl bg-stone-300 max-md:px-5 max-md:mb-10">Logout</a>
                        </nav>
                    </div>
                </aside>
                <main className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
                    <section className="flex flex-col px-5 mt-20 max-md:mt-10 max-md:max-w-full">
                        <h1 className="text-4xl font-semibold tracking-wide text-zinc-600 max-md:max-w-full">Dashboard</h1>
                        <div className="flex flex-col self-center mt-36 w-full max-w-[1223px] max-md:mt-10 max-md:max-w-full">
                            <div className="max-md:pr-5 max-md:max-w-full">
                                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                    {stats.map((stat, index) => (
                                        <Stat key={index} {...stat} />
                                    ))}
                                    {images.map((image, index) => (
                                        <div key={index} className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                                            <img loading="lazy" src={image.src} alt={image.alt} className="grow shrink-0 max-w-full aspect-[2.13] w-[255px] max-md:mt-8" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-5 mt-24 text-2xl font-semibold text-slate-700 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                                <div className="flex-auto">Yearly Total Transaction</div>
                                <div className="flex-auto max-md:max-w-full">Monthly Transaction</div>
                            </div>
                            <div className="mt-5 max-md:pr-5 max-md:max-w-full">
                                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                    <StatChart imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/6b8a6ced3b1d78fcecd776b74a6cc5f2b51f7abe26ef605d4cf987068d1f53fb?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="Yearly Transaction Graph" yearlyAmount="$40,000" />
                                    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cf8c6b45b4f0d8c636b02fc854f10d1b748ab1e8d8ff7682f027b26cbe4fa03?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="Monthly Transaction Graph" className="grow w-full aspect-[1.92] max-md:mt-8 max-md:max-w-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;