import BasicStatus from "./BasicStatus";

export default interface IIntervalRatesFetcher {
    status: BasicStatus;
    message: string;
    result: IntervalRates | null;
    fetch: (id: number) => void;
}

export interface IntervalRates {
    missRates: number[];
    averageReactionRates: number[];
}
