// frontend\src\components\admin\dashboard\BarChart.tsx

import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarChartProps {
    data: {
        yearlyData: { _id: { year: number }; count: number }[];
        monthlyData: { _id: { year: number; month: number }; count: number }[];
        weeklyData: { _id: { year: number; week: number }; count: number }[];
    };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const [filter, setFilter] = useState<'yearly' | 'monthly' | 'weekly'>('yearly');

    const yearlyLabels = data.yearlyData.map(item => item._id.year.toString());
    const yearlyCounts = data.yearlyData.map(item => item.count);

    const monthlyLabels = data.monthlyData.map(item => `${item._id.year}-${item._id.month}`);
    const monthlyCounts = data.monthlyData.map(item => item.count);

    const weeklyLabels = data.weeklyData.map(item => `Week ${item._id.week} of ${item._id.year}`);
    const weeklyCounts = data.weeklyData.map(item => item.count);

    const getFilteredData = () => {
        switch (filter) {
            case 'yearly':
                return {
                    labels: yearlyLabels,
                    datasets: [
                        {
                            label: 'Yearly Count',
                            data: yearlyCounts,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            barThickness: 15,
                        }
                    ]
                };
            case 'monthly':
                return {
                    labels: monthlyLabels,
                    datasets: [
                        {
                            label: 'Monthly Count',
                            data: monthlyCounts,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                            barThickness: 15,
                        }
                    ]
                };
            case 'weekly':
                return {
                    labels: weeklyLabels,
                    datasets: [
                        {
                            label: 'Weekly Count',
                            data: weeklyCounts,
                            backgroundColor: 'rgba(255, 159, 64, 0.6)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            barThickness: 15,
                        }
                    ]
                };
            default:
                return {
                    labels: [],
                    datasets: []
                };
        }
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Count'
                }
            }
        },
        plugins: {
            legend: {
                display: false // This will hide the legend
            }
        }
    };

    return (
        <div className="flex-col bg-white p-3 rounded-lg shadow-md flex justify-center items-center h-[400px]">
            <div className="text-gray-600 text-lg font-medium mb-3">User Count</div>

            <div className="flex space-x-2 mb-3">
                <button
                    onClick={() => setFilter('yearly')}
                    className={`px-3 py-1 text-sm rounded-md ${filter === 'yearly'
                            ? 'bg-blue-100 text-blue-600 font-medium'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Yearly
                </button>
                <button
                    onClick={() => setFilter('monthly')}
                    className={`px-3 py-1 text-sm rounded-md ${filter === 'monthly'
                            ? 'bg-blue-100 text-blue-600 font-medium'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Monthly
                </button>
                <button
                    onClick={() => setFilter('weekly')}
                    className={`px-3 py-1 text-sm rounded-md ${filter === 'weekly'
                            ? 'bg-blue-100 text-blue-600 font-medium'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Weekly
                </button>
            </div>

            <div className='w-full h-full'>
                <Bar data={getFilteredData()} options={options} />
            </div>
        </div>
    );
};

export default BarChart;
