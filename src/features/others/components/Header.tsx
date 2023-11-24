import { SxProps } from "@mui/material";
import { Box, Grid } from "@mui/material";
import HeaderProfile from "../../user/components/profile/HeaderProfile";
interface HeaderProps {
    sx?: SxProps;
}
export default function Header({sx}: HeaderProps) {
    return (
        //TODO: 要素を右寄せる方法とかがいまいち...
        <Box component="div" className="header" sx={{ backgroundColor: "black", ...sx, pt: 1, pb: 1 }}>
            <Grid container sx={{height: "100%"}} justifyContent="right">
                <Grid item xs={3} sx={{ height: "100%" }}>
                    <HeaderProfile sx={{height: "100%"}} />
                </Grid>
            </Grid>
        </Box>
    )
}
