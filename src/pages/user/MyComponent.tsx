// import * as React from "react";

// interface CardProps {
//     imageSrc: string;
//     title: string;
// }

// const Card: React.FC<CardProps> = ({ imageSrc, title }) => {
//     return (
//         <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
//             <div className="flex overflow-hidden relative flex-col grow justify-center text-4xl text-white whitespace-nowrap rounded-xl min-h-[298px] max-md:mt-10 max-md:max-w-full">
//                 <img src={imageSrc} alt="" className="object-cover absolute inset-0 size-full" />
//                 <div className="overflow-hidden relative flex-col justify-center items-start px-10 pt-40 pb-20 w-full min-h-[298px] max-md:px-5 max-md:pt-10 max-md:max-w-full">
//                     <img src={imageSrc} alt="" className="object-cover absolute inset-0 size-full" />
//                     {title}
//                 </div>
//             </div>
//         </div>
//     );
// };

// const cardData = [
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Doctors" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Lawyers" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Mechanics" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "IT Professionals" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Career Advisors" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Finance Advisors" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Psychologist" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Veterinarian" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Dietitian" },
// ];

// function MyComponent() {
//     return (
//         <div className="flex flex-wrap justify-center content-center items-center px-16 py-20 max-md:px-5">
//             <div className="flex flex-col w-full max-w-[1590px] max-md:max-w-full">
//                 <div className="max-md:max-w-full">
//                     <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                         {cardData.slice(0, 3).map((card, index) => (
//                             <Card key={index} imageSrc={card.imageSrc} title={card.title} />
//                         ))}
//                     </div>
//                 </div>
//                 <div className="mt-14 max-md:mt-10 max-md:max-w-full">
//                     <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                         {cardData.slice(3, 6).map((card, index) => (
//                             <Card key={index} imageSrc={card.imageSrc} title={card.title} />
//                         ))}
//                     </div>
//                 </div>
//                 <div className="mt-14 max-md:mt-10 max-md:max-w-full">
//                     <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                         {cardData.slice(6).map((card, index) => (
//                             <Card key={index} imageSrc={card.imageSrc} title={card.title} />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MyComponent;






// how it works 

// import * as React from "react";

// interface StepItemProps {
//   imageSrc: string;
//   text: string;
// }

// const StepItem: React.FC<StepItemProps> = ({ imageSrc, text }) => (
//   <div className="flex gap-1 py-11 max-md:text-4xl">
//     <img loading="lazy" src={imageSrc} alt="" className="shrink-0 self-start aspect-square w-[49px]" />
//     <div className="flex-auto max-md:text-4xl">{text}</div>
//   </div>
// );

// const MyComponent: React.FC = () => {
//   const steps = [
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/256cee23740160a358b502430676202975f0a181096ee7b7d09e59295c4ca92c?apiKey=62cb0e3201dd4b038734137173080a0d&", text: "Register For Free" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/256cee23740160a358b502430676202975f0a181096ee7b7d09e59295c4ca92c?apiKey=62cb0e3201dd4b038734137173080a0d&", text: "Choose a Category" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/256cee23740160a358b502430676202975f0a181096ee7b7d09e59295c4ca92c?apiKey=62cb0e3201dd4b038734137173080a0d&", text: "Find your Expert" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/256cee23740160a358b502430676202975f0a181096ee7b7d09e59295c4ca92c?apiKey=62cb0e3201dd4b038734137173080a0d&", text: "Take an Appointment" },
//   ];

//   return (
//     <section className="flex gap-5 items-center px-20 py-8 font-bold text-black bg-emerald-300 max-md:flex-wrap max-md:px-5">
//       <h2 className="self-stretch my-auto text-9xl text-center leading-[140px] max-md:max-w-full max-md:text-4xl max-md:leading-[52px]">
//         HERE IS HOW IT WORKS
//       </h2>
//       <div className="shrink-0 self-stretch my-auto w-px bg-black border border-black border-solid h-[309px]" />
//       <div className="flex flex-col self-stretch text-5xl leading-[140.16px] max-md:text-4xl">
//         {steps.map((step, index) => (
//           <StepItem key={index} imageSrc={step.imageSrc} text={step.text} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MyComponent;






// testimony




// import * as React from "react";

// interface TestimonialCardProps {
//     imageSrc: string;
//     name: string;
//     role: string;
//     ratingImageSrc: string;
//     testimonial: string;
// }

// const TestimonialCard: React.FC<TestimonialCardProps> = ({
//     imageSrc,
//     name,
//     role,
//     ratingImageSrc,
//     testimonial,
// }) => (
//     <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
//         <div className="flex flex-col grow justify-center px-9 py-12 mx-auto w-full shadow-lg bg-neutral-100 max-md:px-5 max-md:mt-10">
//             <div className="flex gap-4">
//                 <img
//                     loading="lazy"
//                     src={imageSrc}
//                     alt={`${name}'s profile picture`}
//                     className="shrink-0 max-w-full aspect-square w-[101px]"
//                 />
//                 <div className="flex flex-col my-auto">
//                     <div className="text-xl font-semibold text-neutral-700">{name}</div>
//                     <div className="text-base leading-5 text-zinc-500">{role}</div>
//                     <img
//                         loading="lazy"
//                         src={ratingImageSrc}
//                         alt={`${name}'s averageRating`}
//                         className="max-w-full aspect-[4.76] w-[121px]"
//                     />
//                 </div>
//             </div>
//             <div className="mt-9 text-2xl italic leading-8 text-zinc-500">
//                 "{testimonial}"
//             </div>
//         </div>
//     </div>
// );

// const testimonialData: TestimonialCardProps[] = [
//     {
//         imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f035b502e5e329fe20236ea8fc8903b1b5919d6fabfffdeffe5775d9765b7e5b?apiKey=62cb0e3201dd4b038734137173080a0d&",
//         name: "Nattasha Kelvin",
//         role: "Designer",
//         ratingImageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ce0bc98c5639187ba9346f0f68479cbe4e22b4746cfccc3ac4b04e8069439de9?apiKey=62cb0e3201dd4b038734137173080a0d&",
//         testimonial:
//             "Add an excerpt from your personal biography, or simply let the world know who you are and what you have to offer. Connect with your site visitor's on a personal level and make sure that your site.",
//     },
//     {
//         imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f55989522d27d5a327c95a0190690fef912b5f6c2554e4f5ddd2e1350d8ed431?apiKey=62cb0e3201dd4b038734137173080a0d&",
//         name: "Nattasha Kelvin",
//         role: "Designer",
//         ratingImageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/226d3d8f2e04c458e83641b8b13ceabfec84d7e1a39b00c13b8987f82aca26b5?apiKey=62cb0e3201dd4b038734137173080a0d&",
//         testimonial:
//             "Add an excerpt from your personal biography, or simply let the world know who you are and what you have to offer. Connect with your site visitor's on a personal level and make sure that your site.",
//     },
//     {
//         imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/3b442835c561cbb7c7582c1b8e0a38f9ec5cbeff1deca5d009922e5594ed8b9a?apiKey=62cb0e3201dd4b038734137173080a0d&",
//         name: "Nattasha Kelvin",
//         role: "Designer",
//         ratingImageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/78cd5398b1656e81123c62ecbfd12d01a498b636e1eaa2d921ef82cd03dd6fa0?apiKey=62cb0e3201dd4b038734137173080a0d&",
//         testimonial:
//             "Add an excerpt from your personal biography, or simply let the world know who you are and what you have to offer. Connect with your site visitor's on a personal level and make sure that your site.",
//     },
//     {
//         imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4939d453edf50a307e83b840364cc5c75ae87a71e3f3845dc9af4ada4d7f411?apiKey=62cb0e3201dd4b038734137173080a0d&",
//         name: "Nattasha Kelvin",
//         role: "Designer",
//         ratingImageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/45d25706567341d4acbb503b117d76fe8d9c497e1325908f4f661197a8640ddf?apiKey=62cb0e3201dd4b038734137173080a0d&",
//         testimonial:
//             "Add an excerpt from your personal biography, or simply let the world know who you are and what you have to offer. Connect with your site visitor's on a personal level and make sure that your site.",
//     },
// ];

// export default function MyComponent() {
//     return (
//         <section className="flex flex-col justify-center px-16 py-20 bg-white bg-opacity-50 max-md:px-5">
//             <div className="flex justify-center items-center self-center px-16 mt-16 max-w-full text-neutral-700 w-[735px] max-md:px-5 max-md:mt-10">
//                 <div className="flex flex-col max-w-full w-[486px]">
//                     <div className="flex gap-1.5 self-center py-1 text-lg font-medium whitespace-nowrap">
//                         <div className="shrink-0 self-start w-3 h-3 bg-teal-400" />
//                         <div>Testimonial</div>
//                     </div>
//                     <h2 className="mt-4 text-4xl font-bold text-justify capitalize leading-[48.4px] max-md:max-w-full">
//                         What Our Users Say's
//                     </h2>
//                 </div>
//             </div>
//             <div className="justify-center mt-24 max-md:mt-10 max-md:max-w-full">
//                 <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                     {testimonialData.map((testimonial, index) => (
//                         <TestimonialCard
//                             key={index}
//                             imageSrc={testimonial.imageSrc}
//                             name={testimonial.name}
//                             role={testimonial.role}
//                             ratingImageSrc={testimonial.ratingImageSrc}
//                             testimonial={testimonial.testimonial}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }




// are you an expert 




// import * as React from "react";

// interface CardProps {
//     imageSrc: string;
//     title: string;
//     description: string;
// }

// const Card: React.FC<CardProps> = ({ imageSrc, title, description }) => {
//     return (
//         <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
//             <div className="flex flex-col grow text-lg font-semibold text-center max-md:mt-8">
//                 <img
//                     loading="lazy"
//                     src={imageSrc}
//                     alt=""
//                     className="z-10 self-center aspect-square w-[72px]"
//                 />
//                 <div className="flex flex-col items-center px-11 py-14 bg-zinc-100 max-md:px-5">
//                     <h3 className="text-2xl leading-8 text-neutral-700">{title}</h3>
//                     <p className="self-stretch mt-4 leading-7 text-zinc-500">
//                         {description}
//                     </p>
//                     <div className="mt-9 text-indigo-500 capitalize">Testimonials</div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const MyComponent: React.FC = () => {
//     const cardData = [
//         {
//             imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/06d49ec44eeac234922ab0ffe08f5b0a33e671555dd94f51766a59bac0d7e087?apiKey=62cb0e3201dd4b038734137173080a0d&",
//             title: "Verify Credentials",
//             description:
//                 "Leverage agile frameworks provide <br /> synopsishigh level overviews <br /> value proposition.",
//         },
//         {
//             imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f6c5a6423272498037311b68ccdd3a8e38409d6f2d3593436ff88b622c848e38?apiKey=62cb0e3201dd4b038734137173080a0d&",
//             title: "Interview",
//             description:
//                 "Leverage agile frameworks provide <br /> synopsishigh level overviews <br /> value proposition.",
//         },
//         {
//             imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ed0ad1a0c55f93d2134e819ee1aaee0ec842ad86df737ea73da1ca9a437b1d04?apiKey=62cb0e3201dd4b038734137173080a0d&",
//             title: "Start Earning",
//             description:
//                 "Leverage agile frameworks provide <br /> synopsishigh level overviews <br /> value proposition.",
//         },
//     ];

//     return (
//         <div className="flex justify-center items-center p-16 bg-gray-200 bg-opacity-50 max-md:px-5">
//             <div className="flex flex-col w-full max-w-[1715px] max-md:max-w-full">
//                 <div className="flex justify-center items-center px-16 max-md:px-5 max-md:max-w-full">
//                     <div className="flex flex-col items-center w-full max-w-[1320px] max-md:max-w-full">
//                         <div className="flex gap-1.5 py-0.5 text-lg font-medium text-neutral-700">
//                             <div className="shrink-0 self-start w-3 h-3 bg-teal-400" />
//                             <h2 className="flex-auto">Get hired as an expert</h2>
//                         </div>
//                         <h1 className="mt-4 text-4xl font-bold text-center leading-[48.4px] text-neutral-700">
//                             Are You An Expert ?
//                         </h1>
//                         <div className="justify-center self-stretch px-12 mt-10 max-md:px-5 max-md:mt-10 max-md:max-w-full">
//                             <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                                 {cardData.map((card, index) => (
//                                     <Card key={index} {...card} />
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <button className="justify-center self-center px-12 py-5 mt-12 text-4xl font-semibold text-center capitalize bg-teal-400 text-neutral-700 max-md:px-5 max-md:mt-10">
//                     Join Experts
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default MyComponent;





// join our team 

// footer 


// import * as React from "react";

// interface ContactItemProps {
//     icon: string;
//     title: string;
//     content: string;
// }

// const ContactItem: React.FC<ContactItemProps> = ({ icon, title, content }) => (
//     <div className="flex gap-2.5">
//         <img loading="lazy" src={icon} alt="" className="shrink-0 aspect-square w-[68px]" />
//         <div className="flex flex-col my-auto">
//             <div className="text-xl font-semibold">{title}</div>
//             <div className="text-lg">{content}</div>
//         </div>
//     </div>
// );

// const contactItems: ContactItemProps[] = [
//     {
//         icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/af9cbdab7cacd1fc582a3f37429ce18938b6a1162a3c3d2b6ee4232850e108d3?apiKey=62cb0e3201dd4b038734137173080a0d&",
//         title: "Call Us",
//         content: "+91 7593950878",
//     },
//     {
//         icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cbda78aeaeb6ba8ae6665d0e2a3ca22460ecd6e06a2c300e310b8dafee481d7b?apiKey=62cb0e3201dd4b038734137173080a0d&",
//         title: "Mail Us",
//         content: "mail@askexpert.com",
//     },
//     {
//         icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7086d864de2ba059bfef87352f24722c30d592d58ef4d733c146fbdf3baf8900?apiKey=62cb0e3201dd4b038734137173080a0d&",
//         title: "Location",
//         content: "Calicut, 109-74",
//     },
// ];

// const socialIcons = ["https://cdn.builder.io/api/v1/image/assets/TEMP/77a5f443bf8fac7ba66a7db3574e7e3e1171e994b17be725c06909b47261517e?apiKey=62cb0e3201dd4b038734137173080a0d&", "https://cdn.builder.io/api/v1/image/assets/TEMP/af911cab0221f7491f613b7ea0c77b4287fedc663e5296ff3635d13e6dd8865a?apiKey=62cb0e3201dd4b038734137173080a0d&", "https://cdn.builder.io/api/v1/image/assets/TEMP/06c06623ad5a2e934a647a3cf0edaf9e8519d79c3cfa65575fabaaaafca70598?apiKey=62cb0e3201dd4b038734137173080a0d&", "https://cdn.builder.io/api/v1/image/assets/TEMP/80b176474a4e6fdef411c343e002891ee3b2dd07ba3c78bff13a284052916a2e?apiKey=62cb0e3201dd4b038734137173080a0d&"];

// function MyComponent() {
//     return (
//         <footer className="flex flex-col items-center p-20 bg-neutral-700 max-md:px-5">
//             <div className="flex gap-5 justify-between pr-4 mt-4 max-w-full text-white w-[1220px] max-md:flex-wrap">
//                 <div className="flex gap-3 my-auto text-3xl font-semibold leading-8 whitespace-nowrap">
//                     <img
//                         loading="lazy"
//                         src="https://cdn.builder.io/api/v1/image/assets/TEMP/cbad5d12f5a4391068eda906f99c3f42e569752683f1630ede35fa2e397c9415?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                         alt="AskExperts logo"
//                         className="shrink-0 self-start aspect-[1.08] w-[30px]"
//                     />
//                     <div>AskExperts</div>
//                 </div>
//                 <div className="flex gap-5 px-px max-md:flex-wrap max-md:max-w-full">
//                     {contactItems.map((item, index) => (
//                         <ContactItem key={index} {...item} />
//                     ))}
//                 </div>
//             </div>
//             <div className="shrink-0 mt-14 max-w-full h-px border border-solid bg-neutral-500 border-neutral-500 w-[1220px] max-md:mt-10" />
//             <div className="flex justify-center items-center px-16 mt-12 max-w-full w-[1220px] max-md:px-5 max-md:mt-10">
//                 <div className="flex gap-5 justify-between max-w-full w-[888px] max-md:flex-wrap">
//                     <div className="text-lg leading-7 text-indigo-500">
//                         Copyright © <span className="text-teal-400">AskExpert</span> | Designed by{" "}
//                         <span className="text-indigo-500">Muhsin</span>
//                     </div>
//                     <div className="flex gap-4 py-1.5">
//                         <div className="grow my-auto text-lg leading-7 text-white">Follow :</div>
//                         <div className="flex gap-4">
//                             {socialIcons.map((icon, index) => (
//                                 <img key={index} loading="lazy" src={icon} alt="" className="shrink-0 aspect-square w-[17px]" />
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// }

// export default MyComponent;



// header 


// import * as React from "react";

// interface NavItemProps {
//     label: string;
// }

// const NavItem: React.FC<NavItemProps> = ({ label }) => {
//     return (
//         <div className="justify-center px-px py-1 my-auto text-lg">{label}</div>
//     );
// };

// const navItems = [
//     { label: "Home" },
//     { label: "About Us" },
//     { label: "Contact Us" },
// ];

// const MyComponent: React.FC = () => {
//     return (
//         <header className="flex gap-5 px-16 py-8 text-white bg-neutral-700 max-md:flex-wrap max-md:px-5">
//             <div className="flex gap-5 justify-between pr-4 max-md:flex-wrap max-md:max-w-full">
//                 <div className="flex gap-3 my-auto text-3xl font-semibold leading-8 whitespace-nowrap">
//                     <img
//                         loading="lazy"
//                         src="https://cdn.builder.io/api/v1/image/assets/TEMP/cdee7237126b35b283a966e4d90a69e9f07eb3c054816d7fe96d9b9b7a61a8e1?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                         alt="AskExperts logo"
//                         className="shrink-0 self-start aspect-[1.03] w-[30px]"
//                     />
//                     <h1>AskExperts</h1>
//                 </div>
//                 <nav className="flex gap-5 pl-20 text-center max-md:flex-wrap">
//                     {navItems.map((item, index) => (
//                         <NavItem key={index} label={item.label} />
//                     ))}
//                     <button className="justify-center px-9 pt-5 pb-6 text-xl font-medium whitespace-nowrap bg-indigo-500 max-md:px-5">
//                         Logout
//                     </button>
//                 </nav>
//             </div>
//             <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4f58c212eae37a5d1a2f717f2cd0a50e54909bdce13fc3b457870a828569a33?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                 alt="User avatar"
//                 className="shrink-0 my-auto aspect-square w-[50px]"
//             />
//         </header>
//     );
// };

// export default MyComponent;




// notification full page 


// import * as React from "react";

// interface NotificationItemProps {
//     time: string;
//     name: string;
//     role: string;
//     buttonText: string;
//     buttonColor: string;
// }

// const NotificationItem: React.FC<NotificationItemProps> = ({
//     time,
//     name,
//     role,
//     buttonText,
//     buttonColor,
// }) => {
//     return (
//         <div className="flex gap-5 justify-between px-11 py-11 mt-5 w-full bg-zinc-100 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
//             <div className="flex gap-0 self-start max-md:flex-wrap">
//                 <time className="pt-5 text-5xl font-bold text-black whitespace-nowrap leading-[72px] max-md:text-4xl">
//                     {time}
//                 </time>
//                 <div className="flex gap-5 justify-between self-end mt-12 text-3xl font-extrabold tracking-wide leading-6 text-zinc-600 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
//                     <div className="flex gap-2">
//                         <svg
//                             className="shrink-0 w-6 h-6 fill-zinc-300"
//                             focusable="false"
//                             aria-hidden="true"
//                         >
//                             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
//                         </svg>
//                         <div>{name}</div>
//                     </div>
//                     <div className="flex gap-2">
//                         <svg
//                             className="shrink-0 w-6 h-6 fill-zinc-300"
//                             focusable="false"
//                             aria-hidden="true"
//                         >
//                             <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
//                         </svg>
//                         <div>{role}</div>
//                     </div>
//                 </div>
//             </div>
//             <button
//                 className={`justify-center items-center px-16 py-6 text-4xl font-semibold text-center capitalize max-md:px-5 ${buttonColor === "bg-teal-400" ? "text-black" : "text-white"
//                     } ${buttonColor}`}
//             >
//                 {buttonText}
//             </button>
//         </div>
//     );
// };

// const notifications: NotificationItemProps[] = [
//     {
//         time: "07:00PM",
//         name: "Jane Doe",
//         role: "Finance Advisor",
//         buttonText: "Join now",
//         buttonColor: "bg-teal-400",
//     },
//     {
//         time: "08:00PM",
//         name: "Cristopher",
//         role: "Veterinarian",
//         buttonText: "Cancel",
//         buttonColor: "bg-red-500",
//     },
//     {
//         time: "09:00PM",
//         name: "John Doe",
//         role: "Career Advisor",
//         buttonText: "Cancel",
//         buttonColor: "bg-red-500",
//     },
// ];

// function MyComponent() {
//     return (
//         <div className="flex flex-col bg-white">
//             <header className="flex gap-5 justify-end px-16 py-9 w-full text-white bg-neutral-700 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
//                 <div className="flex gap-5 justify-between pr-4 max-md:flex-wrap max-md:max-w-full">
//                     <div className="flex gap-3 my-auto text-3xl font-semibold leading-8 whitespace-nowrap">
//                         <img
//                             loading="lazy"
//                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/3224fa541adf05fb3386786ebf840699f99e0756b5a9193fcc8b01f2f08d760f?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                             alt="AskExperts logo"
//                             className="shrink-0 self-start aspect-[1.03] w-[30px]"
//                         />
//                         <div>AskExperts</div>
//                     </div>
//                     <nav className="flex gap-5 pl-20 text-lg text-center max-md:flex-wrap">
//                         <ul className="justify-center px-px py-1 my-auto">
//                             <li>
//                                 <a href="#">Home</a>
//                             </li>
//                             <li>
//                                 <a href="#">About Us</a>
//                             </li>
//                             <li>
//                                 <a href="#">Contact Us</a>
//                             </li>
//                         </ul>
//                     </nav>
//                 </div>
//                 <img
//                     loading="lazy"
//                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4f58c212eae37a5d1a2f717f2cd0a50e54909bdce13fc3b457870a828569a33?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                     alt="User avatar"
//                     className="shrink-0 my-auto aspect-square w-[50px]"
//                 />
//             </header>
//             <main className="flex flex-col self-center mt-20 w-full max-w-[1688px] max-md:mt-10 max-md:max-w-full">
//                 <h1 className="self-start ml-4 text-6xl font-semibold text-black max-md:ml-2.5 max-md:text-4xl">
//                     Notifications
//                 </h1>
//                 {notifications.map((notification) => (
//                     <NotificationItem key={notification.time} {...notification} />
//                 ))}
//             </main>
//             <footer className="flex flex-col items-center p-20 w-full bg-neutral-700 mt-[482px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
//                 <div className="flex gap-5 justify-between pr-4 mt-4 max-w-full text-white w-[1220px] max-md:flex-wrap">
//                     <div className="flex gap-3 my-auto text-3xl font-semibold leading-8 whitespace-nowrap">
//                         <img
//                             loading="lazy"
//                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4f14ebefb67f8566a882749dffe1ca90db976fead6b815eae8633c9cabcb45e?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                             alt="AskExperts logo"
//                             className="shrink-0 self-start aspect-[1.08] w-[30px]"
//                         />
//                         <div>AskExperts</div>
//                     </div>
//                     <div className="flex gap-5 px-px max-md:flex-wrap max-md:max-w-full">
//                         <div className="flex gap-2.5">
//                             <img
//                                 loading="lazy"
//                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/f52e26abac697fc4d0f5c7c3195a9d16673193ac4492063e10f6b34ede72cf4a?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                                 alt="Phone icon"
//                                 className="shrink-0 aspect-square w-[68px]"
//                             />
//                             <div className="flex flex-col my-auto">
//                                 <div className="text-xl font-semibold">Call Us</div>
//                                 <div className="text-lg">+91 7593950878</div>
//                             </div>
//                         </div>
//                         <div className="flex gap-3">
//                             <img
//                                 loading="lazy"
//                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/6594ba1e9ea9c0c7512f11e5870654fd155be646217657c4a24ac4fcc78a6669?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                                 alt="Mail icon"
//                                 className="shrink-0 aspect-square w-[68px]"
//                             />
//                             <div className="flex flex-col my-auto">
//                                 <div className="text-xl font-semibold">Mail Us</div>
//                                 <div className="text-lg">mail@askexpert.com</div>
//                             </div>
//                         </div>
//                         <div className="flex gap-2.5">
//                             <img
//                                 loading="lazy"
//                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ac349b809fd0ea138ebb268df7de6824f6dda0b7e904908ef30d9fc71b84474?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                                 alt="Location icon"
//                                 className="shrink-0 aspect-square w-[68px]"
//                             />
//                             <div className="flex flex-col my-auto">
//                                 <div className="text-xl font-semibold">Location</div>
//                                 <div className="text-lg">Calicut, 109-74</div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <hr className="shrink-0 mt-14 max-w-full h-px border border-solid bg-neutral-500 border-neutral-500 w-[1220px] max-md:mt-10" />
//                 <div className="flex justify-center items-center px-16 mt-12 mb-1 max-w-full w-[1220px] max-md:px-5 max-md:mt-10">
//                     <div className="flex gap-5 justify-between max-w-full w-[888px] max-md:flex-wrap">
//                         <div className="text-lg leading-7 text-indigo-500">
//                             Copyright © <span className="text-teal-400">AskExpert</span> |
//                             Designed by <span className="text-indigo-500">Muhsin</span>
//                         </div>
//                         <div className="flex gap-4 py-1.5">
//                             <div className="grow my-auto text-lg leading-7 text-white">
//                                 Follow :
//                             </div>
//                             <div className="flex gap-4">
//                                 <img
//                                     loading="lazy"
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/cfa563bdcec2f9c77751f8a10db6573d19a10efaaafdd80b9ab74f425d4ee905?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                                     alt="Facebook icon"
//                                     className="shrink-0 aspect-square w-[17px]"
//                                 />
//                                 <img
//                                     loading="lazy"
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/af911cab0221f7491f613b7ea0c77b4287fedc663e5296ff3635d13e6dd8865a?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                                     alt="Twitter icon"
//                                     className="shrink-0 self-start aspect-[1.06] w-[17px]"
//                                 />
//                                 <img
//                                     loading="lazy"
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/06c06623ad5a2e934a647a3cf0edaf9e8519d79c3cfa65575fabaaaafca70598?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                                     alt="Instagram icon"
//                                     className="shrink-0 self-start aspect-[1.2] w-[18px]"
//                                 />
//                                 <img
//                                     loading="lazy"
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/80b176474a4e6fdef411c343e002891ee3b2dd07ba3c78bff13a284052916a2e?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                                     alt="LinkedIn icon"
//                                     className="shrink-0 aspect-square w-[17px]"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// }

// export default MyComponent;




// login 


// import * as React from "react";

// interface HeaderProps {
//     logoSrc: string;
// }

// const UserHeader: React.FC<HeaderProps> = ({ logoSrc }) => {
//     return (
//         <header className="flex justify-center items-center px-16 py-9 w-full text-white bg-neutral-700 max-md:px-5 max-md:max-w-full">
//             <div className="flex gap-5 justify-between pr-4 max-w-full w-[1220px] max-md:flex-wrap">
//                 <div className="flex gap-3 my-auto text-3xl font-semibold leading-8 whitespace-nowrap">
//                     <img loading="lazy" src={logoSrc} alt="AskExperts logo" className="shrink-0 self-start aspect-[1.03] w-[30px]" />
//                     <div>AskExperts</div>
//                 </div>
//                 <nav className="flex gap-5 pl-20 text-lg text-center max-md:flex-wrap">
//                     <a href="/" className="justify-center px-0.5 py-1 my-auto">Home</a>
//                     <a href="/about" className="justify-center px-0.5 py-1 my-auto">About Us</a>
//                     <a href="/contact" className="justify-center px-0.5 py-1 my-auto">Contact Us</a>
//                 </nav>
//             </div>
//         </header>
//     );
// };

// interface FooterProps {
//     logoSrc: string;
//     callIconSrc: string;
//     mailIconSrc: string;
//     locationIconSrc: string;
//     socialIcons: string[];
// }

// const Footer: React.FC<FooterProps> = ({ logoSrc, callIconSrc, mailIconSrc, locationIconSrc, socialIcons }) => {
//     return (
//         <footer className="flex flex-col items-center p-20 mt-28 w-full bg-neutral-700 max-md:px-5 max-md:mt-10 max-md:max-w-full">
//             <div className="flex gap-5 justify-between pr-4 mt-4 max-w-full text-white w-[1220px] max-md:flex-wrap">
//                 <div className="flex gap-3 my-auto text-3xl font-semibold leading-8 whitespace-nowrap">
//                     <img loading="lazy" src={logoSrc} alt="AskExperts logo" className="shrink-0 self-start aspect-[1.08] w-[30px]" />
//                     <div>AskExperts</div>
//                 </div>
//                 <div className="flex gap-5 px-px max-md:flex-wrap max-md:max-w-full">
//                     <div className="flex gap-2.5">
//                         <img loading="lazy" src={callIconSrc} alt="Call icon" className="shrink-0 aspect-square w-[68px]" />
//                         <div className="flex flex-col my-auto">
//                             <div className="text-xl font-semibold">Call Us</div>
//                             <div className="text-lg">+91 7593950878</div>
//                         </div>
//                     </div>
//                     <div className="flex gap-3">
//                         <img loading="lazy" src={mailIconSrc} alt="Mail icon" className="shrink-0 aspect-square w-[68px]" />
//                         <div className="flex flex-col my-auto">
//                             <div className="text-xl font-semibold">Mail Us</div>
//                             <div className="text-lg">mail@askexpert.com</div>
//                         </div>
//                     </div>
//                     <div className="flex gap-2.5">
//                         <img loading="lazy" src={locationIconSrc} alt="Location icon" className="shrink-0 aspect-square w-[68px]" />
//                         <div className="flex flex-col my-auto">
//                             <div className="text-xl font-semibold">Location</div>
//                             <div className="text-lg">Calicut, 109-74</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="shrink-0 mt-14 max-w-full h-px border border-solid bg-neutral-500 border-neutral-500 w-[1220px] max-md:mt-10" />
//             <div className="flex justify-center items-center px-16 mt-12 mb-1 max-w-full w-[1220px] max-md:px-5 max-md:mt-10">
//                 <div className="flex gap-5 justify-between max-w-full w-[888px] max-md:flex-wrap">
//                     <div className="text-lg leading-7 text-indigo-500">
//                         Copyright © <span className="text-teal-400">AskExpert</span> | Designed by <span className="text-indigo-500">Muhsin</span>
//                     </div>
//                     <div className="flex gap-4 py-1.5">
//                         <div className="grow my-auto text-lg leading-7 text-white">Follow :</div>
//                         <div className="flex gap-4">
//                             {socialIcons.map((icon, index) => (
//                                 <img key={index} loading="lazy" src={icon} alt={`Social icon ${index + 1}`} className="shrink-0 aspect-square w-[17px]" />
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// const LoginPage: React.FC = () => {
//     return (
//         <div className="flex flex-col justify-center items-center self-center p-20 mt-40 max-w-full text-lg font-semibold bg-stone-50 text-neutral-700 w-[696px] max-md:px-5 max-md:mt-10">
//             <h1 className="mt-5 text-4xl font-bold text-center leading-[48.4px]">Log In</h1>
//             <form>
//                 <label htmlFor="email" className="sr-only">Your email</label>
//                 <input
//                     type="email"
//                     id="email"
//                     placeholder="Your email"
//                     className="justify-center items-start px-12 py-7 mt-11 max-w-full bg-white border border-solid border-zinc-300 w-[464px] max-md:px-5 max-md:mt-10"
//                     aria-label="Your email"
//                 />
//                 <label htmlFor="password" className="sr-only">Your password</label>
//                 <input
//                     type="password"
//                     id="password"
//                     placeholder="Your password"
//                     className="justify-center items-start px-12 py-6 mt-5 max-w-full bg-white border border-solid border-zinc-300 w-[464px] max-md:px-5"
//                     aria-label="Your password"
//                 />
//                 <button
//                     type="submit"
//                     className="justify-center items-center px-16 pt-5 pb-6 mt-5 max-w-full text-center text-white capitalize whitespace-nowrap bg-indigo-500 w-[464px] max-md:px-5"
//                 >
//                     Submit
//                 </button>
//             </form>
//             <button
//                 type="button"
//                 className="flex justify-center items-center px-2 py-4 mt-5 max-w-full tracking-normal bg-white rounded-xl border border-solid shadow-sm border-neutral-200 leading-[120%] text-neutral-800 w-[464px] max-md:px-5"
//             >
//                 <div className="flex gap-2">
//                     <div>Continue with Google</div>
//                     <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b8584b5e6fb7c3fdba6133b1f81df380fc7a5916ce9c1c11a09954e726d68bb?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="Google logo" className="shrink-0 w-6 aspect-square" />
//                 </div>
//             </button>
//             <button
//                 type="button"
//                 className="flex justify-center items-center px-2 py-4 mt-5 max-w-full tracking-normal bg-white rounded-xl border border-solid shadow-sm border-neutral-200 leading-[120%] text-neutral-800 w-[464px] max-md:px-5"
//             >
//                 <div className="flex gap-2">
//                     <div>Continue with Apple</div>
//                     <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b04c18ddeee3e90460e96528f39738e456e64fd197f92c7a8dc22da58c928855?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="Apple logo" className="shrink-0 w-6 aspect-square" />
//                 </div>
//             </button>
//             <a href="/register" className="flex gap-1.5 py-0.5 mt-5 font-medium">
//                 <div className="shrink-0 self-start w-3 h-3 bg-teal-400" />
//                 <div className="flex-auto">Register Here</div>
//             </a>
//         </div>
//     );
// };

// interface MyComponentProps {
//     headerLogoSrc: string;
//     footerLogoSrc: string;
//     callIconSrc: string;
//     mailIconSrc: string;
//     locationIconSrc: string;
//     socialIcons: string[];
// }

// const MyComponent: React.FC<MyComponentProps> = ({
//     headerLogoSrc,
//     footerLogoSrc,
//     callIconSrc,
//     mailIconSrc,
//     locationIconSrc,
//     socialIcons,
// }) => {
//     return (
//         <div className="flex flex-col bg-white">
//             <UserHeader logoSrc={headerLogoSrc} />
//             <main>
//                 <LoginPage />
//             </main>
//             <Footer
//                 logoSrc={footerLogoSrc}
//                 callIconSrc={callIconSrc}
//                 mailIconSrc={mailIconSrc}
//                 locationIconSrc={locationIconSrc}
//                 socialIcons={socialIcons}
//             />
//         </div>
//     );
// };

// export default MyComponent;




// register 

// import * as React from "react";

// interface HeaderProps {
//   logoSrc: string;
// }

// const UserHeader: React.FC<HeaderProps> = ({ logoSrc }) => {
//   return (
//     <header className="flex justify-center items-center px-16 py-9 w-full text-white bg-neutral-700 max-md:px-5 max-md:max-w-full">
//       <div className="flex gap-5 justify-between pr-4 max-w-full w-[1220px] max-md:flex-wrap">
//         <div className="flex gap-3 my-auto text-3xl font-semibold leading-8 whitespace-nowrap">
//           <img loading="lazy" src={logoSrc} alt="AskExperts logo" className="shrink-0 self-start aspect-[1.03] w-[30px]" />
//           <h1>AskExperts</h1>
//         </div>
//         <nav className="flex gap-5 pl-20 text-lg text-center max-md:flex-wrap">
//           <a href="#" className="justify-center px-0.5 py-1 my-auto">Home</a>
//           <a href="#" className="justify-center px-0.5 py-1 my-auto">About Us</a>
//           <a href="#" className="justify-center px-0.5 py-1 my-auto">Contact Us</a>
//         </nav>
//       </div>
//     </header>
//   );
// };

// const RegisterForm: React.FC = () => {
//   return (
//     <section className="flex flex-col justify-center items-center self-center p-20 mt-40 max-w-full text-lg bg-stone-50 text-neutral-700 w-[696px] max-md:px-5 max-md:mt-10">
//       <h2 className="mt-5 text-4xl font-bold text-center leading-[48.4px]">Register</h2>
//       <form className="flex flex-col items-center">
//         <label htmlFor="email" className="sr-only">Enter email</label>
//         <input
//           type="email"
//           id="email"
//           placeholder="Enter email"
//           className="justify-center items-start px-12 py-7 mt-11 max-w-full bg-white border border-solid border-zinc-300 w-[464px] max-md:px-5 max-md:mt-10"
//           aria-label="Enter email"
//         />
//         <label htmlFor="password" className="sr-only">Enter password</label>
//         <input
//           type="password"
//           id="password"
//           placeholder="Enter password"
//           className="justify-center items-start px-12 py-6 mt-6 max-w-full bg-white border border-solid border-zinc-300 w-[464px] max-md:px-5"
//           aria-label="Enter password"
//         />
//         <label htmlFor="confirmPassword" className="sr-only">Confirm password</label>
//         <input
//           type="password"
//           id="confirmPassword"
//           placeholder="Confirm password"
//           className="justify-center items-start px-12 py-6 mt-6 max-w-full bg-white border border-solid border-zinc-300 w-[464px] max-md:px-5"
//           aria-label="Confirm password"
//         />
//         <button
//           type="submit"
//           className="justify-center items-center px-16 pt-5 pb-6 mt-6 max-w-full font-semibold text-center text-white capitalize bg-indigo-500 w-[464px] max-md:px-5"
//         >
//           Get OTP
//         </button>
//       </form>
//       <div className="flex gap-1.5 py-0.5 mt-6 font-medium">
//         <div className="shrink-0 self-start w-3 h-3 bg-teal-400" />
//         <a href="#">Login Here</a>
//       </div>
//     </section>
//   );
// };

// interface ContactInfoProps {
//   phoneNumber: string;
//   email: string;
//   location: string;
// }

// const ContactInfo: React.FC<ContactInfoProps> = ({ phoneNumber, email, location }) => {
//   return (
//     <div className="flex gap-5 px-px max-md:flex-wrap max-md:max-w-full">
//       <div className="flex gap-2.5">
//         <img loading="lazy" src="phone-icon.png" alt="Phone icon" className="shrink-0 aspect-square w-[68px]" />
//         <div className="flex flex-col my-auto">
//           <h3 className="text-xl font-semibold">Call Us</h3>
//           <p className="text-lg">{phoneNumber}</p>
//         </div>
//       </div>
//       <div className="flex gap-3">
//         <img loading="lazy" src="mail-icon.png" alt="Mail icon" className="shrink-0 aspect-square w-[68px]" />
//         <div className="flex flex-col my-auto">
//           <h3 className="text-xl font-semibold">Mail Us</h3>
//           <p className="text-lg">{email}</p>
//         </div>
//       </div>
//       <div className="flex gap-2.5">
//         <img loading="lazy" src="location-icon.png" alt="Location icon" className="shrink-0 aspect-square w-[68px]" />
//         <div className="flex flex-col my-auto">
//           <h3 className="text-xl font-semibold">Location</h3>
//           <p className="text-lg">{location}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface FooterProps {
//   logoSrc: string;
//   socialIcons: string[];
// }

// const Footer: React.FC<FooterProps> = ({ logoSrc, socialIcons }) => {
//   return (
//     <footer className="flex flex-col items-center p-20 mt-40 w-full bg-neutral-700 max-md:px-5 max-md:mt-10 max-md:max-w-full">
//       <div className="flex gap-5 justify-between pr-4 mt-4 max-w-full text-white w-[1220px] max-md:flex-wrap">
//         <div className="flex gap-3 my-auto text-3xl font-semibold leading-8 whitespace-nowrap">
//           <img loading="lazy" src={logoSrc} alt="AskExperts logo" className="shrink-0 self-start aspect-[1.08] w-[30px]" />
//           <h2>AskExperts</h2>
//         </div>
//         <ContactInfo phoneNumber="+91 7593950878" email="mail@askexpert.com" location="Calicut, 109-74" />
//       </div>
//       <hr className="shrink-0 mt-14 max-w-full h-px border border-solid bg-neutral-500 border-neutral-500 w-[1220px] max-md:mt-10" />
//       <div className="flex justify-center items-center px-16 mt-12 mb-1 max-w-full w-[1220px] max-md:px-5 max-md:mt-10">
//         <div className="flex gap-5 justify-between max-w-full w-[888px] max-md:flex-wrap">
//           <p className="text-lg leading-7 text-indigo-500">
//             Copyright © <span className="text-teal-400">AskExpert</span> | Designed by{" "}
//             <span className="text-indigo-500">Muhsin</span>
//           </p>
//           <div className="flex gap-4 py-1.5">
//             <p className="grow my-auto text-lg leading-7 text-white">Follow :</p>
//             <div className="flex gap-4">
//               {socialIcons.map((icon, index) => (
//                 <img key={index} loading="lazy" src={icon} alt={`Social icon ${index + 1}`} className="shrink-0 aspect-square w-[17px]" />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// function MyComponent() {
//   const socialIcons = [
//     "facebook-icon.png",
//     "twitter-icon.png",
//     "instagram-icon.png",
//     "linkedin-icon.png",
//   ];

//   return (
//     <div className="flex flex-col bg-white">
//       <UserHeader logoSrc="askexperts-logo.png" />
//       <main>
//         <RegisterForm />
//       </main>
//       <Footer logoSrc="askexperts-logo.png" socialIcons={socialIcons} />
//     </div>
//   );
// }

// export default MyComponent;



// expert wallet 


// import * as React from "react";

// interface UserTransaction {
//     id: number;
//     name: string;
//     transactionId: string;
//     date: string;
//     amount: string;
// }

// const transactions: UserTransaction[] = [
//     {
//         id: 1,
//         name: "Winston Churchill",
//         transactionId: "#12548796",
//         date: "28 Jan, 12.30 AM",
//         amount: "+$750",
//     },
//     {
//         id: 2,
//         name: "Checkout",
//         transactionId: "#12548796",
//         date: "25 Jan, 10.40 PM",
//         amount: "-$2,500",
//     },
//     {
//         id: 3,
//         name: "Adolf Hitler",
//         transactionId: "#12548796",
//         date: "20 Jan, 10.40 PM",
//         amount: "+$750",
//     },
//     {
//         id: 4,
//         name: "Benito Musolini",
//         transactionId: "#12548796",
//         date: "15 Jan, 03.29 PM",
//         amount: "+$750",
//     },
//     {
//         id: 5,
//         name: "Hideki Tojo",
//         transactionId: "#12548796",
//         date: "14 Jan, 10.40 PM",
//         amount: "+$750",
//     },
// ];

// const UserAvatar: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
//     <img loading="lazy" src={src} alt={alt} className="shrink-0 aspect-square w-[30px]" />
// );

// const TransactionRow: React.FC<{ transaction: UserTransaction }> = ({ transaction }) => (
//     <React.Fragment>
//         <div className="flex gap-3.5 mt-8">
//             <UserAvatar src={`{{ext_${transaction.id + 2}}}`} alt={`${transaction.name} avatar`} />
//             <div className="flex-auto my-auto">{transaction.name}</div>
//         </div>
//         <div className="mt-10 max-md:mt-10">{transaction.transactionId}</div>
//         <div className="mt-11 max-md:mt-10">{transaction.date}</div>
//         <div className={`mt-10 max-md:mt-10 ${transaction.amount.startsWith("-") ? "text-red-400" : "text-teal-400"}`}>
//             {transaction.amount}
//         </div>
//         <div className="justify-center px-4 py-3 mt-7 border border-blue-900 border-solid rounded-[50px]">Download</div>
//     </React.Fragment>
// );

// function MyComponent() {
//     return (
//         <div className="bg-neutral-200">
//             <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                 <nav className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full">
//                     <div className="flex flex-col grow justify-center max-md:mt-10">
//                         <div className="flex flex-col pt-6 pb-20 bg-white shadow-sm">
//                             <div className="flex flex-col items-start pr-16 pl-6 max-md:px-5">
//                                 <div className="text-lg font-semibold text-blue-950">AskExpert</div>
//                                 <div className="flex gap-4 mt-11 font-medium max-md:mt-10">
//                                     <img
//                                         loading="lazy"
//                                         src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecb316b8df04291c82ea9e0c1fcd35729f0087a0d2f8dd891f88c86656d6b87f?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                                         alt="User avatar"
//                                         className="shrink-0 aspect-square w-[46px]"
//                                     />
//                                     <div className="flex flex-col my-auto">
//                                         <div className="text-sm text-slate-800">Manuel</div>
//                                         <div className="mt-3 text-xs tracking-normal text-slate-400">Manuel@email.com</div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="justify-center items-start px-9 py-4 mt-11 text-xl font-medium tracking-wide text-black whitespace-nowrap rounded-3xl bg-stone-300 max-md:px-5 max-md:mt-10">
//                                 Appointments
//                             </div>
//                             <div className="justify-center items-start px-9 py-5 mt-3.5 text-xl font-medium tracking-wide text-black whitespace-nowrap rounded-3xl bg-neutral-400 max-md:px-5">
//                                 Wallet
//                             </div>
//                             <div className="items-start px-9 pt-5 pb-3.5 mt-3 text-xl font-medium tracking-wide text-black whitespace-nowrap rounded-3xl bg-stone-300 max-md:px-5">
//                                 Ratings
//                             </div>
//                             <div className="justify-center items-start px-9 py-5 mt-5 text-xl font-medium tracking-wide text-black whitespace-nowrap rounded-3xl bg-stone-300 max-md:px-5">
//                                 Profile
//                             </div>
//                             <div className="justify-center px-9 py-5 mt-3 text-xl font-medium tracking-wide text-black rounded-3xl bg-stone-300 max-md:px-5">
//                                 Schedule Session
//                             </div>
//                             <div className="justify-center items-start px-9 py-5 mt-5 text-xl font-medium tracking-wide text-black whitespace-nowrap rounded-3xl bg-stone-300 max-md:px-5">
//                                 Messages
//                             </div>
//                             <div className="justify-center items-start px-9 py-5 mt-5 mb-48 text-xl font-medium tracking-wide text-black rounded-3xl bg-stone-300 max-md:px-5 max-md:mb-10">
//                                 Log Out
//                             </div>
//                         </div>
//                     </div>
//                 </nav>
//                 <main className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
//                     <div className="flex flex-col px-5 mt-20 max-md:mt-10 max-md:max-w-full">
//                         <h1 className="text-4xl font-semibold tracking-wide text-zinc-600 max-md:max-w-full">Wallet</h1>
//                         <div className="flex flex-col pl-20 mt-14 max-md:pl-5 max-md:mt-10 max-md:max-w-full">
//                             <div className="flex gap-5 ml-5 w-full max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
//                                 <div className="flex flex-1 gap-5 py-6 pr-20 pl-10 bg-white rounded-3xl max-md:px-5">
//                                     <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5357d460156c660193278fe38239994d0ec1e6abe80395745e068f6f967a3b68?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="Wallet icon" className="shrink-0 aspect-[1.03] w-[72px]" />
//                                     <div className="flex flex-col my-auto">
//                                         <div className="text-base text-slate-400">Wallet Balance</div>
//                                         <div className="mt-4 text-2xl font-semibold text-neutral-800">$12,750</div>
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-1 gap-5 px-10 py-6 text-2xl font-semibold whitespace-nowrap bg-white rounded-3xl text-neutral-800 max-md:px-5">
//                                     <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/333f99d5a77684184c54d04988fe7995cb29f17fc5b09c33b7e57c14933d12d0?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="Checkout icon" className="shrink-0 aspect-[1.03] w-[72px]" />
//                                     <div className="flex-auto my-auto">Checkout</div>
//                                 </div>
//                             </div>
//                             <section className="flex gap-5 justify-between items-start px-16 pt-5 pb-9 mt-14 ml-5 max-w-full text-base bg-white rounded-3xl shadow-[4px_4px_18px_rgba(231,228,232,0.8)] text-neutral-800 w-[1239px] max-md:flex-wrap max-md:px-5 max-md:mt-10">
//                                 <div className="flex flex-col">
//                                     <div className="flex gap-5 font-medium text-slate-400">
//                                         <div>SI No</div>
//                                         <div className="flex-auto">User Name</div>
//                                     </div>
//                                     {transactions.map((transaction) => (
//                                         <TransactionRow key={transaction.id} transaction={transaction} />
//                                     ))}
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <div className="font-medium text-slate-400">Transaction ID</div>
//                                     {transactions.map((transaction) => (
//                                         <div key={transaction.id} className="mt-10 max-md:mt-10">
//                                             {transaction.transactionId}
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <div className="font-medium text-slate-400">Date</div>
//                                     {transactions.map((transaction) => (
//                                         <div key={transaction.id} className="mt-11 max-md:mt-10">
//                                             {transaction.date}
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="flex flex-col font-medium text-teal-400 whitespace-nowrap">
//                                     <div className="text-slate-400">Amount</div>
//                                     {transactions.map((transaction) => (
//                                         <div
//                                             key={transaction.id}
//                                             className={`mt-10 max-md:mt-10 ${transaction.amount.startsWith("-") ? "text-red-400" : ""
//                                                 }`}
//                                         >
//                                             {transaction.amount}
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="flex flex-col text-base text-blue-900 whitespace-nowrap">
//                                     <div className="text-base font-medium text-slate-400">Receipt</div>
//                                     {transactions.map((transaction) => (
//                                         <div
//                                             key={transaction.id}
//                                             className="justify-center px-4 py-3 mt-7 border border-blue-900 border-solid rounded-[50px]"
//                                         >
//                                             Download
//                                         </div>
//                                     ))}
//                                 </div>
//                             </section>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// }

// export default MyComponent;









// admin usermanagement 

// import * as React from "react";

// interface UserData {
//     name: string;
//     email: string;
//     isBlocked: boolean;
// }

// const userData: UserData[] = [
//     {
//         name: "Hector Hugo",
//         email: "Corona@gmail.com",
//         isBlocked: false,
//     },
//     {
//         name: "Fernanda",
//         email: "hernandez@gmail.com",
//         isBlocked: false,
//     },
//     {
//         name: "Fransico",
//         email: "Coronado@gmail.com",
//         isBlocked: true,
//     },
//     {
//         name: "Alberto",
//         email: "Morales@gmail.com",
//         isBlocked: false,
//     },
//     {
//         name: "Mauricio",
//         email: "Perez@gmail.com",
//         isBlocked: true,
//     },
//     {
//         name: "Fernando",
//         email: "Bautista@gmail.com",
//         isBlocked: false,
//     },
//     {
//         name: "Juan",
//         email: "Mendez@gmail.com",
//         isBlocked: false,
//     },
// ];

// export default function MyComponent() {
//     return (
//         <div className="bg-neutral-200">
//             <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                 <Sidebar />
//                 <main className="flex flex-col ml-5 w-[85%] max-md:ml-0 max-md:w-full">
//                     <div className="flex flex-col items-center self-stretch px-5 my-auto max-md:mt-10 max-md:max-w-full">
//                         <h1 className="self-start ml-6 text-4xl font-semibold tracking-wide text-zinc-600 max-md:ml-2.5">
//                             User Management
//                         </h1>
//                         <SearchBar />
//                         <div className="flex gap-5 justify-between mt-9 w-full max-w-[1215px] max-md:flex-wrap max-md:max-w-full">
//                             <button className="justify-center px-14 py-4 text-sm font-semibold tracking-normal text-center text-white whitespace-nowrap rounded shadow-sm bg-blue-950 max-md:px-5">
//                                 Search
//                             </button>
//                             <div className="flex gap-1 self-end mt-7 text-xs tracking-normal text-sky-500">
//                                 <div className="grow">
//                                     <span className="text-gray-500">Filter :</span>{" "}
//                                     <span className="text-sky-500">Dates</span>
//                                 </div>
//                                 <img
//                                     loading="lazy"
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b834403ec30943ade687ba10871ed3dd113d3c7469decfa971c2bba0aba43b8?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                                     alt=""
//                                     className="shrink-0 my-auto aspect-[2.33] fill-zinc-400 w-[7px]"
//                                 />
//                             </div>
//                         </div>
//                         <UserTable>
//                             <UserTableHeader />
//                             {userData.map((user, index) => (
//                                 <React.Fragment key={index}>
//                                     <UserTableRow user={user} />
//                                     {index !== userData.length - 1 && <UserTableDivider />}
//                                 </React.Fragment>
//                             ))}
//                         </UserTable>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// }

// function Sidebar() {
//     return (
//         <aside className="flex flex-col w-[15%] max-md:ml-0 max-md:w-full">
//             <div className="flex flex-col grow justify-center whitespace-nowrap">
//                 <div className="flex flex-col pt-6 pb-20 bg-white shadow-sm">
//                     <div className="flex flex-col items-start pr-16 pl-6 max-md:px-5">
//                         <div className="text-lg font-semibold text-blue-950">
//                             AskExpert
//                         </div>
//                         <div className="flex gap-4 mt-11 font-medium max-md:mt-10">
//                             <img
//                                 loading="lazy"
//                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/b408e1671d1f84cd11be6693cccf6d42e99a4ad7eb49ca6f45dbe8b0921b8f3c?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                                 alt=""
//                                 className="shrink-0 aspect-square w-[46px]"
//                             />
//                             <div className="flex flex-col my-auto">
//                                 <div className="text-sm text-slate-800">Admin</div>
//                                 <div className="mt-3 text-xs tracking-normal text-slate-400">
//                                     admin@email.com
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <SidebarLink text="Dashboard" isActive />
//                     <SidebarLink text="Users" />
//                     <SidebarLink text="Experts" />
//                     <SidebarLink text="Logout" />
//                 </div>
//             </div>
//         </aside>
//     );
// }

// interface SidebarLinkProps {
//     text: string;
//     isActive?: boolean;
// }

// function SidebarLink({ text, isActive = false }: SidebarLinkProps) {
//     const bgColor = isActive ? "bg-neutral-400" : "bg-stone-300";
//     return (
//         <div
//             className={`justify-center items-start px-9 py-3 mt-4 text-xl font-medium tracking-wide text-black rounded-3xl ${bgColor} max-md:px-5`}
//         >
//             {text}
//         </div>
//     );
// }

// function SearchBar() {
//     return (
//         <form className="flex gap-3 self-stretch px-9 py-5 mt-9 text-xs tracking-normal bg-white text-slate-400 max-md:flex-wrap max-md:px-5">
//             <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/9a794612a81e1b15d95758641c271adf0ca0a0060177da2c7f2886589c4dd74a?apiKey=62cb0e3201dd4b038734137173080a0d&"
//                 alt=""
//                 className="shrink-0 w-5 aspect-square"
//             />
//             <label htmlFor="search" className="sr-only">
//                 Search User
//             </label>
//             <input
//                 type="text"
//                 id="search"
//                 placeholder="Search User"
//                 className="flex-auto my-auto max-md:max-w-full"
//             />
//         </form>
//     );
// }

// function UserTable({ children }: { children: React.ReactNode }) {
//     return (
//         <div className="flex flex-col">
//             {children}
//         </div>
//     );
// }

// function UserTableHeader() {
//     return (
//         <div className="flex gap-5 justify-between px-20 py-5 mt-6 max-w-full text-sm font-medium tracking-normal whitespace-nowrap bg-white rounded-none text-slate-600 w-[1262px] max-md:flex-wrap max-md:px-5">
//             <div>Name</div>
//             <div>Email</div>
//             <div className="flex gap-5 justify-between">
//                 <div className="text-right">Actions</div>
//                 <div>Edit</div>
//             </div>
//         </div>
//     );
// }

// function UserTableRow({ user }: { user: UserData }) {
//     return (
//         <div className="flex gap-5 items-center px-20 py-5 max-w-full font-medium whitespace-nowrap bg-white w-[1262px] max-md:flex-wrap max-md:px-5">
//             <div className="self-stretch my-auto text-base tracking-normal text-gray-700">
//                 {user.name}
//             </div>
//             <div className="flex-auto self-stretch my-auto text-sm tracking-normal text-gray-500">
//                 {user.email}
//             </div>
//             <div className="flex gap-5 justify-between self-stretch text-xs tracking-wide leading-4 text-center text-white">
//                 <button
//                     className={`justify-center px-6 py-0.5 rounded max-md:px-5 ${user.isBlocked ? "bg-red-500" : "bg-sky-500"
//                         }`}
//                 >
//                     {user.isBlocked ? "Block" : "Unblock"}
//                 </button>
//                 <img
//                     loading="lazy"
//                     src={`{{ext_${userData.indexOf(user) + 3}}}`}
//                     alt="Edit user"
//                     className="shrink-0 my-auto w-4 aspect-square"
//                 />
//             </div>
//         </div>
//     );
// }

// function UserTableDivider() {
//     return <div className="shrink-0 max-w-full h-px bg-gray-100 w-[1262px]" />;
// }





// import * as React from "react";

// interface CardProps {
//   imageSrc: string;
//   title: string;
// }

// const Card: React.FC<CardProps> = ({ imageSrc, title }) => {
//   return (
//     <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
//       <div className="flex overflow-hidden relative flex-col grow justify-center text-4xl text-white whitespace-nowrap rounded-xl min-h-[298px] max-md:mt-10 max-md:max-w-full">
//         <img src={imageSrc} alt="" className="object-cover absolute inset-0 size-full" />
//         <div className="overflow-hidden relative flex-col justify-center items-start px-10 pt-40 pb-20 w-full min-h-[298px] max-md:px-5 max-md:pt-10 max-md:max-w-full">
//           <img src={imageSrc} alt="" className="object-cover absolute inset-0 size-full" />
//           {title}
//         </div>
//       </div>
//     </div>
//   );
// };

// const MyComponent: React.FC = () => {
//   const cardData = [
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Doctors" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Lawyers" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Mechanics" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "IT Professionals" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Career Advisors" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Finance Advisors" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Psychologist" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Veterinarian" },
//     { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/02479a73c99b204f99e0307764d1b1a393f4f59b1c5a87b6b1511dca4a4c8c63?apiKey=62cb0e3201dd4b038734137173080a0d&", title: "Dietitian" },
//   ];

//   return (
//     <div className="flex flex-wrap justify-center content-center items-center px-16 py-20 max-md:px-5">
//       <div className="flex flex-col w-full max-w-[1590px] max-md:max-w-full">
//         <div className="max-md:max-w-full">
//           <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//             {cardData.slice(0, 3).map((card, index) => (
//               <Card key={index} imageSrc={card.imageSrc} title={card.title} />
//             ))}
//           </div>
//         </div>
//         <div className="mt-14 max-md:mt-10 max-md:max-w-full">
//           <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//             {cardData.slice(3, 6).map((card, index) => (
//               <Card key={index} imageSrc={card.imageSrc} title={card.title} />
//             ))}
//           </div>
//         </div>
//         <div className="mt-14 max-md:mt-10 max-md:max-w-full">
//           <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//             {cardData.slice(6).map((card, index) => (
//               <Card key={index} imageSrc={card.imageSrc} title={card.title} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyComponent;







// expert register 

// import * as React from "react";

// interface InputFieldProps {
//   label: string;
//   value: string;
//   className?: string;
// }

// const InputField: React.FC<InputFieldProps> = ({ value, className }) => {
//   return (
//     <div className={`grow justify-center items-start px-7 py-7 bg-white rounded-2xl border border-solid border-slate-200 w-fit max-md:px-5 max-md:max-w-full ${className}`}>
//       {value}
//     </div>
//   );
// };

// interface SelectFieldProps {
//   label: string;
//   value: string;
//   className?: string;
// }

// const SelectField: React.FC<SelectFieldProps> = ({ value, className }) => {
//   return (
//     <div className={`flex flex-auto gap-5 px-8 py-7 bg-white rounded-2xl border border-solid border-slate-200 max-md:flex-wrap max-md:px-5 max-md:max-w-full ${className}`}>
//       <div className="flex-auto">{value}</div>
//       <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3eea0c1bbee78e75f9bbcb44c0ccf04ee9590f22f5acf709380ab0a5b7b7021?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="" className="shrink-0 self-start mt-1.5 border-2 border-solid aspect-[1.79] border-slate-400 stroke-[1.5px] stroke-slate-400 w-[18px]" />
//     </div>
//   );
// };

// const fields = [
//   { label: "Your Full name", value: "Charlene Reed" },
//   { label: "Password", value: "**********" },
//   { label: "Email", value: "charlenereed@gmail.com" },
//   { label: "Confirm Password", value: "**********" },
//   { label: "Full Address", value: "San Jose, California, USA" },
// ];

// export default function MyComponent() {
//   return (
//     <div className="flex flex-col text-base text-neutral-800">
//       <div className="flex gap-5 w-full max-md:flex-wrap max-md:max-w-full">
//         <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/80a9d37d34f9feee0051e8a619944492e8458ffe256cb9efa8d9785d22ea8950?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="Profile" className="shrink-0 self-start max-w-full aspect-[1.02] w-[183px]" />
//         <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
//           <div className="flex gap-5 max-w-full w-[688px] max-md:flex-wrap">
//             <div className="flex-auto capitalize">{fields[0].label}</div>
//             <div>{fields[1].label}</div>
//           </div>
//           <div className="flex gap-5 mt-7 text-base text-slate-400 max-md:flex-wrap max-md:max-w-full">
//             <InputField label={fields[0].label} value={fields[0].value} />
//             <InputField label={fields[1].label} value={fields[1].value} className="py-8 whitespace-nowrap" />
//           </div>
//           <div className="flex gap-5 mt-8 max-w-full w-[753px] max-md:flex-wrap">
//             <div>{fields[2].label}</div>
//             <div className="flex-auto">{fields[3].label}</div>
//           </div>
//           <div className="flex gap-5 mt-7 text-base text-slate-400 max-md:flex-wrap max-md:max-w-full">
//             <InputField label={fields[2].label} value={fields[2].value} />
//             <InputField label={fields[3].label} value={fields[3].value} className="px-7 py-8 whitespace-nowrap" />
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col self-center px-5 mt-9 w-full max-w-[1194px] max-md:max-w-full">
//         <div className="flex gap-5 max-w-full w-[707px] max-md:flex-wrap">
//           <div className="flex-auto capitalize">Field of expertise</div>
//           <div>{fields[4].label}</div>
//         </div>
//         <div className="flex gap-5 mt-6 w-full text-base text-slate-400 max-md:flex-wrap max-md:max-w-full">
//           <SelectField label="Field of expertise" value="Choose a field" />
//           <InputField label={fields[4].label} value={fields[4].value} />
//         </div>
//         <div className="mt-9 max-md:max-w-full">Upload Credentials</div>
//         <div className="flex gap-5 justify-between px-6 py-4 mt-6 max-w-full text-base bg-white rounded-2xl border border-solid border-slate-200 text-slate-400 w-[577px] max-md:flex-wrap max-md:pl-5">
//           <div className="my-auto">Select Files</div>
//           <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/35adf9dab3b3361bf35bd2bea70abebcfa02857652b6576c8423090e6657e098?apiKey=62cb0e3201dd4b038734137173080a0d&" alt="" className="shrink-0 aspect-[1.2] w-[47px]" />
//         </div>
//         <button className="items-center self-center px-16 pt-7 pb-4 mt-16 max-w-full text-2xl font-medium text-center text-white whitespace-nowrap bg-indigo-500 w-[262px] max-md:px-5 max-md:mt-10">
//           Apply
//         </button>
//       </div>
//     </div>
//   );
// }



// import React, { useState } from 'react';

// const MyComponent: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="relative inline-block text-left">
//       <div onClick={toggleDropdown} className="flex items-center cursor-pointer p-2 rounded bg-gray-100">
//         <img
//           src="https://via.placeholder.com/40" // Replace with the actual profile picture URL
//           alt="Profile"
//           className="w-10 h-10 rounded-full mr-3"
//         />
//         <div>
//           <p className="font-bold">Eucharia Odili</p>
//           <p className="text-gray-500 text-sm">Administrator</p>
//         </div>
//       </div>
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
//           <div className="py-1">
//             <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//               <span className="mr-3">👤</span>
//               Edit profile
//               <span className="ml-auto text-gray-500">E</span>
//             </button>
//             <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//               <span className="mr-3">🔧</span>
//               Widget settings
//               <span className="ml-auto text-gray-500">W</span>
//             </button>
//             <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//               <span className="mr-3">🚀</span>
//               Upgrade to professional
//             </button>
//             <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//               <span className="mr-3">🚪</span>
//               Log out
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyComponent;





const MyComponent = () => {
  return (
    <div className="bg-secondary">
      {/* <Navbar /> */}
      <div className="relative ">
        <img
          src='../../../assets/images/copernico-TSYQ5stQVjg-unsplash.jpg'
          alt=""
          className="pt-20 h-56 w-full bg-dark-greens "
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
          <h1 className="text-3xl font-extrabold text-white mt-5">
            <span className="bg-secondary  px-5 py-2 rounded-lg">MY</span>
          </h1>
          <h1 className="text-3xl font-extrabold  text-white mt-3">
            PROFILE
          </h1>
        </div>
      </div>

      <div className="h-full max-[400px]:p-2 w-full flex items-center flex-col justify-center">
        <div className="w-full p-4 md:px-12  md:py-4 lg:py-16 flex max-md:flex-col sm:w-[80%] items-start shadow-xl text-white rounded-3xl">
        
          <div className="flex-grow bg-pale-green w-full sm:w-[80%] p-4 ">
            <form action="" >


              <div className="mt-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
                <div className=" shadow-xl p-3 flex rounded-lg ">
                  <div className=" flex justify-center shadow-xl items-center w-12 h-12 rounded-lg">
                    {/* <IoPersonSharp size={26} color="#3BE48B" /> */}
                  </div>
                  <div className="ml-5">
                    <p className="font-medium text-dark-green">Name</p>
                    <input
                      name="name"
                      // value={values.name}
                      placeholder='{userInfo?.name}'
                      type="text"
                      // onChange={handleChange}
                      className="mt-1 w-full  bg-secondary text-dark-green  outline-none"
                    />
                    {/* {errors.name && touched.name && (
                      <div className="text-red-500">{errors.name}</div>
                    )} */}
                  </div>
                </div>
                <div className=" shadow-xl p-3 flex rounded-lg">
                  <div className="  shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                    {/* <MdOutlineMail size={26} color="#3BE48B" /> */}
                  </div>
                  <div className="ml-5">
                    <p className="font-medium text-dark-green">Email Address</p>
                    <p className="mt-1 w-full text-dark-green bg-secondary  outline-none">
                      {/* {userInfo?.email} */}
                    </p>
                  </div>
                </div>
                <div className=" shadow-xl p-3 flex rounded-lg">
                  <div className=" flex justify-center items-center w-12 h-12 rounded-lg">
                    {/* <FaMobileAlt size={26} color="#3BE48B" /> */}
                  </div>
                  <div className="ml-5">
                    <p className="font-medium text-dark-green">Mobile</p>
                    <input
                      name="mobile"
                      // value={values.mobile}
                      placeholder='{userInfo?.mobile}'
                      // onChange={handleChange}
                      type="text"
                      className="mt-1 w-full text-dark-green bg-secondary  focus:border-black outline-none"
                    />
                    {/* {errors.mobile && touched.mobile && (
                      <div className="text-red-500">{errors.mobile}</div>
                    )} */}
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex justify-end w-1/2">
                  <button className="bg-tertiary rounded-md mt-4 bg-dark-greens  shadow-md w-28 h-10 font-medium">Save</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MyComponent;
