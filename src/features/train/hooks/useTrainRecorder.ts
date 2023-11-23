import {useEffect, useRef, useState} from "react";
import ITrainRecorder, {IQuestionRecord} from "../interfaces/ITrainRecorder";
import ITrainingManager from "../interfaces/ITrainingManager";
import ITrainRecordSaver from "../interfaces/ITrainRecordSaver";

const INTERVAL = 34; //durationを更新する間隔

interface Props {
    trainManager: ITrainingManager
    trainRecordSaver: ITrainRecordSaver
}
export default function useTrainRecorder({trainManager, trainRecordSaver}: Props): ITrainRecorder {
    const [duration, setDuration] = useState(0);
    const timerRef = useRef<NodeJS.Timer | null>(null);
    const recordsRef = useRef<IQuestionRecord[]>([]);


    useEffect(() => {
        if (trainManager.isAnswerable) { //回答開始
            _startSet();
        } else { //回答終了
            _endSet();
        }
    }, [trainManager.isAnswerable]);

    function _startSet() {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
        }

        setDuration(0);
        timerRef.current = setInterval(() => {
            setDuration(prevDuration => {
                return prevDuration + INTERVAL;
            });
        }, INTERVAL);
    }

    function _endSet() {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
        }
        
        timerRef.current = null;
        _addRecord();
    }

    function _addRecord() {
        const record = {
            note0: trainManager.currentQuestion.note0,
            note1: trainManager.currentQuestion.note1,
            missCount: trainManager.missCount,
            duration
        };

        recordsRef.current.push(record);
    }

    function save() {
        trainRecordSaver.save(recordsRef.current);
    }

    return {
        record: {
            note0: trainManager.currentQuestion.note0,
            note1: trainManager.currentQuestion.note1,
            missCount: trainManager.missCount,
            duration
        },
        save
    };
}
