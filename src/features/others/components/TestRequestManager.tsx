import { SxProps } from "@mui/system";
import { Box, Grid, Button } from "@mui/material";
import {useDependency} from "../../../Dependency";
import requests from "../../../requests";
import IRequestManager from "../interfaces/IRequestManager";
import { useState } from "react";

interface TestRequestManagerProps {
    sx?: SxProps
}

export default function TestRequestManager({sx}: TestRequestManagerProps) {
    function _handleClickPing(requestManager: IRequestManager<any, any>, callback: (response: any) => void) {
        requestManager
            .get(requests.test.ping)
            .then(callback);
    }
    
    function _handleClickPingWithMessage(requestManager: IRequestManager<any, any>, callback: (response: any) => void) {
        requestManager
            .get(requests.test.ping_with_message, { message: "pon" })
            .then(callback);
    }
    
    function _handleClickGreet(requestManager: IRequestManager<any, any>, callback: (response: any) => void) {
        requestManager
            .post(requests.test.greet, { name: "panda" })
            .then(callback);
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
    onClick: (requestManager: IRequestManager<any, any>, callback: (response: any)=> void) => void,
    sx?: SxProps
}
function Component({route, onClick, sx}: ComponentProps) {
    const {useRequestManager} = useDependency();
    const requestManager = useRequestManager<null, any>();
    const [message, setMessage] = useState("none");

    // OPTIMISE: ↓こいつのせいでクソややこしい設計になってる
    function _handleClick() {
        onClick(requestManager, (response: any) => {
            setMessage(_ => {
                return response === null ? "none" : response.message;
            })
        });
    }

    return (
        <Box component="div">
            <h1>{route}</h1>
            <p>message: {message}</p>
            <Button variant="contained" onClick={_handleClick}>Send</Button>
        </Box>
    )
}
