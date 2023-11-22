import { useMemo } from "react";
import { Box, Grid } from "@mui/material";
import { SxProps } from "@mui/system";
import StartScene from "./train-scenes/StartScene";
import MainScene from "./train-scenes/MainScene";
import ResultScene from "./train-scenes/ResultScene";
import { useRef, useEffect } from "react";
import { useDependency } from "../../../Dependency";

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
    const { keyPressManager } = useDependency(); //TODO: ここでkeyPressManagerに色々変更を加える設計はよくないと思う

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
                    {sceneComponent}
                </Grid>
            </Grid>
        </Box>
    )
}
