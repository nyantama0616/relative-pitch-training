import React, { useEffect } from "react";
import ITrainingManager from "../../interfaces/ITrainingManager";
import ITrainRecorder from "../../interfaces/ITrainRecorder";
import { notesToInterval } from "../../utilities/Utility";
import "./TrainRecord.css";

interface TrainRecordProps {
    trainRecorder: ITrainRecorder
    trainManager: ITrainingManager
}
export default function TrainRecord({ trainRecorder, trainManager }: TrainRecordProps) {
    const isShowAnswer = trainManager.isRight;
    const interval = notesToInterval(trainRecorder.record.note0, trainRecorder.record.note1);

    useEffect(() => {
        console.log(interval);

    }, [isShowAnswer]);
    
    const intervalStr = interval.signal < 0 ? interval.interval + "↓" : interval.signal === 0 ? interval.interval : interval.interval + "↑";
    
    const answer = isShowAnswer ? {
        note0: trainRecorder.record.note0,
        note1: trainRecorder.record.note1,
        interval: intervalStr
    } : {
        note0: "",
        note1: "",
        interval: "",
    };

    return (
        <div className="train-record">
            <p>note0: {answer.note0}</p>
            <p>note1: {answer.note1}</p>
            <p>interval: {answer.interval}</p>
            <p>missCount: {trainRecorder.record.missCount}</p>
            <p>duration: {trainRecorder.record.duration} ms</p>
        </div>
    )
}
