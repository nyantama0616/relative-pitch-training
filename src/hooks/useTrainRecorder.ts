import React, {useEffect, useState} from "react";
import ITrainRecorder from "../interfaces/ITrainRecorder";
import ITrainingManager from "../interfaces/ITrainingManager";

export default function useTrainRecorder(trainManager: ITrainingManager): ITrainRecorder {
    const [duration, setDuration] = useState(0);
    const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

    const interval = 100; //durationを更新する間隔

    useEffect(() => {
        //setIntervalをリセットする
        if (timer !== null) {
            clearInterval(timer);
        }

        if (trainManager.isAnswerable) { //回答開始
            setDuration(prevDuration => {
                return 0;
            });
            
            
            const newTimer = setInterval(() => {
                setDuration(prevDuration => {
                    return prevDuration + interval;
                });
            }, interval);

            setTimer(newTimer);
        } else { //回答終了
            setTimer(null);
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
