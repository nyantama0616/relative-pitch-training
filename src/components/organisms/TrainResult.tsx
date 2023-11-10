import Chart from "react-apexcharts";
import "./TrainResult.css";

const missRateText = "誤答率(%)";
const averageReactionRateText = "平均反応時間(ms)";
const intervalText = "音程";
const graphTitle = "各音程の誤答率と平均反応時間のグラフ";
const intervals = ["CD↑", "CE↑", "CF↑", "CG↑", "CA↑", "CB↑", "CB↓", "CA↓", "CG↓", "CF↓", "CE↓", "CD↓"]; //propsはこれに対応している必要がある

const labelSize = "20px";


interface TrainResultProps {
    missRates: number[],
    averageReactionRates: number[]
}

export default function TrainResult({ missRates, averageReactionRates }: TrainResultProps) {
    const missRates100 = missRates.map(missRate => missRate * 100); //誤答率をパーセントにする

    const series = [
        {
            name: missRateText,
            data: missRates100
        },
        {
            name: averageReactionRateText,
            data: averageReactionRates
        },
    ];

    const options: ApexCharts.ApexOptions = { //型大事！プロパティがミスってるとコンパイラがエラー吐いてくれる！
        title: {
            text: graphTitle,
            align: "center",
            style: {
                fontSize: "26px",
            }
        },
        colors: ["#aaaaff", "#88ff88"],

        xaxis: {
            categories: intervals,
            title: {
                text: intervalText,
                style: {
                    fontSize: labelSize,
                }
            },
        },
        yaxis: [
            {
                title: {
                    text: missRateText,
                    style: {
                        fontSize: labelSize,
                    }
                },
                max: Math.max(...missRates100),
            },
            {
                opposite: true,
                title: {
                    text: averageReactionRateText,
                    style: {
                        fontSize: labelSize,
                    }
                },
                max: Math.max(...averageReactionRates),

                decimalsInFloat: 0
            },
        ]
    };

    return (
        <div className="train-result">
            <Chart
                type="bar"
                width="100%"
                height="100%"
                series={series}
                options={options}
            />
        </div>
    )
}
