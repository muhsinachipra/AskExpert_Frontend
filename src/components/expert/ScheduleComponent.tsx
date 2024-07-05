interface ScheduleComponentProps {
    date: string;
    time: string;
    onCancel: () => void;
}

const ScheduleComponent = ({ date, time, onCancel }: ScheduleComponentProps) => {
    return (
        <section className="py-5 px-4 bg-white rounded-3xl w-full mb-4 shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-xl font-semibold text-gray-500">
                        <time>{date}</time>
                    </div>
                    <div className="text-3xl font-medium text-neutral-800 mt-1">
                        <time>{time}</time>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 text-red-400 border border-red-400 rounded-full hover:bg-red-50 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </section>
        // <section className="py-5 px-4 bg-white rounded-3xl w-full mb-4">
        //     <div className="flex justify-between items-center">
        //         <div className="text-3xl font-medium text-neutral-800">
        //             <time>{date} {time}</time>
        //         </div>
        //         <div className="flex justify-end">
        //             <button
        //                 onClick={onCancel}
        //                 className="px-6 py-2 text-red-400 border border-red-400 rounded-full"
        //             >
        //                 Cancel
        //             </button>
        //         </div>
        //     </div>
        // </section>
    );
};

export default ScheduleComponent;


// // frontend\src\components\expert\ScheduleComponent.tsx

// interface ScheduleComponentProps {
//     time: string;
//     onCancel: () => void;
//     // onEdit: () => void;
// }


// const ScheduleComponent = ({ time, onCancel }: ScheduleComponentProps) => {

//     return (
//         <section className="py-5 pr-14 pl-4 bg-white rounded-3xl max-w-[754px] max-md:pr-5">
//             <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                 <div className="flex flex-col w-[43%] max-md:w-full">
//                     <div className="flex grow gap-5 text-3xl font-medium whitespace-nowrap text-neutral-800 max-md:mt-10">
//                         <time className="flex-auto my-auto">{time}</time>
//                     </div>
//                 </div>
//                 <div className="flex flex-col w-[57%] max-md:w-full max-md:mt-10">
//                     <div className="flex gap-5 justify-between my-auto text-base font-medium text-center whitespace-nowrap">
//                         <button
//                             onClick={onCancel}
//                             className="justify-center px-14 py-4 text-red-400 border border-red-400 rounded-full max-md:px-5"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default ScheduleComponent;