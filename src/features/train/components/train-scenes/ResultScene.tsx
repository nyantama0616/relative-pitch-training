import { Box, SxProps } from "@mui/system";
import { useMemo } from "react";
import useIntervalRatesFetcher from "../../../analisis/hooks/useIntervalRatesFetcher";
import TrainResultGraph from "../../../analisis/components/TrainResultGraph";
import BasicStatus from "../../../others/interfaces/BasicStatus";
import useIntervalRatesFetcherMock from "../../../analisis/hooks/useIntervalRatesFetcherMock";
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
