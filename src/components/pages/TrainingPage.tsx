import React, { useEffect } from "react";
import { useMidiIO } from "../../hooks/useMidiIO";
import useTrainingManager from "../../hooks/useTrainingManager";
import TrainConfig from "../organisms/TrainConfig";
import "./TrainingPage.css";

export default function TrainingPage() {
    const midiIO = useMidiIO();
    const trainManager = useTrainingManager(midiIO);

    function _start() {
        trainManager.start();
    }

    return (
        <div className="train-page">
            <h1>Training Page</h1>
            <button onClick={_start}>start</button>
            <TrainConfig midiIO={midiIO}/>
        </div>
    )
}
