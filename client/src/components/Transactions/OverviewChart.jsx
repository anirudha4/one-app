import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartOptions = {
    plugins: {
        legend: {
            display: false
        }
    }
}

export const createDataForOverviewChart = (income, expense, investment) => ({
    labels: ['Income', 'Expense', 'Investment'],
    datasets: [
        {
            label: 'Statistics',
            data: [income, expense, investment],
            backgroundColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 199, 132, 1)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 199, 132, 1)',
            ],
            radius: 90,
            cutout: 90,
            borderWidth: 1
        },
    ],
});

export function OverviewChart({ income, expense, investment }) {
    return (
        <Doughnut
            options={DoughnutChartOptions}
            data={createDataForOverviewChart(income, expense, investment)}
        />
    );
}
