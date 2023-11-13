import { Box } from "@mui/system";
import { useMemo } from "react";
import useIntervalRatesFetcher from "../../../hooks/useIntervalRatesFetcher";
import SizingProps from "../../../interfaces/SizingProps";
import TrainResultGraph from "../TrainResultGraph";
import BasicStatus from "../../../interfaces/BasicStatus";
import useIntervalRatesFetcherMock from "../../../hooks/mocks/useIntervalRatesFetcherMock";
import { useEffect } from "react";
interface ResultSceneProps {
    sizing?: SizingProps;
}

export default function ResultScene({ sizing }: ResultSceneProps) {
    const prevFetcher = useIntervalRatesFetcherMock();
    const currFetcher = useIntervalRatesFetcherMock();

    const props = useMemo(() => {
        if (prevFetcher.status === BasicStatus.Success && currFetcher.status === BasicStatus.Success) {
            return {
                prevMissRates: prevFetcher.result!.missRates,
                prevAverageReactionRates: prevFetcher.result!.averageReactionRates,
                missRates: currFetcher.result!.missRates,
                averageReactionRates: currFetcher.result!.averageReactionRates,
            }
        } else {
            return null;
        }
    }, [prevFetcher.status, currFetcher.status])

    useEffect(() => {
        prevFetcher.fetch(0);
        currFetcher.fetch(0);
    }, []);

    return (
        <Box component="div" sx={{ backgroundColor: "#ccccff", ...sizing }}>
            {props ? <TrainResultGraph {...props} /> : null}
        </Box>
    )
}
