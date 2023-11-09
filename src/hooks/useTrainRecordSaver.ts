import { useState } from "react";
import ITrainRecordSaver, { BasicStatus } from "../interfaces/ITrainRecordSaver";
import { IQuestionRecord } from "../interfaces/ITrainRecorder";
import requests from "../requests";
import axios from "axios";

export default function useTrainRecordSaver(): ITrainRecordSaver {
    const [status, setStatus] = useState<BasicStatus>(BasicStatus.None);
    
    function save(record: IQuestionRecord[]) {
        setStatus(BasicStatus.Doing);
        axios
            .post(requests.postRecords, { json: record })
            .then(res => {
                console.log("success!!");
                setStatus(BasicStatus.Success);
            })
            .catch(res => {
                setStatus(BasicStatus.Failed);
            });
    }

    return {
        status,
        save
    }
}
