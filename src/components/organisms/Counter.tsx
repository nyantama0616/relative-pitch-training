import { Box } from "@mui/material";
import { SxProps } from "@mui/material";

interface CounterProps {
    count: number
    sx?: SxProps;
}
export default function Counter({ count, sx }: CounterProps) {
    return (
        <Box component="div" sx={{ ...sx }}>
            <h1>{count}</h1>
        </Box>
    )
}
