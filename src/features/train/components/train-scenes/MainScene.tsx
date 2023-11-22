import { Box, Grid, Button } from "@mui/material";
import { SxProps } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import CompareWithYouYesterday2 from "../CompareWithYouYesterday2";
import Counter from "../Counter";
import { log } from "tone/build/esm/core/util/Debug";
import { useDependency } from "../../../../Dependency";
interface MainSceneProps {
    sx?: SxProps;
}

export default function MainScene({ sx }: MainSceneProps) {
    const [count, setCount] = useState(3);
    const { trainManager, trainRecorder } = useDependency();

    const intervalRef = useRef<NodeJS.Timer | null>(null);
    
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCount(prev => prev - 1);
        }, 1000);

        return () => { intervalRef.current && clearInterval(intervalRef.current) };
    }, []);

    useEffect(() => {
        if (count <= 0) {
            trainManager.start();
            intervalRef.current && clearInterval(intervalRef.current);
            log("start");
        }
    }, [count])

    return (
        <Box component="div" sx={{ backgroundColor: "#ccccff", ...sx }}>
            <Grid container justifyContent="center">
                <Grid item xs={12}>
                    <Counter
                        count={count}
                        sx={{ height: "100px", mt: "100px" }}
                    />
                    <Button onClick={trainRecorder.save} variant="contained">保存</Button>
                </Grid>
                <Grid item xs={4}>
                    <CompareWithYouYesterday2
                        duration={trainRecorder.record.duration}
                        meanYesterday={500}
                        sx={{ height: "500px", mt: "100px" }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
