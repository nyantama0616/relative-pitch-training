import {useEffect, useRef, useState} from "react";
import ITrainRecorder, {IQuestionRecord} from "../interfaces/ITrainRecorder";
import ITrainingManager from "../interfaces/ITrainingManager";
import axios from "axios";
import requests from "../requests";

export default function useTrainRecorder(trainManager: ITrainingManager): ITrainRecorder {
    const [duration, setDuration] = useState(0);
    const timerRef = useRef<NodeJS.Timer | null>(null);
    const recordsRef = useRef<IQuestionRecord[]>([]);

    const interval = 34; //durationを更新する間隔

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
                return prevDuration + interval;
            });
        }, interval);
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
        console.log(recordsRef.current);
        axios
            .post(requests.postRecords, { json: recordsRef.current })
            .then(res => {
                console.log(res.data);
            });
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
