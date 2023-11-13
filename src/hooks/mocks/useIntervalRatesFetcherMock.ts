import { useState } from "react";
import BasicStatus from "../../interfaces/BasicStatus";
import requests from "../../requests";
import axios from "axios";
import IIntervalRatesFetcher, {IntervalRates} from "../../interfaces/IIntervalRatesFetcher";

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
export default function useIntervalRatesFetcherMock(): IIntervalRatesFetcher {
    const [state, setState] = useState<State>(initialState);
    
    function fetch(id: number) {
        setState({
            status: BasicStatus.Success,
            message: "読み込み完了！",
            result: {
                missRates: Array.from({ length: 12 }, () => _generateRandom(0.1, 0.3)),
                averageReactionRates: Array.from({ length: 12 }, () => Math.floor(_generateRandom(200, 500))),
            }
        });
    }

    function _generateRandom(min: number, max: number) {
        return Math.random() * (max - min + 1) + min;
    }

    return {
        ...state,
        fetch
    }
}
