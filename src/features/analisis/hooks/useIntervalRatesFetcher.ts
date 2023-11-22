import { useState } from "react";
import BasicStatus from "../../others/interfaces/BasicStatus";
import requests from "../../../requests";
import axios from "axios";
import IIntervalRatesFetcher, {IntervalRates} from "../interfaces/IIntervalRatesFetcher";

interface State {
    status: BasicStatus,
    message: string
    result: IntervalRates | null
}

const initialState: State = {
    status: BasicStatus.None,
    message: "",
    result: null
}
export default function useIntervalRatesFetcher(): IIntervalRatesFetcher {
    const [state, setState] = useState<State>(initialState);
    
    function fetch(id: number) {
        setState({
            status: BasicStatus.Doing,
            message: "読み込み中",
            result: null
        });
        axios
            .post(requests.fetchIntervalRates, { id: id })
            .then(res => {
                console.log("success!!");
                setState({
                    status: BasicStatus.Success,
                    message: "読み込み完了！",
                    result: res.data as IntervalRates
                });
            })
            .catch(res => {
                setState({
                    status: BasicStatus.Failed,
                    message: "読み込み失敗。。。",
                    result: null
                });
            });
    }

    return {
        ...state,
        fetch
    }
}
