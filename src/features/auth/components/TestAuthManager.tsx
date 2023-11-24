import { Box, Button, Grid, List, ListItem } from "@mui/material";
import { SxProps } from "@mui/system";
import { useDependency } from "../../../Dependency";
import { useState } from "react";
import User from "../interfaces/User";

interface TestAuthManagerProps {
    sx?: SxProps
}
export default function TestAuthManager({ sx }: TestAuthManagerProps) {
    
    return (
        <Box component="div">
            <h1>Test Auth Manager</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TestSignUp sx={{background: "#eeeeee"}} />
                </Grid>

                <Grid item xs={12}>
                    <TestFetchUsers sx={{ background: "#eeeeee" }} />
                </Grid>
                
                <Grid item xs={12}>
                    <TestSignIn sx={{ background: "#eeeeee" }} />
                </Grid>
            </Grid>
        </Box>
    )
}

interface TestSignUpProps {
    sx?: SxProps
}
function TestSignUp({ sx }: TestSignUpProps) {
    const { authManager } = useDependency();
    const email = "panda3@example.com";
    const password = "password";
    const [message, setMessage] = useState("none");

    function _signUp() {
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
        <Box component="div" sx={{ ...sx }}>
            <h1>Sign Up</h1>
            <p>email: {email}</p>
            <p>password: {password}</p>
            <p>message: {message}</p>
            <Button variant="contained" onClick={_signUp}>Send</Button>
        </Box>
    )
}

interface TestSignInProps {
    sx?: SxProps
}
function TestSignIn({ sx }: TestSignInProps) {
    const { authManager } = useDependency();
    const email = "panda3@example.com";
    const password = "password";
    const [message, setMessage] = useState("none");

    function _signIn() {
        authManager
            .signIn(email, password)
            .then((response) => {
                setMessage("success!");
                console.log(document.cookie);
                
            })
            .catch((error) => {
                setMessage("failed...");
            });
    }

    return (
        <Box component="div" sx={{ ...sx }}>
            <h1>Sign In</h1>
            <p>email: {email}</p>
            <p>password: {password}</p>
            <p>message: {message}</p>
            <Button variant="contained" onClick={_signIn}>Send</Button>
            <h3>Current User</h3>

            <p>user_name: {authManager.currentUser?.user_name}</p>
            <p>email: {authManager.currentUser?.email}</p>
        </Box>
    )
}

interface TestFetchUsersProps {
    sx?: SxProps
}
function TestFetchUsers({ sx }: TestFetchUsersProps) {
    const { userRequestManager } = useDependency();
    const [users, setUsers] = useState<Array<User>>([]);
    const [message, setMessage] = useState("none");

    function _fetch() {
        setMessage("fetching...");

        userRequestManager
            .fetchAllUsers()
            .then((response) => {
                setUsers(response!);
                
                setMessage("success!");
            })
            .catch((error) => {
                setMessage("failed...")
            });
    }

    const userList = users.map((user, i) => {
        return (
            <ListItem key={i.toString()}>
                <Box component="div" sx={{backgroundColor: "#ccccff"}}>
                    <p>name: none</p>
                    <p>email: {user.email}</p>
                </Box>
            </ListItem>
        )
    });

    return (
        <Box component="div" sx={{...sx}}>
            <h1>Fetch Users</h1>
            <p>message: {message}</p>
            <Button variant="contained" onClick={_fetch}>Send</Button>
            <List>
                {userList}
            </List>
        </Box>
    )
}
