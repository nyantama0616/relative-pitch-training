import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import "./CompareWithYouYesterday.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



interface CompareWithYouYesterdayProps {
    duration: number,
    meanYesterday: number
}
export default function CompareWithYouYesterday({ duration, meanYesterday }: CompareWithYouYesterdayProps) {
    const labels = ["@", "Duration", "@"];

    const options = {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Compare With You Yesterday',
            },
        },
        scales: {
            // yAxis: {
            //     ticks: {
            //         min: 0,
            //         max: meanYesterday,
            //         stepSize: 100
            //     }
            // }
            y: {
                display: true,
                // suggestedMin: 0,
                // suggestedMax: meanYesterday,
                min: 0,
                max: meanYesterday,
                beginAtZero: true,
            }
        }
    };

    const backgroundColor = duration < meanYesterday ? "rgb(163, 249, 170)" : 'rgb(249, 67, 67)';
    const data = {
        labels,
        datasets: [
            {
                label: "",
                // data: [0, 200, 0],
                data: [0, duration, 0],
                // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                backgroundColor: backgroundColor,
            },
        ],
    };

    return (
        <div className="compare-with-you-yesterday">
            <div className="graph">
                <Bar options={options} data={data} width={200} height={500} />
            </div>
        </div>
    )
}
