// frontend\src\components\admin\dashboard\DoughnutChart.tsx

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
    data: { _id: string; count: number }[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map(item => item._id),
        datasets: [
            {
                data: data.map(item => item.count),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#36A2EB',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#36A2EB',
                ],
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div className="flex-col bg-white p-3 rounded-lg shadow-md flex justify-center items-center h-[400px]">
            <div className="text-gray-600 text-lg font-medium mb-4">Experts By Category</div>
            <div className='w-full h-full'>
                <Doughnut data={chartData} options={options} />
            </div>
        </div>
    )

};

export default DoughnutChart;
