import { Box, Button, Grid } from "@mui/material";
import { SxProps } from "@mui/system";
import { useDependency } from "../../../Dependency";
import { useState } from "react";

interface TestAuthManagerProps {
    sx?: SxProps
}
export default function TestAuthManager({ sx }: TestAuthManagerProps) {
    
    
    return (
        <Box component="div">
            <h1>Test Auth Manager</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TestSignUp />
                </Grid>
            </Grid>
        </Box>
    )
}

function TestSignUp() {
    const { authManager } = useDependency();
    const email = "panda.example.com";
    const password = "password";
    const [message, setMessage] = useState("none");

    function _signUp() {
        console.log(authManager);
        
        authManager
            .signUp(email, password)
            .then((response) => {
                setMessage("success!");
            })
            .catch((error) => {
                setMessage("failed...");
            });
    }

    return (
        <Box component="div" sx={{ backgroundColor: "#eeeeee" }}>
            <h1>Sign Up</h1>
            <p>email: {email}</p>
            <p>password: {password}</p>
            <p>message: {message}</p>
            <Button variant="contained" onClick={_signUp}>Send</Button>
        </Box>
    )
}
