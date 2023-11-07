import React, { useEffect, useRef } from "react";
import { useMidiIO } from "../../hooks/useMidiIO";
import useTrainingManager from "../../hooks/useTrainingManager";
import useTrainRecorder from "../../hooks/useTrainRecorder";
import TrainMain from "../organisms/TrainMain";
import TrainConfig from "../organisms/TrainConfig";
import TrainRecord from "../organisms/TrainRecord";
import "./TrainingPage.css";
import useKeyPressManager from "../../hooks/useKeyPressManager";
import { useMidiIOMock } from "../../hooks/mocks/useMidiIOMock";

export default function TrainingPage() {
    const keyPressManager = useKeyPressManager();
    const midiIO = useMidiIOMock(keyPressManager);
    // const midiIO = useMidiIO();
    const trainManager = useTrainingManager(midiIO);
    const trainRecorder = useTrainRecorder(trainManager);

    const trainingPageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        trainingPageRef.current?.focus();
    }, []);

    function _start() {
        trainManager.start();
    }

    function _stop() {
        trainManager.stop();
    }

    function _save() {
        trainRecorder.save();
    }

    return (
        <div className="train-page" tabIndex={0} ref={trainingPageRef} onKeyDown={e => keyPressManager.handleKeyDown(e)} onKeyUp={e => keyPressManager.handleKeyUp(e)}>
            <h1>Training Page</h1>
            <button onClick={_start}>start</button>
            <button onClick={_stop}>stop</button>
            <button onClick={_save}>save</button>
            <TrainConfig midiIO={midiIO} />
            <TrainMain trainManager={trainManager} />
            <TrainRecord trainManager={trainManager} trainRecorder={trainRecorder} />
        </div>
    );
}
