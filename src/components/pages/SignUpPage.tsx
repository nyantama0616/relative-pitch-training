import { Box, Grid, Button, TextField, SxProps } from "@mui/material";

interface SignUpPageProps {
    sx?: SxProps;
}

export default function SignUpPage({ sx }: SignUpPageProps) {
    return (
        <Box component="div" sx={{ backgroundColor: "#eeeeff", borderRadius: "10px", ...sx }}>
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
