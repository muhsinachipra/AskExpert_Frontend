// frontend\src\components\admin\dashboard\DashboardStats.tsx

interface StatData {
    title: string;
    value: string;
    icon: JSX.Element;
    description: string;
}

function DashboardStats({ title, icon, value, description }: StatData) {

    const getDescStyle = () => {
        if (description.match(/Active|Completed|Verified/)) return "font-semibold text-green-600";
        else if (description.includes("Blocked")) return "font-semibold text-red-600";
        else return "text-gray-600";
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 relative">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <div className="text-gray-600 text-sm font-medium">{title}</div>
                    <div className="text-blue-800 text-4xl font-extrabold">{value}</div>
                </div>
                <div className="text-blue-800 pt-6">{icon}</div>
            </div>
            <div className={`text-xs ${getDescStyle()}`}>{description}</div>
        </div>
    );
}

export default DashboardStats;