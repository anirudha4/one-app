import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const createDataForOverviewChart = (income, expense) => ({
    innerHeight: 200,
    innerWidth: 200,
    backgroundColor: 'black',
    datasets: [
        {
            label: 'Statistics',
            data: [income, expense],
            backgroundColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            radius: 80,
            cutout: 70
        },
    ],
});

export function OverviewChart({ income, expense }) {
    return <Doughnut data={createDataForOverviewChart(income, expense)} />;
}
