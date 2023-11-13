import { Box, Grid } from "@mui/material";
import SizingProps from "../../interfaces/SizingProps";
import StartScene from "../organisms/train-scenes/StartScene";
import MainScene from "../organisms/train-scenes/MainScene";
import ResultScene from "../organisms/train-scenes/ResultScene";
import { TrainProvider } from "../../contexts/TrainContext";
import useKeyPressManager from "../../hooks/useKeyPressManager";
import { KeyPressProvider } from "../../contexts/KeyPressContext";
import { useRef, useEffect } from "react";

interface StartSceneProps {
    sizing?: SizingProps;
}

export default function TrainPage({ sizing }: StartSceneProps) {
    const trainPageRef = useRef<HTMLDivElement>(null);
    const keyPressManager = useKeyPressManager();

    useEffect(() => {
        trainPageRef.current?.focus();
    }, []);

    return (
        <Box
            component="div"
            sx={{ backgroundColor: "#eeeeff", borderRadius: "10px", ...sizing }}
            tabIndex={0}
            ref={trainPageRef}
            onKeyDown={e => keyPressManager.handleKeyDown(e)}
            onKeyUp={e => keyPressManager.handleKeyUp(e)}
        >
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <h1>Train Page  </h1>
                </Grid>
                <Grid item xs={11}>
                    <KeyPressProvider keyPressManager={keyPressManager}>
                        <TrainProvider>
                            {/* <StartScene sizing={{ height: "800px" }} /> */}
                            <MainScene sizing={{ height: "800px" }} />
                            {/* <ResultScene sizing={{ height: "800px" }} /> */}
                        </TrainProvider>
                    </KeyPressProvider>
                </Grid>
            </Grid>
        </Box>
    )
}
