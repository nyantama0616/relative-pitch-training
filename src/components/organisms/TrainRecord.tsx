import React from "react";
import ITrainRecorder from "../../interfaces/ITrainRecorder";
import "./TrainRecord.css";

interface TrainRecordProps {
    trainRecorder: ITrainRecorder
}
export default function TrainRecord({ trainRecorder }: TrainRecordProps) {
    return (
        <div className="train-record">
            <p>note0: {trainRecorder.record.note0}</p>
            <p>note1: {trainRecorder.record.note1}</p>
            <p>missCount: {trainRecorder.record.missCount}</p>
            <p>duration: {trainRecorder.record.duration} ms</p>
        </div>
    )
}
