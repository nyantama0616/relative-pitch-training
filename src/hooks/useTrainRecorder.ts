import React, {useEffect, useRef, useState} from "react";
import ITrainRecorder from "../interfaces/ITrainRecorder";
import ITrainingManager from "../interfaces/ITrainingManager";

export default function useTrainRecorder(trainManager: ITrainingManager): ITrainRecorder {
    const [duration, setDuration] = useState(0);
    const timerRef = useRef<NodeJS.Timer | null>(null);

    const interval = 34; //durationを更新する間隔

    useEffect(() => {
        //setIntervalをリセットする
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
        }

        if (trainManager.isAnswerable) { //回答開始
            setDuration(0);
            timerRef.current = setInterval(() => {
                setDuration(prevDuration => {
                    return prevDuration + interval;
                });
            }, interval);
        } else { //回答終了
            timerRef.current = null;
        }
    }, [trainManager.isAnswerable]);

    return {
        record: {
            note0: trainManager.currentQuestion.note0,
            note1: trainManager.currentQuestion.note1,
            missCount: trainManager.missCount,
            duration
        }
    };
}
