import { SxProps } from "@mui/system";
import { Box, Grid, Button } from "@mui/material";
import {useDependency} from "../../contexts/Dependency";
// import BasicStatus from "../../interface/BasicStatus";
import { useMemo } from "react";
import BasicStatus from "../../interfaces/BasicStatus";
import requests from "../../requests";
import IRequestManager from "../../interfaces/request/IRequestManager";

interface TestRequestManagerProps {
    sx?: SxProps
}

export default function TestRequestManager({sx}: TestRequestManagerProps) {
    function _handleClickPing(requestManager: IRequestManager<any, any>) {
        requestManager.get(requests.test.ping);
    }
    
    function _handleClickPingWithMessage(requestManager: IRequestManager<any, any>) {
        requestManager.get(requests.test.ping_with_message, {message: "pon"});
    }
    
    function _handleClickGreet(requestManager: IRequestManager<any, any>) {
        requestManager.post(requests.test.greet, {name: "panda"});
    }

    return (
        <Box component="div" sx={{backgroundColor: "#eeeeee", ...sx}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Component route="GET /test/ping" onClick={_handleClickPing}/>
                </Grid>
                <Grid item xs={12}>
                    <Component route="GET /test/ping_with_message" onClick={_handleClickPingWithMessage}/>
                </Grid>
                <Grid item xs={12}>
                    <Component route="POST /test/greet" onClick={_handleClickGreet}/>
                </Grid>
            </Grid>
        </Box>
    )
}

interface ComponentProps {
    route: string
    onClick: (requestManager: IRequestManager<any, any>) => void,
    sx?: SxProps
}
function Component({route, onClick, sx}: ComponentProps) {
    const {useRequestManager} = useDependency()!;
    const requestManager = useRequestManager<null, any>();
    const message = useMemo(() => requestManager.status === BasicStatus.Success ? requestManager.data!.message : "none", [requestManager.status]);

    function _handleClick() {
        onClick(requestManager); //ややこしｗ
    }

    return (
        <Box component="div">
            <h1>{route}</h1>
            <p>status: {requestManager.status}</p>
            <p>message: {message}</p>
            <Button variant="contained" onClick={_handleClick}>Send</Button>
        </Box>
    )
}
