import { Box, Grid } from "@mui/material"
import Header from "./features/others/components/Header"

interface LayoutProps {
    mainComponent: JSX.Element
}

export default function Layout({ mainComponent }: LayoutProps) {
    return (
        <Box component="div" sx={{ width: "100%", height: "100%" }}>
            {/* 子要素を中央に配置には、containerグリッドにjustifyContent="center"を指定する */}
            <Grid container spacing={8} justifyContent="center">
                <Grid item xs={12}>
                    <Header sx={{height: "70px"}} />
                </Grid>
                <Grid item xs={10}>
                    {mainComponent}
                </Grid>
            </Grid>
        </Box>
    )
}
