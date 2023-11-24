import { useState } from "react";
import IUser from "../interfaces/IUser";
import User from "../classes/User";
import requests from "../../../requests";
import IAuthManager from "../interfaces/IAuthManager";
import { TypeRequestManager } from "../../others/classes/RequestManager";

export default function useAuthManager(RequestManager: TypeRequestManager): IAuthManager {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const signUpRequestManager = new RequestManager<SignUpRequest, SignUpResponse>();
    const signInRequestManager = new RequestManager<SignInRequest, SignInResponse>();
    
    function isAuthorized() {
        return currentUser !== null;
    }

    function signIn(email: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            signInRequestManager
                .post(requests.auth.signin, { email, password })
                .then((res) => {                
                    const user = new User(res!.user_name, res!.email, res!.image_path); // TODO: Requestにimage_pathを追加する
                    setCurrentUser(user);
                    resolve(true);
                })
                .catch((error) => {
                    reject(false);
                });
        });
        return Promise.resolve(false);
    }

    function signOut(): Promise<boolean> {
        return Promise.resolve(false);
    }
    
    function signUp(email: string, password: string): Promise<boolean> {

        return new Promise((resolve, reject) => {
            signUpRequestManager
                .post(requests.auth.signup, { email, password })
                .then((response) => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(false);
                });
        });
    }

    return {
        currentUser,
        isAuthorized,
        signIn,
        signOut,
        signUp,
    };
}

interface SignUpRequest {
    email: string;
    password: string;
}

interface SignUpResponse {
    message: string;
}

interface SignInRequest {
    email: string;
    password: string;
}

interface SignInResponse {
    user_name: string;
    email: string;
    image_path: string;
}
