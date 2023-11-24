import { TypeRequestManager } from "./RequestManager";
import IUserRequestManager, { FetchAllUsersResponse } from "../interfaces/IUserRequestManager";
import requests from "../../../requests";
import User from "../../auth/classes/User";

export default class UserRequestManager implements IUserRequestManager {
    private RequestManager: TypeRequestManager;

    constructor(RequestManager: TypeRequestManager) {
        this.RequestManager = RequestManager;

        this.fetchAllUsers = this.fetchAllUsers.bind(this);
    }

    public async fetchAllUsers(): Promise<FetchAllUsersResponse | null> {
        const requestManager = new this.RequestManager<null, IUserData[]>();
        
        return new Promise((resolve, reject) => {
            requestManager
            .get(requests.user.all)
                .then((response) => {
                    const users = response!.map((user) => {
                        return new User(user.user_name, user.email, user.image_path);
                    });
                    resolve(users);
                })
                .catch((error) => {
                    reject(null);
                });
        });
    }
}

interface IUserData {
    user_name: string;
    email: string;
    image_path: string;
}
