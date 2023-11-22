import { Box, Grid, Button } from "@mui/material";
import { SxProps } from "@mui/material";

interface StartSceneProps {
    sx?: SxProps;
}

export default function StartScene({sx}: StartSceneProps) {
    return (
        <Box component="div" sx={{backgroundColor: "#ccccff", ...sx}}>
            <Grid container justifyContent="center">
                <Grid item xs={4}>
                    <Button variant="contained">スタート</Button>
                </Grid>
            </Grid>
        </Box>
    )
}
