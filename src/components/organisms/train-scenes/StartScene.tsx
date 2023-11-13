import { Box, Grid, Button } from "@mui/material";
import SizingProps from "../../../interfaces/SizingProps";

interface StartSceneProps {
    sizing?: SizingProps;
}

export default function StartScene({sizing}: StartSceneProps) {
    return (
        <Box component="div" sx={{backgroundColor: "#ccccff", ...sizing}}>
            <Grid container justifyContent="center">
                <Grid item xs={4}>
                    <Button variant="contained">スタート</Button>
                </Grid>
            </Grid>
        </Box>
    )
}
