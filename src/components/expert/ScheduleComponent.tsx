// frontend\src\components\expert\ScheduleComponent.tsx

interface ScheduleComponentProps {
    time: string;
    onCancel: () => void;
    onEdit: () => void;
}


const ScheduleComponent = ({ time, onCancel, onEdit }: ScheduleComponentProps) => {
  
    return (
        <section className="py-5 pr-14 pl-4 bg-white rounded-3xl max-w-[754px] max-md:pr-5">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[43%] max-md:ml-0 max-md:w-full">
                    <div className="flex grow gap-5 text-3xl font-medium whitespace-nowrap text-neutral-800 max-md:mt-10">
                        <time className="flex-auto my-auto">{time}</time>
                    </div>
                </div>
                <div className="flex flex-col ml-5 w-[57%] max-md:ml-0 max-md:w-full">
                    <div className="flex gap-5 justify-between self-stretch my-auto text-base font-medium text-center whitespace-nowrap max-md:mt-10">
                        <button
                            onClick={onCancel}
                            className={`justify-center px-14 py-4 text-red-400 border border-red-400 border-solid rounded-[50px] max-md:px-5`}
                        >
                            {"Cancel"}
                        </button>
                        <button
                            onClick={onEdit}
                            className={`justify-center px-14 py-4 text-green-400 border border-green-400 border-solid rounded-[50px] max-md:px-5`}
                        >
                            {"Edit"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScheduleComponent;