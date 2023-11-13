import { Box, Grid } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import SizingProps from "../../../interfaces/SizingProps";
import { useTrain } from "../../../contexts/TrainContext";
import CompareWithYouYesterday2 from "../CompareWithYouYesterday2";
import Counter from "../Counter";
import { log } from "tone/build/esm/core/util/Debug";

interface MainSceneProps {
    sizing?: SizingProps;
}

export default function MainScene({ sizing }: MainSceneProps) {
    const [count, setCount] = useState(3);
    const train = useTrain();
    const intervalRef = useRef<NodeJS.Timer | null>(null);
    
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCount(prev => prev - 1);
        }, 1000);

        return () => { intervalRef.current && clearInterval(intervalRef.current) };
    }, []);

    useEffect(() => {
        if (count <= 0) {
            train.trainManager?.start();
            intervalRef.current && clearInterval(intervalRef.current);
            log("start");
        }
    }, [count])

    return (
        <Box component="div" sx={{ backgroundColor: "#ccccff", ...sizing }}>
            <Grid container justifyContent="center">
                <Grid item xs={12}>
                    <Counter
                        count={count}
                        sx={{ height: "100px", mt: "100px" }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CompareWithYouYesterday2
                        duration={train.trainRecorder!.record.duration}
                        meanYesterday={500}
                        sx={{ height: "500px", mt: "100px" }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
