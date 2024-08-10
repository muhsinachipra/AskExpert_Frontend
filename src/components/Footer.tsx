// frontend\src\components\Footer.tsx

type ContactItemProps = {
    icon: string;
    title: string;
    content: string;
};

function ContactItem({ icon, title, content }: ContactItemProps) {
    return (
        <div className="flex items-start gap-4">
            <img loading="lazy" src={icon} alt={title} className="w-12 h-12" />
            <div>
                <div className="text-lg font-medium text-gray-100">{title}</div>
                <div className="text-sm text-gray-300">{content}</div>
            </div>
        </div>
    );
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

const socialIcons = [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/77a5f443bf8fac7ba66a7db3574e7e3e1171e994b17be725c06909b47261517e?apiKey=62cb0e3201dd4b038734137173080a0d&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/af911cab0221f7491f613b7ea0c77b4287fedc663e5296ff3635d13e6dd8865a?apiKey=62cb0e3201dd4b038734137173080a0d&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/06c06623ad5a2e934a647a3cf0edaf9e8519d79c3cfa65575fabaaaafca70598?apiKey=62cb0e3201dd4b038734137173080a0d&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/80b176474a4e6fdef411c343e002891ee3b2dd07ba3c78bff13a284052916a2e?apiKey=62cb0e3201dd4b038734137173080a0d&"
];

export default function Footer() {
    return (
        <footer className="bg-neutral-800 text-gray-100 pt-7">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center mb-8">
                    <div className="flex items-center gap-3 mb-6 md:mb-0 text-3xl font-bold text-teal-400">
                        <img
                            loading="lazy"
                            src="/Ask.svg"
                            alt="AskExperts logo"
                            className="w-10 h-10"
                        />
                        AskExperts
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        {contactItems.map((item, index) => (
                            <ContactItem key={index} {...item} />
                        ))}
                    </div>
                </div>
                <div className="border-t border-gray-700 py-6">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="text-sm text-gray-400">
                            © {new Date().getFullYear()} AskExperts. Designed by{" "}
                            <span className="text-indigo-400">Muhsin</span>.
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-gray-300">Follow us:</span>
                            <div className="flex gap-4">
                                {socialIcons.map((icon, index) => (
                                    <img
                                        key={index}
                                        loading="lazy"
                                        src={icon}
                                        alt=""
                                        className="w-6 h-6"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}