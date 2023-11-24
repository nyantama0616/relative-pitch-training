import { Box, Grid } from "@mui/material";
import { SxProps } from "@mui/system";
import { useDependency } from "../../../../Dependency";
import ProfileImage from "./ProfileImage";

interface HeaderProfileProps {
    sx?: SxProps;
}
export default function HeaderProfile({ sx }: HeaderProfileProps) {
    const { authManager } = useDependency();
    if (!authManager.isAuthorized()) return null;
    const user = authManager.currentUser!;
    const textColor = "white";
    return (
        //TODO: 画像のアスペクト1/1にしたい
        //TODO: 色々レイアウトおかしい
        // <Box component="div" className="header-profile" sx={{ backgroundColor: "#333333", ...sx, color: textColor }}>
        <Box component="div" className="header-profile" sx={{ ...sx, color: textColor }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <ProfileImage image_url={user.image_url} sx={{ height: "auto", width: "70px" }} />
                </Grid>
                <Grid item xs={2}>
                    <p>{user.user_name || "no name"}</p>
                </Grid>
                <Grid item xs={6}>
                    <p>{user.email}</p>
                </Grid>
            </Grid>
        </Box>
    )
}
