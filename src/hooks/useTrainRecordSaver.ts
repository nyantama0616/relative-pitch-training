import { useState } from "react";
import ITrainRecordSaver from "../interfaces/ITrainRecordSaver";
import BasicStatus from "../interfaces/BasicStatus";
import { IQuestionRecord } from "../interfaces/ITrainRecorder";
import requests from "../requests";
import axios from "axios";

interface State {
    status: BasicStatus,
    message: string
}

const initialState: State = {
    status: BasicStatus.None,
    message: ""
}
export default function useTrainRecordSaver(): ITrainRecordSaver {
    const [state, setState] = useState<State>(initialState);
    
    function save(record: IQuestionRecord[]) {
        setState({
            status: BasicStatus.Doing,
            message: "セーブ中です"
        });
        axios
            .post(requests.postRecords, { json: record })
            .then(res => {
                console.log("success!!");
                setState({
                    status: BasicStatus.Success,
                    message: "セーブ完了！"
                });
            })
            .catch(res => {
                setState({
                    status: BasicStatus.Failed,
                    message: "セーブに失敗しました。。。"
                });
            });
    }

    return {
        ...state,
        save,
    }
}
