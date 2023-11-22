import { Box, SxProps } from "@mui/system";
import { useMemo } from "react";
import useIntervalRatesFetcher from "../../../hooks/useIntervalRatesFetcher";
import TrainResultGraph from "../TrainResultGraph";
import BasicStatus from "../../../interfaces/BasicStatus";
import useIntervalRatesFetcherMock from "../../../hooks/mocks/useIntervalRatesFetcherMock";
import { useEffect } from "react";
interface ResultSceneProps {
    sx?: SxProps;
}

export default function ResultScene({ sx }: ResultSceneProps) {
    const prevFetcher = useIntervalRatesFetcherMock(); //TODO: useRequestScene作る
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
        <Box component="div" sx={{ backgroundColor: "#ccccff", ...sx }}>
            {props ? <TrainResultGraph {...props} /> : null}
        </Box>
    )
}
