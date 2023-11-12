import { Box, Grid, Button, TextField } from "@mui/material";
import SizingProps from "../../interfaces/SizingProps";

interface SignUpPageProps {
    sizing?: SizingProps;
}

export default function SignUpPage({ sizing }: SignUpPageProps) {
    return (
        <Box component="div" sx={{ backgroundColor: "#eeeeff", borderRadius: "10px", ...sizing }}>
            <form action="">
                <Grid container spacing={2} justifyContent="center">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={8} sx={{ mt: "50px" }}>
                            <TextField type="text" label="メールアドレス" variant="outlined" />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField type="password" label="パスワード" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained">ユーザ作成</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
