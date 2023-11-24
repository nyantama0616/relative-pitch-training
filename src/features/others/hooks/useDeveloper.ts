//なんでも屋さん
//開発者用のユーティリティフック

import { useDependency } from "../../../Dependency";
import { useEffect } from "react";
import IAuthManager from "../../auth/interfaces/IAuthManager";
import { sign } from "crypto";

interface Props {
    authManager: IAuthManager;
}
export default function useDeveloper({ authManager }: Props) {
    const email = "test_user@example.com";
    const password = "password";

    useEffect(() => {
        _signUp();
    }, []);

    function _signUp() {
        authManager
            .signUp(email, password)
            .then((res) => {
                console.log("signUp success");
            })
            .catch((error) => {
                console.log("signUp failed");
            })
            .finally(() => {
                _signIn();  
            });
    }

    function _signIn() {
        
        authManager
            .signIn(email, password)
            .then((res) => {
                console.log("signIn success");
            })
            .catch((error) => {
                console.log("signIn failed");
            });
    }
}
