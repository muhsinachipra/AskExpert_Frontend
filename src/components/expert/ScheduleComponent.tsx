// frontend\src\components\expert\ScheduleComponent.tsx

interface ScheduleComponentProps {
    date: string;
    startTime: string;
    endTime: string;
    price: number;
    onCancel: () => void;
}

const ScheduleComponent = ({ date, startTime, endTime, price, onCancel }: ScheduleComponentProps) => {
    return (
        <section className="py-5 px-6 bg-white rounded-3xl w-full mb-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center">
                <div className="mt-2">
                    <div className="text-sm font-medium text-gray-400">Date</div>
                    <div className="text-sm md:text-3xl font-semibold text-gray-800">
                        <time>{date}</time>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="mt-2">
                        <div className="text-sm font-medium text-gray-400">Start</div>
                        <div className="text-sm md:text-3xl font-semibold text-gray-800">
                            <time>{startTime}</time>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="mt-2">
                        <div className="text-sm font-medium text-gray-400">End</div>
                        <div className="text-sm md:text-3xl font-semibold text-gray-800">
                            <time>{endTime}</time>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="mt-2">
                        <div className="text-sm font-medium text-gray-400">Price</div>
                        <div className="text-sm md:text-3xl font-semibold text-gray-800">
                            <time>{price}</time>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-red-500 border border-red-500 rounded-full hover:bg-red-100 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ScheduleComponent;
