
type ContactItemProps = {
    icon: string;
    title: string;
    content: string;
}

function ContactItem({ icon, title, content }: ContactItemProps) {
    return (
        <div className="flex gap-2.5">
            <img loading="lazy" src={icon} alt="" className="shrink-0 aspect-square w-[68px]" />
            <div className="flex flex-col my-auto">
                <div className="text-xl font-semibold">{title}</div>
                <div className="text-lg">{content}</div>
            </div>
        </div>
    )
}

const contactItems = [
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/af9cbdab7cacd1fc582a3f37429ce18938b6a1162a3c3d2b6ee4232850e108d3?apiKey=62cb0e3201dd4b038734137173080a0d&",
        title: "Call Us",
        content: "+91 7593950878",
    },
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cbda78aeaeb6ba8ae6665d0e2a3ca22460ecd6e06a2c300e310b8dafee481d7b?apiKey=62cb0e3201dd4b038734137173080a0d&",
        title: "Mail Us",
        content: "mail@askexpert.com",
    },
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7086d864de2ba059bfef87352f24722c30d592d58ef4d733c146fbdf3baf8900?apiKey=62cb0e3201dd4b038734137173080a0d&",
        title: "Location",
        content: "Calicut, 109-74",
    },
];

const socialIcons = ["https://cdn.builder.io/api/v1/image/assets/TEMP/77a5f443bf8fac7ba66a7db3574e7e3e1171e994b17be725c06909b47261517e?apiKey=62cb0e3201dd4b038734137173080a0d&", "https://cdn.builder.io/api/v1/image/assets/TEMP/af911cab0221f7491f613b7ea0c77b4287fedc663e5296ff3635d13e6dd8865a?apiKey=62cb0e3201dd4b038734137173080a0d&", "https://cdn.builder.io/api/v1/image/assets/TEMP/06c06623ad5a2e934a647a3cf0edaf9e8519d79c3cfa65575fabaaaafca70598?apiKey=62cb0e3201dd4b038734137173080a0d&", "https://cdn.builder.io/api/v1/image/assets/TEMP/80b176474a4e6fdef411c343e002891ee3b2dd07ba3c78bff13a284052916a2e?apiKey=62cb0e3201dd4b038734137173080a0d&"];

export default function Footer() {
    return (
        <footer className="flex flex-col items-center p-5 bg-neutral-700 max-md:px-5">
            <div className="flex gap-5 justify-between pr-4 mt-4 max-w-full text-white w-[1220px] max-md:flex-wrap">
                <div className="flex gap-3 my-auto text-3xl font-semibold leading-8 whitespace-nowrap">
                    <img
                        loading="lazy"
                        src="/Ask.svg"
                        alt="AskExperts logo"
                        className="shrink-0 self-start aspect-[1.08] w-[40px]"
                    />
                    <div>AskExperts</div>
                </div>
                <div className="flex gap-5 px-px max-md:flex-wrap max-md:max-w-full">
                    {contactItems.map((item, index) => (
                        <ContactItem key={index} {...item} />
                    ))}
                </div>
            </div>
            <div className="shrink-0 mt-14 max-w-full h-px border border-solid bg-neutral-500 border-neutral-500 w-[1220px] max-md:mt-10" />
            <div className="flex justify-center items-center px-16 mt-12 max-w-full w-[1220px] max-md:px-5 max-md:mt-10">
                <div className="flex gap-5 justify-between max-w-full w-[888px] max-md:flex-wrap">
                    <div className="text-lg leading-7 text-indigo-500">
                        Copyright © <span className="text-teal-400">AskExpert</span> | Designed by{" "}
                        <span className="text-indigo-500">Muhsin</span>
                    </div>
                    <div className="flex gap-4 py-1.5">
                        <div className="grow my-auto text-lg leading-7 text-white">Follow :</div>
                        <div className="flex gap-4">
                            {socialIcons.map((icon, index) => (
                                <img key={index} loading="lazy" src={icon} alt="" className="shrink-0 aspect-square w-[17px]" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}