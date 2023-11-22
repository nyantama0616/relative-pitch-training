import { useMemo } from "react";
import { Box, Grid } from "@mui/material";
import { SxProps } from "@mui/system";
import StartScene from "../organisms/train-scenes/StartScene";
import MainScene from "../organisms/train-scenes/MainScene";
import ResultScene from "../organisms/train-scenes/ResultScene";
import { TrainProvider } from "../../contexts/TrainContext";
import { KeyPressProvider } from "../../contexts/KeyPressContext"; //TODO: 消す
import { useRef, useEffect } from "react";
import { useDependency } from "../../contexts/Dependency";

export enum Scene {
    Start,
    Main,
    Result
}
interface StartSceneProps {
    scene: Scene;
    sx?: SxProps;
}

export default function TrainPage({ scene, sx }: StartSceneProps) {
    const trainPageRef = useRef<HTMLDivElement>(null);
    const { keyPressManager } = useDependency();

    useEffect(() => {
        trainPageRef.current?.focus();
    }, []);

    const sceneComponent = useMemo(() => {
        switch (scene) {
            case Scene.Start:
                return <StartScene sx={{ height: "800px" }} />
            case Scene.Main:
                return <MainScene sx={{ height: "800px" }} />
            case Scene.Result:
                return <ResultScene sx={{ height: "800px" }} />
        }
    }, [scene]);

    return (
        <Box
            component="div"
            sx={{ backgroundColor: "#eeeeff", borderRadius: "10px", ...sx }}
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
                            {sceneComponent}
                        </TrainProvider>
                    </KeyPressProvider>
                </Grid>
            </Grid>
        </Box>
    )
}
