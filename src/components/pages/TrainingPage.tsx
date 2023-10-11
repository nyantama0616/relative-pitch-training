import React, { useEffect } from "react";
import { useMidiIO } from "../../hooks/useMidiIO";
import useTrainingManager from "../../hooks/useTrainingManager";
import useTrainRecorder from "../../hooks/useTrainRecorder";
import TrainMain from "../organisms/TrainMain";
import TrainConfig from "../organisms/TrainConfig";
import TrainRecord from "../organisms/TrainRecord";
import "./TrainingPage.css";

export default function TrainingPage() {
    const midiIO = useMidiIO();
    const trainManager = useTrainingManager(midiIO);
    const trainRecorder = useTrainRecorder(trainManager);

    function _start() {
        trainManager.start();
    }

    return (
        <div className="train-page">
            <h1>Training Page</h1>
            <button onClick={_start}>start</button>
            <TrainConfig midiIO={midiIO} />
            <TrainMain trainManager={trainManager} />
            <TrainRecord trainManager={trainManager} trainRecorder={trainRecorder} />
        </div>
    )
}
