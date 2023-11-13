import Chart from "react-apexcharts";
import {Box} from "@mui/material";
import { SxProps } from "@mui/system";

interface CompareWithYouYesterdayProps {
    duration: number,
    meanYesterday: number,
    sx?: SxProps
}
export default function CompareWithYouYesterday2({ duration, meanYesterday, sx }: CompareWithYouYesterdayProps) {
    const color = duration < meanYesterday ? "rgb(4, 190, 4)" : 'rgb(249, 67, 67)';
    const series = [
        {
            name: "Temperature in Fahrenheit", //will be displayed on the y-axis
            data: [0, duration, 0]
        }
    ];
    const options = {
        chart: {
            id: "simple-bar",

        },
        yaxis: {
            min: 0,
            max: meanYesterday
        },
        xaxis: {
            categories: ["", "duration", ""]
        },
        fill: {
            colors: [color]
        },
    };

    return (
        <Box component="div" sx={{...sx}}>
            <Chart options={options} series={series} type="bar" height={350} />
        </Box>
    )
}
